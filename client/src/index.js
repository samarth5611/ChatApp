import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./components/Main/Main";

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);
