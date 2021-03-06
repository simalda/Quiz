import React from "react";
import logo from "../images/LOGO.png";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { setLanguage } from "../redux/actions";

class ConnectedTest extends React.Component {
  constructor(props) {
    super(props);
    this.languages = ["Python", "C#", "JS"];
  }

  handleSubmit(submitter, value) {
    submitter(value);
  }

  produceLanguages(languages) {
    return languages.map(language => (
      <Link
        key={language}
        to="/choosesNumber"
        className="navbar-text"
        id={language}
        onClick={() =>
          this.handleSubmit(this.props.onLanguageSelected, language)
        }
      >
        {language}
      </Link>
    ));
  }

  render() {
    let addQuest;
    if (this.props.user !== "guest") {
      addQuest = (
        <li>
          <Link id="addQuestion" className="navbar-text " to="/addQuestion">
            Add a question
          </Link>
          <Link
            id="stat"
            onClick={() => this.props.getStat()}
            className="navbar-text "
            to="/statistics"
          >
            Statistics
          </Link>
          <div className="navbar-text "> {this.props.user} </div>
        </li>
      );
    }

    return (
      <header>
        <img src={logo} className="App-logo" alt=""></img>
        <nav>
          <ul>
            <li>
              <Link
                id="aboutUs"
                key="AboutUs"
                className="navbar-text"
                to="/aboutUs"
                onClick={() => this.props.AboutUs()}
              >
                About Us
              </Link>
            </li>
            <li>{this.produceLanguages(this.languages)}</li>
            {addQuest}
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.userReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLanguageSelected: language => {
      dispatch(setLanguage(language));
    },
    getStat: user => {},
    AboutUs: () => {}
  };
};

const Test = connect(mapStateToProps, mapDispatchToProps)(ConnectedTest);

export default Test;
