import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';

const PageOne = () => <h1>System2 Page1</h1>;
const PageTwo = () => <h1>System2 Page2</h1>;
const PageThree = () => <h1>System2 Page3</h1>;


const App = (
  <div>
    <span>Powered by React</span>
    <Router>
      <div>
        <Route path="/" component={PageOne} exact={true}></Route>
        <Route path="/1" component={PageTwo}></Route>
        <Route path="/2" component={PageThree}></Route>
      </div>
    </Router>
  </div>
);

ReactDOM.render(
  App,
  document.getElementById('app'),
);
