import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Mefa from '../../dist/mefa.es';


class Control extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    Mefa.onRouteUpdate((route) => {
      this.props.history.push(route);
    });
  }

  render() {
    return <span>Powered by React</span>;
  }
}

const ControlWithRouter = withRouter(Control);

const PageOne = () => <h1>System2 Page1</h1>;
const PageTwo = () => <h1>System2 Page2</h1>;
const PageThree = () => <h1>System2 Page3</h1>;


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ControlWithRouter></ControlWithRouter>
            <Route path="/" component={PageOne} exact={true}></Route>
            <Route path="/1" component={PageTwo}></Route>
            <Route path="/2" component={PageThree}></Route>
          </div>
        </Router>
      </div>
    );
  } 
}

ReactDOM.render(
  <App/>,
  document.getElementById('app'),
);

