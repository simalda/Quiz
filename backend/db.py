import pyodbc

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
        cursor.execute("SELECT  TOP 2 Question, CorrectAnswer FROM [dbo].[QuizQuestion]")
        row = cursor.fetchone()
        tabl =[]
        while row:
            rowAsList = [x for x in row]
            tabl.append(rowAsList)
            print (str(row[0]) + " " + str(row[1]))
            row = cursor.fetchone()
        return tabl


  