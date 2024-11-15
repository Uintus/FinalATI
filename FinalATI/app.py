from flask import Flask, render_template, request, redirect
import mysql.connector
from components.Model import *

app = Flask(__name__)
model = trainning_model()

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
        rows = cursor.fetchall()
        cursor.close()
        connection.close()
        return render_template("homePage.html", subjects=rows)
    
@app.route("/delete_subject")
def delete_subject():
    subject_id = request.args.get('id')
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM subjects WHERE id = %s", (subject_id,))
    cursor.execute("DELETE FROM enrollment WHERE subject_id = %s", (subject_id,))
    connection.commit()
    cursor.close()
    connection.close()
    return redirect('/')

@app.route("/grading")
def render_grading():
    return render_template("grading.html")

@app.route("/detail")
def render_detail_page():
    subject_id = request.args.get("id")
    subject = execute_query("SELECT * FROM subjects WHERE id = %s", (subject_id,))
    students = execute_query("SELECT * FROM students INNER JOIN enrollment ON students.id = enrollment.student_id WHERE enrollment.subject_id = %s", (subject_id,))
    print(students)
    return render_template("examDetail.html", subject=subject[0], students=students)

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

if __name__ == '__main__':
    app.run(debug=True)
