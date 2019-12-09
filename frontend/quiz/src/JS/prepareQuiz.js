import { shuffle, sample } from "underscore";
function prepareQuiz(quiz) {
  const question = sample(quiz);
  const correctAnswer = quiz.correctAnswer;
  const treeRandomOptions = shuffle(question.answerOptions).slice(0, 3);
  console.log("treeRandomOptions", typeof treeRandomOptions);
  treeRandomOptions.push(correctAnswer);
  shuffle(treeRandomOptions);
  return {
    question: question,
    correctAnswer: correctAnswer,
    answerOptions: treeRandomOptions
  };
}
