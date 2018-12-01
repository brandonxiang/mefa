import { h, render, Component } from 'preact';
import Router from 'preact-router';

const PageOne = () => <h1>Page 1</h1>;

const PageTwo = () => <h2>Page 2</h2>;

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
        <span>{ time }</span>
        <Router>
          <PageOne path="/1" />
          <PageTwo path="/2" />
        </Router>
    </div>
	);
  }
}

// render an instance of Clock into <body>:
render(<Clock />, document.body);