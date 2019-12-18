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
    return languages.map((language, index) => (
      <Link
        to="/choosesNumber"
        id="langDiv"
        index
        className="gridMain"
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
    return <div id="container"> {this.produceLanguages(this.languages)} </div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
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
