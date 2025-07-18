from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# MySQL configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Football.321',
    'database': 'student_db'
}

# Helper function for database connection
def get_db_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to database: {err}")
        return None

# Input validation for student name
def validate_student_name(name):
    if not name or not isinstance(name, str):
        return False, "Name is required and must be a string"
    if len(name.strip()) < 2:
        return False, "Name must be at least 2 characters long"
    if len(name.strip()) > 100:
        return False, "Name cannot exceed 100 characters"
    if not re.match(r'^[a-zA-Z\s]+$', name.strip()):
        return False, "Name can only contain letters and spaces"
    return True, ""

# POST /students - Add a new student
@app.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()
    name = data.get('name') if data else None
    
    # Validate input
    is_valid, error_message = validate_student_name(name)
    if not is_valid:
        return jsonify({'error': error_message}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = conn.cursor()
        query = "INSERT INTO students (name) VALUES (%s)"
        cursor.execute(query, (name.strip(),))
        conn.commit()
        
        # Get the inserted student
        student_id = cursor.lastrowid
        return jsonify({
            'id': student_id,
            'name': name.strip()
        }), 201
    except mysql.connector.Error as err:
        return jsonify({'error': f'Database error: {str(err)}'}), 500
    finally:
        cursor.close()
        conn.close()

# GET /students - List all students
@app.route('/students', methods=['GET'])
def get_students():
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, name FROM students")
        students = cursor.fetchall()
        return jsonify(students), 200
    except mysql.connector.Error as err:
        return jsonify({'error': f'Database error: {str(err)}'}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)