/****** Object:  Table [dbo].[QuizQuestionAnswersConnector]    Script Date: 30/09/2019 17:16:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[QuizQuestionAnswersConnector](
	[QuestionId] [int] NOT NULL,
	[AnswerId] [int] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[QuizQuestionAnswersConnector]  WITH CHECK ADD  CONSTRAINT [FK_QuizQuestionAnswersConnector_QuizAnswer] FOREIGN KEY([AnswerId])
REFERENCES [dbo].[QuizAnswer] ([Id])
GO

ALTER TABLE [dbo].[QuizQuestionAnswersConnector] CHECK CONSTRAINT [FK_QuizQuestionAnswersConnector_QuizAnswer]
GO

ALTER TABLE [dbo].[QuizQuestionAnswersConnector]  WITH CHECK ADD  CONSTRAINT [FK_QuizQuestionAnswersConnector_QuizQuestion] FOREIGN KEY([QuestionId])
REFERENCES [dbo].[QuizQuestion] ([Id])
GO

ALTER TABLE [dbo].[QuizQuestionAnswersConnector] CHECK CONSTRAINT [FK_QuizQuestionAnswersConnector_QuizQuestion]
GO


