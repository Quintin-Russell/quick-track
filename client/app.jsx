import React from 'react';
import parseRoute from '../client/parse-route';
// import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';
const pages = [
  {
    name: 'Past Expenses',
    hash: '#past-expenses',
    imgSrc: 'images/past-exp-logo2.png',
    imgAlt: 'past-exp-icon'
  },
  {
    name: 'Summary',
    hash: '#summary',
    imgSrc: 'images/summary-logo.png',
    imgAlt: 'summary-icon'
  },
  {
    name: 'Account Settings',
    hash: '#acc-setting',
    imgSrc: 'images/acc-settings-logo.png',
    imgAlt: 'account-settings-icon'
  }
];

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

  // componentDidMount() {
  //   console.log('event listener on window obj');
  //   window.addEventListener('hashchange', e => {
  //     const route = parseRoute(window.location.hash);
  //     this.setState({ route });
  //   });
  // }

  render() {
    return (
      <>
      <Header />

      <Footer pages={pages} route={this.state.route} parseRoute={parseRoute}/>
      </>
    );
  }
}
