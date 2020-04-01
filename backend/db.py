import pyodbc
import random
import random 
from UserStatus import CreateUserStatus
class SQL(object):
    def __init__(self, numberOfQuestions = 0):
        server = 'sofadb.database.windows.net'
        database = 'sofadatabase'
        username = 'sofa'
        password = 'MyDatabasePassword1'
        driver= '{ODBC Driver 17 for SQL Server}'
        self.cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password+'; MARS_Connection=Yes')
        self.numberOfQuestions = numberOfQuestions


    def addQuizToUSer(self, user, quiz):
        cursor = self.cnxn.cursor()
        cursor.execute("SELECT MAX( quizId  ) from QuizesPerUser")
        row = cursor.fetchone() 
        if (row == None):
            userQuizNumber = 1
        else:
            userQuizNumber = int(row[0]) + 1
        i=0

        while i <= len(quiz)-1:
            for answer in quiz[i]['answerOptions']:
                if answer[0] == quiz[i]['chosenAnswer']:
                    if answer[1]  == '':
                        ChosenAnswerId = 0
                    else:
                        ChosenAnswerId = int(answer[1])
            cursor2 = self.cnxn.cursor()
            sql = "INSERT INTO [dbo].[QuizesPerUser] (  [User],[QuizId],[QuestionId] ,[ChoosenAnswerId])\
            VALUES   (?,?,? ,?) "
            val = (user, int(userQuizNumber), int(quiz[i]['questionId']), ChosenAnswerId)
            cursor2.execute(sql, val)
            cursor2.commit() 
            i =  i+1
        return True
        

    def checkUser(self, user, password):
        cursor = self.cnxn.cursor()
        cursor.execute("EXEC Check_User '" + user + "'")
        row = cursor.fetchone()
        if row == None:
            return 0
        elif(row[1] != password):
            return 2

        elif(row[1] == password):
            return 1


    def createUser(self,user, password):
        if(self.checkUser(user,password)!=0):
            return CreateUserStatus["UserAlreadyExists"]
        else:
            cursor = self.cnxn.cursor()
            sql = "EXEC Create_User ?, ?"
            val = (user, password)
            cursor.execute(sql, val)
            cursor.commit()                
             
            if cursor.rowcount == 0:
                return CreateUserStatus["SomethingWentWrong"]
            else:
                return  CreateUserStatus["CreateUserSuccess"]

    def getStatistic(self, user):
        cursor = self.cnxn.cursor()
        sql ="EXEC Get_Statistics ?"
        val = (user)
        cursor.execute(sql, val)
        row = cursor.fetchone()
        result = list()
        while row:
            OneQuestion =  {}        
            OneQuestion['QuizId'] = str(row[0])     
            OneQuestion['Question'] = str(row[1])
            OneQuestion['correctAnswer'] = str(row[3]) 
            OneQuestion['ChosenAnswerId'] = str(row[2]) 
            row = cursor.fetchone()
            result.append(OneQuestion)
 
        return result


    def SelectLanguages(self):
        cursor = self.cnxn.cursor()
        cursor.execute("EXEC Get_Languages")
        lang = list()    
        
        row = cursor.fetchone()
        while row:
            lang.append(row[0])
        return lang
  
    def SelectQuestionsforQuiz(self, lang, numberOfQuestions):
        cursor = self.cnxn.cursor()
        cursor.execute("SELECT  Id, Question, CorrectAnswer FROM [dbo].[QuizQuestion] WHERE Lang = \'" + lang+"\'")
        table = list()
       
        
        row = cursor.fetchone()
        while row:
            fullQuestion = {}        
            fullQuestion['questionId'] = str(row[0])     
            fullQuestion['question'] = str(row[1])
            fullQuestion['correctAnswer'] = str(row[2]) 
            cursor2 = self.cnxn.cursor()
            cursor2.execute("select  dbo.QuizAnswer.Id, dbo.QuizAnswer.Answer,    dbo.[QuizQuestion].Question , dbo.QuizQuestionAnswersConnector.AnswerId  from [dbo].[QuizQuestion] \
                inner join dbo.QuizQuestionAnswersConnector ON [dbo].[QuizQuestion].id = dbo.QuizQuestionAnswersConnector.QuestionId  AND [dbo].[QuizQuestion].id ="+ str(row[0]) +
                "inner join dbo.QuizAnswer ON dbo.QuizQuestionAnswersConnector.AnswerId = dbo.QuizAnswer.Id")
            answersFromSQL = list()
            row2 = cursor2.fetchone()
            while row2:
                answersFromSQL.append([str(row2[1]),str(row2[0])])
                 
                row2 = cursor2.fetchone()
            random.shuffle(answersFromSQL)
            
            print(answersFromSQL)
            answersFromSQL = answersFromSQL[:3]
            print(answersFromSQL)
            answersFromSQL.append([str(row[2]),''])
            random.shuffle(answersFromSQL)  

            fullQuestion['answer1'] = answersFromSQL[0]
            fullQuestion['answer2'] = answersFromSQL[1]
            fullQuestion['answer3'] = answersFromSQL[2]
            fullQuestion['answer4'] = answersFromSQL[3]

            table.append(fullQuestion)
            print (str(row[0]) + " " + str(row[1]))
            row = cursor.fetchone()
        random.shuffle(table)  
        table = table[:int(numberOfQuestions)]
        return table
 

   
   
    
    def SelectQuestionTable(self):
        cursor = self.cnxn.cursor()
        cursor.execute("EXEC Get_All_Questions")
        row = cursor.fetchone()
        table =[]
        while row:
            rowAsList = [x for x in row]
            table.extend(rowAsList)
            print (str(row[0]) + " " + str(row[1])) 
            row = cursor.fetchone()
        
        return table

  