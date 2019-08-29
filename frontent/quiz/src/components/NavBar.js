import React from 'react'
import logo from './python-logo.png';


function NavBar(){
    return(
      <nav className="navbar">     
      <div className="navbar-brand">
      <img src={logo} height="40" className="App-logo"  alt=''></img>     
      </div>
      </nav>
    )
  };

export default  NavBar 