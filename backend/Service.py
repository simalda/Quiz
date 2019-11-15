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
    
@app.route('/stat/<user>')
def get_stat(user):
    sqlQuery =  SQL()   
    innerInfo = sqlQuery.getStatistic(user)
    questionInfo  = []
    for c in  innerInfo:
        singleQuestion =  {
        "QuizId": c['QuizId'],
        "Question": c['Question'],
        "correctAnswer": c['correctAnswer'],
        "ChoosenAnswerId": c['ChoosenAnswerId'],        
      }
        questionInfo.append(singleQuestion)
    return jsonify(questionInfo)
    

@app.route('/stat/<user>', methods = ['POST'])
def add_quiz(user):
    data =  json.loads(request.stream.read())    
    sqlQuery =  SQL()      
    sqlQuery.addQuiztoUSer(user, data)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

@app.route('/selectQuestions/<lang>/<numOfQuestoins>')
def get_questions(lang, numOfQuestoins):
    sqlQuery =  SQL()
    innerInfo = sqlQuery.SelectQuestionsforQuiz(lang, numOfQuestoins)
    questionInfo  = []
    for c in  innerInfo:
        singleQuestion =  {
        "question": c['question'],
        "correctAnswer": c['correctAnswer'],
        "answerOptions": [[c['answer1'][0], c['answer1'][1]], [c['answer2'][0], c['answer2'][1]],[ c['answer3'][0], c['answer3'][1]], [c['answer4'][0], c['answer4'][1]] ],
        "questionId": c['questionId'],
        "chosenAnswer" : ""
      }
        questionInfo.append(singleQuestion)
    return jsonify(questionInfo)

 

if __name__ == "__main__":
   app.run(port=5000)
