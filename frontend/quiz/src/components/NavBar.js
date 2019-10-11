import React from 'react'
import logo from './LOGO.png';
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.languages = ["Python", "C#", "JS"];
  }

  handlesubmit(submitter, value){
     submitter(value);
}

produceLanguages(languages) {
  return languages.map(language => (
   <Link  key = {language}  class="navbar-text" id={language} onClick={() => this.handlesubmit(this.props.onLanguageSelected,language)}>
   {language}  </Link>));
}

  render() {
    return (
      <nav className="navbar">     
      <div className="navbar-brand">
            <img src={logo} height="40" className="App-logo"  alt=''></img>                 
      </div>
       <div className = "lang">
       <Link  key = "AboutUs"  class="navbar-text" id="Language" onClick={() => this.handlesubmit(this.props.onNUmberOfQuestionsSelected)}>
   About Us  </Link>
      {this.produceLanguages(this.languages)} </div>
      </nav>
    )
  };
}

export default  NavBar 