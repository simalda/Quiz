import React from "react";
import "./login.css";

class Stattistics extends React.Component {
  constructor(props) {
    super(props);
    this.resultList = [];
  }
correctAn(i){
    let choosen 
    if (this.props.userStat[i]["ChoosenAnswerId"]==0){
        choosen = <div>Chosen answer: {this.props.userStat[i]["correctAnswer"]}</div>
   }else{
   choosen = <div>Chosen answer: {this.props.userStat[i]["ChoosenAnswerId"]}</div>}
   return choosen
}
  render() {
    let  i = 0
    while (i < this.props.userStat.length) {
      this.resultList.push(
        <div key={i} className="">
          
          <h5>Question: {i+1}</h5>
          <div>{this.props.userStat[i]["Question"]}</div>
          <div>Correct answer: {this.props.userStat[i]["correctAnswer"]}</div>
          {this.correctAn(i)}
          <div>-------------------------------------------------------------------------------------</div>
        </div>
      );
      i++
    }

    return <div>
            <h3 id="quizNumber">QUIZ {this.props.userStat[0]["QuizId"]}</h3>
          {this.resultList}</div>;
  }
}
export default Stattistics;
