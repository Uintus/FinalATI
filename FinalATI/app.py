from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
from components.Model import *

app = Flask(__name__)
# model = trainning_model()

# MySQL Database configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'ATIFinalProject'

# Connect to MySQL
def get_db_connection():
    connection = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )
    return connection

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        # Get data from the form
        subject_name = request.form['subjectName']
        description = request.form['subjectDes']
        answer_arr = []
        for i in range(1, 11):
            answer = f"answer{i}"
            answer_arr.append(request.form[answer])
        
        # Insert data into the MySQL table
        conn = get_db_connection()
        cursor = conn.cursor()
        # Prepare the SQL query
        sql_query = "INSERT INTO subjects (subject_name, subject_des, q_1, q_2, q_3, q_4, q_5, q_6, q_7, q_8, q_9, q_10) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (subject_name, description, answer_arr[0], answer_arr[1], answer_arr[2], answer_arr[3], answer_arr[4], answer_arr[5], answer_arr[6], answer_arr[7], answer_arr[8], answer_arr[9])
        # Execute the query and commit changes
        cursor.execute(sql_query, values)
        conn.commit()
        # Close the connection
        cursor.close()
        conn.close()
        return redirect('/')
    else:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM subjects")
        result = execute_query("SELECT msv, student_name, students.id, class, AVG(enrollment.score) AS avg_score FROM students LEFT JOIN enrollment ON students.id = enrollment.student_id GROUP BY students.id")
        rows = cursor.fetchall()
        cursor.close()
        connection.close()
        result = [student for student in result if student['avg_score'] is not None]
        result = sorted(result, key=lambda student: student['avg_score'], reverse=True)
        return render_template("homePage.html", subjects=rows, students=result)

@app.route("/get_student_list")
def get_student_list():
    result = execute_query("SELECT msv, student_name, students.id, class, AVG(enrollment.score) AS avg_score FROM students LEFT JOIN enrollment ON students.id = enrollment.student_id GROUP BY students.id")
    return render_template("studentList.html", students = result)

@app.route("/delete_subject")
def delete_subject():
    subject_id = request.args.get('id')
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM enrollment WHERE subject_id = %s", (subject_id,))
    cursor.execute("DELETE FROM subjects WHERE id = %s", (subject_id,))
    connection.commit()
    cursor.close()
    connection.close()
    return redirect('/')

@app.route("/add_student")
def add_student():
    msv_arr = [2,4,2,2]
    answer_arr = [-1, -1, 2, 2, -1, 4, 2, -1, 1, -1]
    msv = ""
    is_student_exist = False

    for digit in msv_arr:
        msv = msv + str(digit)

    subject_id = request.args.get("id")
    subject = execute_query("SELECT * FROM subjects WHERE id = %s", (subject_id,))
    students = execute_query("SELECT * FROM students INNER JOIN enrollment ON students.id = enrollment.student_id WHERE enrollment.subject_id = %s", (subject_id,))

    for student in students:
        if msv == student['msv']:
            is_student_exist  = True
            break
    
    if is_student_exist == False:
        new_student = execute_query("SELECT * FROM students WHERE msv = %s", (msv,))
        execute_insert_query("INSERT INTO enrollment(subject_id, student_id, score) VALUES (%s, %s, %s)", (subject_id, new_student[0]['id'], 0))
    return redirect("/detail?id=" + subject_id)

@app.route("/detail")
def render_detail_page():
    highest_score = 0
    lowest_score = 0
    avg_score = 0
    pass_percentage = 0
    score_arr = []
    score_arr_above_five = []
    amount_of_each_score = []

    subject_id = request.args.get("id")
    subject = execute_query("SELECT * FROM subjects WHERE id = %s", (subject_id,))
    students = execute_query("SELECT * FROM students INNER JOIN enrollment ON students.id = enrollment.student_id WHERE enrollment.subject_id = %s", (subject_id,))

    for student in students:
        score_arr.append(student['score'])
        if student['score'] >= 5:
            score_arr_above_five.append(student['score'])

    for i in range(1, 11):
        count = 0
        for score in score_arr:
            if score == i:
                count += 1
        amount_of_each_score.append(count)

    if score_arr:
        highest_score = max(score_arr)
        lowest_score = min(score_arr)
        avg_score = round(sum(score_arr) / len(score_arr), 2)
        pass_percentage = round(len(score_arr_above_five) / len(score_arr), 2) * 100
        
    return render_template("examDetail.html", subject=subject[0], students=students, highestScore = highest_score, lowestScore = lowest_score, avgScore = avg_score, passPercentage = pass_percentage, amountOfEachScore = amount_of_each_score)

@app.route('/delete_student_from_subject')
def delete_student():
    enrollment_id = request.args.get('id')
    subject_id = request.args.get('subject_id')
    print(subject_id)
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM enrollment WHERE id = %s", (enrollment_id,))
    connection.commit()
    cursor.close()
    connection.close()
    url = url_for('render_detail_page') + f"?id={subject_id}"
    return redirect(url)


def execute_query(query, params=None):
    """
    Hàm hỗ trợ thực thi truy vấn SQL và trả về kết quả
    :param query: Câu lệnh SQL
    :param params: Các tham số SQL, mặc định là None
    :return: Kết quả truy vấn dưới dạng list các dictionary (mỗi row là 1 dictionary)
    """
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Thực thi truy vấn SQL
    cursor.execute(query, params)

    # Lấy kết quả
    result = cursor.fetchall()

    # Đóng cursor và connection
    cursor.close()
    connection.close()

    return result

def execute_insert_query(query, params=None):
    """
    Hàm hỗ trợ thực thi truy vấn SQL và trả về kết quả
    :param query: Câu lệnh SQL
    :param params: Các tham số SQL, mặc định là None
    :return: Kết quả truy vấn dưới dạng list các dictionary (mỗi row là 1 dictionary)
    """
    connection = get_db_connection()
    cursor = connection.cursor()

    # Thực thi truy vấn SQL
    cursor.execute(query, params)

    # Lấy kết quả
    connection.commit()

    # Đóng cursor và connection
    cursor.close()
    connection.close()

@app.template_filter('round_to_2')
def round_to_2(value):
    try:
        # Chuyển giá trị thành số float và làm tròn đến 2 chữ số thập phân
        return round(float(value), 2)
    except (ValueError, TypeError):
        # Nếu không thể chuyển giá trị thành float, trả về giá trị gốc
        return value

if __name__ == '__main__':
    app.run(debug=True)
