import React from "react";

class ContinueButton extends React.Component {
  render() {
    let class_name =
      "top nextQuestion button  " +
      (this.props.isAnswerSelected === 0 ? "gray" : "blue");

    return (
      <button
        className={class_name}
        key="button"
        id="ContinueButton"
        onClick={() => this.props.nextTurn()}
      >
        NEXT QUESTION
      </button>
    );
  }
}

export default ContinueButton;
