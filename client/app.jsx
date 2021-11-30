import React from 'react';
import parseRoute from '../client/parse-route';
// import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';
import pages from './pages';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  // renderPage() {
  //   const route = this.state.route
  // }

  componentDidMount() {
    window.addEventListener('hashchange', e => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
  }

  render() {
    return (
      <>
      <Header route={this.state.route} pages={pages}/>

      <Footer pages={pages} route={this.state.route} />
      </>
    );
  }
}
