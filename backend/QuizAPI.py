from flask import Flask, jsonify, request, json
from flask_cors import CORS
from db import *

app = Flask(__name__)
CORS(app)
print(__name__)




 

@app.route('/selectQuestions')
def get_questions():
    sqlQuery =  SQL()
    questionInfo = sqlQuery.SelectQuestionsforQuiz()
    return jsonify(questionInfo)














def validPersonObject(PersonObject):
    if("name" in PersonObject and "surname" in PersonObject and "age" in PersonObject):
        return "True"
    else:
        return "False"

@app.route('/person', methods =['POST'])
def add_book():
    request_data = request.get_json()
    request.get_json()    
    if (validPersonObject(request_data)):
        #sqlQuery =  SQL()
        #personsInfo = sqlQuery.InsertTable(request_data)
        return "True"
    else:
        return "False"

@app.route('/sum', methods =['POST'])
def add_mikllt():
    a = request.args.get('a')
    b = request.args.get('b')
    return str(int(a)+int(b))

app.run(port=5000)
