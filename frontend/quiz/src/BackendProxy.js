import React, { Component } from "react";
import ReactDOM from "react-dom";
 


export function getQuestions(lang, numberOfQuestions) {
    return fetch(`http://127.0.0.1:5000/selectQuestions/${lang}/${numberOfQuestions}`, {
      
    }).then(response => response.json())
  }

export function getLanguages(){
    return fetch(`http://127.0.0.1:5000/getLanguages`, {
      
    }).then(response => response.json())
  }
   
 


