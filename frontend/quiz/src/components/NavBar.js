import React from 'react'
import logo from './LOGO.png';
import { Link } from "react-router-dom";
import "./login.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.languages = ["Python", "C#", "JS"];
  }

  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
click() {
  let clasname =  "dropdown-content  "+ (this.props.dropdownshow ==1 ? "show" : "notShow");
  return <div id="myDropdown" className = {clasname}>
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
</div>
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
    let dropdown = this.click()
    let addQuest
    if(this.props.page == 1){
        addQuest = (     <div><Link id="addQuestion"  class="navbar-text " >        Add a question        </Link>
        <Link id="stat"  class="navbar-text " >        Statistics      </Link>
        <Link id="graph"  class="navbar-text " >  See stat in graph       </Link>
        <Link id="ownQuestionary"  class="navbar-text " >   Create questionary      </Link>
        <Link id="graph"  class="navbar-text " >  See stat in graph       </Link>
        <div> <Link id="userName"  class="navbar-text right" >      {this.props.user}         </Link> </div> </div>)}
       
    return (
      <nav className="navbar">     
      <div className="navbar-brand">
            <img src={logo} height="40" className="App-logo"  alt=''></img>                 
      </div>
       <div className = "lang">
       <Link  key = "AboutUs"  className="navbar-text" id="Language" onClick={() => this.handlesubmit(this.props.onNUmberOfQuestionsSelected)}>
   About Us  </Link>
      {this.produceLanguages(this.languages)} </div>
      <div className="dropdown">
  <button onClick={() => this.props.dropdownClicked()} className="dropbtn">User Info</button>
  {dropdown}
</div>
      
      {addQuest}
             
      </nav>
    )
  };
}

export default  NavBar 