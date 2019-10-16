import pyodbc
import random 

class SQL(object):
    def __init__(self, numberOfQuestions = 0):
        server = 'sofadb.database.windows.net'
        database = 'sofadatabase'
        username = 'sofa'
        password = 'MyDatabasePassword1'
        driver= '{ODBC Driver 17 for SQL Server}'
        self.cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password+'; MARS_Connection=Yes')
        self.numberOfQuestions = numberOfQuestions


    def SelectQuestionTable(self):
        cursor = self.cnxn.cursor()
        cursor.execute("SELECT  * FROM [dbo].[QuizQuestion]   ")
        row = cursor.fetchone()
        tabl =[]
        while row:
            rowAsList = [x for x in row]
            tabl.extend(rowAsList)
            print (str(row[0]) + " " + str(row[1])) 
            row = cursor.fetchone()
        
        return tabl

    def SelectQuestionsforQuiz(self, lang, numberOfQuestions):
        cursor = self.cnxn.cursor()
        cursor.execute("SELECT  Id, Question, CorrectAnswer FROM [dbo].[QuizQuestion] WHERE Lang = \'" + lang+"\'")
        tabl = list()
       
        
        row = cursor.fetchone()
        while row:
            fullQuestion = {}             
            fullQuestion['question'] = str(row[1])
            fullQuestion['correctAnswer'] = str(row[2])
            cursor2 = self.cnxn.cursor()
            cursor2.execute("select  dbo.QuizAnswer.Answer,  [dbo].[QuizQuestion].id, dbo.[QuizQuestion].Question , dbo.QuizQuestionAnswersConnector.AnswerId  from [dbo].[QuizQuestion] \
                inner join dbo.QuizQuestionAnswersConnector ON [dbo].[QuizQuestion].id = dbo.QuizQuestionAnswersConnector.QuestionId  AND [dbo].[QuizQuestion].id ="+ str(row[0]) +
                "inner join dbo.QuizAnswer ON dbo.QuizQuestionAnswersConnector.AnswerId = dbo.QuizAnswer.Id")
            answersFromSQL = list()
            row2 = cursor2.fetchone()
            while row2:
                answersFromSQL.append(str(row2[0]))
                row2 = cursor2.fetchone()
            random.shuffle(answersFromSQL)
            
            print(answersFromSQL)
            answersFromSQL = answersFromSQL[:3]
            print(answersFromSQL)
            answersFromSQL.append(str(row[2]))
            random.shuffle(answersFromSQL)  
            fullQuestion['answer1'] = str(answersFromSQL[0])
            fullQuestion['answer2'] = str(answersFromSQL[1])
            fullQuestion['answer3'] = str(answersFromSQL[2])
            fullQuestion['answer4'] = str(answersFromSQL[3])

            tabl.append(fullQuestion)
            print (str(row[0]) + " " + str(row[1]))
            row = cursor.fetchone()
        random.shuffle(tabl)  
        tabl = tabl[:int(numberOfQuestions)]
        return tabl

        #  def SelectQuestionsforQuiz(self):
        # cursor = self.cnxn.cursor()
        # cursor.execute("SELECT  Id, Question, CorrectAnswer FROM [dbo].[QuizQuestion]")
        # row = cursor.fetchone()
        # tabl =[]
        
        # while row:
        #     rowAsList = [x for x in row]
        #     question = str(row[1]
        #     CorrectAnswer = str(row[2]
        #     tabl.append(rowAsList)
        #     print (str(row[0]) + " " + str(row[1]))
        #     row = cursor.fetchone()
        
        # return tabl

    def SelectLanguages(self):
        cursor = self.cnxn.cursor()
        cursor.execute("SELECT DISTINCT [Lang] FROM [dbo].[QuizQuestion]")
        lang = list()    
        
        row = cursor.fetchone()
        while row:
            lang.append(row[0])
        return lang
  