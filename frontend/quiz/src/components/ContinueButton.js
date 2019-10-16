import React from "react";
import "../index.css";

class ContinueButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className="btn3 default"
        key="button"
        id="ContinueButton"
        onClick={() => this.props.nextTurn()}
      >
       Continue
      </button>
    );
  }
}

export default ContinueButton;
