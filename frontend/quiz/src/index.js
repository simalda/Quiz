import React from "react";
import ReactDOM from "react-dom";
import "./CSS/CSS-GRID/main.css";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { appState } from "./redux/reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  appState,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

function render() {
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
}
render();

serviceWorker.unregister();
