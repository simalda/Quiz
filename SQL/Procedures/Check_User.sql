


CREATE PROCEDURE [dbo].[Check_User]
    @user NVARCHAR(max)
AS
SELECT username, password
FROM dbo.Persons
WHERE username = @user 

 