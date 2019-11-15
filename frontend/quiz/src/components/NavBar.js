import React from 'react'
import logo from './LOGO.png';
import { Link } from "react-router-dom";
import "./login.css";

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
   <Link  key = {language}  to = "/chosenumberofquestions" className="navbar-text" id={language} onClick={() => this.handlesubmit(this.props.onLanguageSelected,language)}>
   {language}  </Link>));
}

  render() {
     
    let addQuest
    if(this.props.user != 'guest' ){
        addQuest = (     <div><Link id="addQuestion"  className="navbar-text " to ="/addquestion">        Add a question        </Link>
        <Link id="stat" onClick={() => this.props.getStat()}  className="navbar-text " to = "/statistics">        Statistics      </Link>
        <div className="navbar-text ">     {this.props.user}        </div> </div>)}
       
    return (
      <nav className="navbar">     
      <div className="navbar-brand">
            <img src={logo} height="40" className="App-logo"  alt=''></img>                 
      </div>
       <div className = "lang">
       <Link id="aboutUs" key = "AboutUs"  className="navbar-text"  to = "/aboutus" onClick={() => this.props.AboutUs()}>
   About Us</Link>
      {this.produceLanguages(this.languages)} </div>
      
         
      {addQuest}
             
      </nav>
    )
  };
}

export default  NavBar 