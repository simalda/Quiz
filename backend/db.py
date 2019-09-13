import pyodbc
import random 

class SQL(object):
    def __init__(self):
        server = 'sofadb.database.windows.net'
        database = 'sofadatabase'
        username = 'sofa'
        password = 'MyDatabasePassword1'
        driver= '{ODBC Driver 17 for SQL Server}'
        self.cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)

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

    def SelectQuestionsforQuiz(self):
        cursor = self.cnxn.cursor()
        cursor.execute("SELECT  Id, Question, CorrectAnswer FROM [dbo].[QuizQuestion]")
        tabl = list()
        fullQuestion = {}
        i=0
        numberOfQuestions =2
        row = cursor.fetchone()
        while row:             
            fullQuestion['question'] = str(row[1])
            fullQuestion['correctAnswer'] = str(row[2])
            tabl.append(fullQuestion)
            print (str(row[0]) + " " + str(row[1]))
            row = cursor.fetchone()
        print(tabl)
        random.shuffle(tabl)
        print(tabl)
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


  