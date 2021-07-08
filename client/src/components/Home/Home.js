import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./Home.css";
import Login from "../login/login";
import Register from "../register/register";
import Chatroom from "../Chatroom/chatroom";
import Main from "../Main/Main";

function Home() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/login"}>
              ChatApp
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/chatroom/:user" component={Chatroom} />
              <Route exact path="/chatroom/:user/:roomid" component={Main} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Home;
