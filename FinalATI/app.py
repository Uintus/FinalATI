from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

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

@app.route("/")
def index():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM students")
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    print(rows[0]["student_name"])
    return render_template("index.html")

@app.route("/grading")
def render_grading():
    return render_template("grading.html")

@app.route("/detail")
def render_detail_page():
    return render_template("detail.html")

if __name__ == '__main__':
    app.run(debug=True)
