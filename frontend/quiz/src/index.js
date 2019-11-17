import React from 'react';
import ReactDOM from 'react-dom';
import "./CSS/bootstrap.min.css";
import './CSS/index.css';

import "./CSS/Quiz.css";
import './CSS/login.css';


import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

 

function render(){
ReactDOM.render(
 (   <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={App} />
      {/* <Route path="/main" component={ } /> */}
    </React.Fragment>
  </BrowserRouter>
), document.getElementById('root'));
}
render();
 
serviceWorker.unregister();
