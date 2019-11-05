from flask import Flask, jsonify, request, json
from flask_cors import CORS
from db import *
import json
app = Flask(__name__)
app.debug = True
CORS(app)
print(__name__)



@app.before_first_request
def before_first_request():
    print("before_first_request() called")

@app.before_request
def before_request():
    print("before_request() called")

@app.route('/question/<id>/')
def question_profile(id):
    return "Profile page of question #{}".format(id)


@app.route('/login/<user>/<password>')
def check_user(user, password):
    sqlQuery =  SQL()     
    return jsonify(sqlQuery.checkUser(user, password))

@app.route('/signup/<user>/<password>')
def create_user(user, password):
    sqlQuery =  SQL()      
    return jsonify(sqlQuery.createUser(user, password))
    


@app.route('/selectQuestions/<lang>/<numOfQuestoins>')
def get_questions(lang, numOfQuestoins):
    sqlQuery =  SQL()
    innerInfo = sqlQuery.SelectQuestionsforQuiz(lang, numOfQuestoins)
    questionInfo  = []
    for c in  innerInfo:
        singleQuestion =  {
        "question": c['question'],
        "correctAnswer": c['correctAnswer'],
        "answerOptions": [c['answer1'], c['answer2'], c['answer3'], c['answer4'] ],
        "chosenAnswer" : ""
      }
        questionInfo.append(singleQuestion)
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

if __name__ == "__main__":
   app.run(port=5000)
