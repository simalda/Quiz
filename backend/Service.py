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

@app.route('/getLanguages')
def getLanguages():
    sqlQuery =  SQL()
    languages = sqlQuery.SelectLanguages()
    return jsonify(languages)


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


# @app.route('/selectQuestions', methods =['POST'])
# def get_questions():
#     numOfQuestoins = int(request.args.get('numOfQuestoins'))
#     sqlQuery =  SQL()
#     innerInfo = sqlQuery.SelectQuestionsforQuiz()
    
#     questionInfo  = []
#     for c in range(numOfQuestoins):
#         newObj =  {
#         "question": innerInfo[c]['question'],
#         "correctAnswer": innerInfo[c]['correctAnswer'],
#         "answerOptions": [innerInfo[c]['answer1'], innerInfo[c]['answer2'], innerInfo[c]['answer3'], innerInfo[c]['answer4'] ]
#       }
#         questionInfo.append(newObj)
#     return jsonify(questionInfo)



# @app.route('/selectQuestions')
# def get_questions():
#     questionInfo  = [
#       {
#         "question": "q24321",
#         "correctAnswer": "ansq1",
#         "answerOptions": ["a11", "a12", "a13", "a14"]
#       },
#       {
#         "question": "q2",
#         "correctAnswer": "ansq2",
#         "answerOptions": ["a21", "a22", "a23"]
#       }
         
#     ]
#     return jsonify(questionInfo)







# getTurnData(quiz) {
#     const allAnswerOptions = quiz.reduce(function(p, c, i) {
#       return p.concat(c.answer);
#     }, []);
#      const question = sample(quiz);
#     const correctAnswer = question.correctAnswer;
#     const treeRandomOptions = shuffle(question.answerOptions).slice(0, 3);
#     console.log("treeRandomOptions", typeof treeRandomOptions);
#     treeRandomOptions.push(correctAnswer);
#     shuffle(treeRandomOptions)
#     return {
#       question: question,
#       correctAnswer: correctAnswer,
#       answerOptions: treeRandomOptions
#     };
#   }


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
