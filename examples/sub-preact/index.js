import { h, render, Component } from 'preact';
import Router, { route } from 'preact-router';
import Mefa from '../mefa.es';

const PageOne = () => <h1>System 1 Page 1</h1>;

const PageTwo = () => <h1>System 2 Page 2</h1>;

class Clock extends Component {
  constructor() {
    super();
    // set initial time:
    this.state = {
      time: Date.now(),
    };
  }

  componentDidMount() {
    // update time every second
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }

  render(props, state) {
    const time = new Date(state.time).toLocaleTimeString();
    return (
      <div>
        <span>Powered by Preact { time }</span>
        <Router>
          <PageOne path="/" />
          <PageTwo path="/1" />
        </Router>
    </div>
    );
  }
}

// render an instance of Clock into <body>:
render(<Clock />, document.body);

Mefa.onRouteUpdate((path) => {
  route( path );
});
