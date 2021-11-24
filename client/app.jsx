import React from 'react';
import parseRoute from '../client/parse-route';
import Home from './pages/home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  render() {
    return <Home />;
  }
}
