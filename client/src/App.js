import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";
import Home from "./component/Home";


import Voting from "./component/Voting/Voting";
import Results from "./component/Results/Results";
import Registration from "./component/Registration/Registration";

import AddCandidate from "./component/Admin/AddCandidate/AddCandidate";
import Verification from "./component/Admin/Verification/Verification";
import test from "./component/test";

import Landing from "./component/Landing/Landing";
import LearnMore from "./component/Landing/LearnMore";
import ParticlesContainer from "./ParticlesContainer";


import "./App.css";
import Login from "./component/login/LoginForm";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              margin: "0",
              padding: "0",
              top: "0",
              zIndex: "-1",
            }}
          >
            <ParticlesContainer />
          </div>
            
          <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
            >
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/LearnMore" component={LearnMore} />
                <Route exact path="/home" component={Landing} />
                <Route exact path="/Election" component={Home} />
                <Route exact path="/AddCandidate" component={AddCandidate} />
                <Route exact path="/Voting" component={Voting} />
                <Route exact path="/Results" component={Results} />
                <Route exact path="/Registration" component={Registration} />
                <Route exact path="/Verification" component={Verification} />
                <Route exact path="/test" component={test} />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </div>

        </Router>
      </div>
    );
  }
}
class NotFound extends Component {
  render() {
    return (
      <>
        <h1>404 NOT FOUND!</h1>
        <center>
          <p>
            The page your are looking for doesn't exist.
            <br />
            Go to{" "}
            <Link
              to="/"
              style={{ color: "black", textDecoration: "underline" }}
            >
              Home
            </Link>
          </p>
        </center>
      </>
    );
  }
}
