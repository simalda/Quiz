import React from "react";
import { connect } from "react-redux";
import { setLanguage } from "../redux/actions";
import { Link } from "react-router-dom";

class ConnectedMainPage extends React.Component {
  constructor(props) {
    super(props);

    this.languages = ["Python", "C#", "SQL"];
  }

  handleSubmit(submitter, id) {
    submitter(id);
  }

  produceLanguages(languages) {
    if (this.props.user === "test5@te.com") {
      this.languages.push("Test");
    }
    return languages.map((language, index) => (
      <Link
        to="/choosesNumber"
        id={language + "Btn"}
        key={language}
        index={index}
        className="gridMain langDiv"
        onClick={() =>
          this.handleSubmit(this.props.onLanguageSelected, language)
        }
      >
        <div key={language}>
          <h4>{language}</h4>
        </div>
      </Link>
    ));
  }

  render() {
    return (
      <div id="container-main"> {this.produceLanguages(this.languages)} </div>
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
    }
  };
};

const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedMainPage);

export default MainPage;
