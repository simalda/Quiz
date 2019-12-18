

CREATE PROCEDURE Get_All_Questions
AS
SELECT *
FROM [dbo].[QuizQuestion];

EXEC Get_ALL


CREATE PROCEDURE Get_B_Bigger
    @par int
AS
SELECT *
FROM info
WHERE b >= @par


Exec Get_B_Bigger 2

CREATE PROCEDURE Add_To_Info
    @a NVARCHAR(max),
    @b int
AS
INSERT INTO info
    (a,b)
VALUES
    (@a, @b);

EXEC Add_To_Info 'dgf' , 12434

EXEC Get_All