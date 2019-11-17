import React  from "react";
import ReactDOM from "react-dom";
import AnswerOptions from "./AnswerOptions";
import ContinueButton from "./ContinueButton";

class QuizStep extends React.Component {
  constructor(props) {
    super(props);
  }


  renderAnswer(title) {
    return (
      <AnswerOptions
        title={title}
        key={title}
        highlight={
          title === this.props.selectedAnswer
            ? title === this.props.correctAnswer
              ? "correct"
              : "incorrect"
            : undefined
        }
        onClick={this.props.onAnswerSelected}
      />
    );
  }

  render() {
    return (
      <div>         
            <div className="row">
              <div className="col-lg-4"></div>
              <div className="col-lg-4">  
                  <div   className = "heade">{this.props.numberOfCurrentQuestion}\{this.props.numberOfQuestions}</div>
                  <div className ="text"><h3 id={"question"+this.props.numberOfCurrentQuestion}>{this.props.question}</h3></div>
                  <div className="">
                    {this.props.answerOptions.map(title =>
                      this.renderAnswer(title[0])
                    )}
                    <ContinueButton isAnswerSelected = {this.props.isAnswerSelected} nextTurn={() => this.props.continueButtonClicked()} />               
                  </div>
             </div>
               <div className="col-lg-4"></div>            
                         </div>
          </div>
                 );
  }
}

export default QuizStep;
