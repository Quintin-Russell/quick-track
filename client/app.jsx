import React from 'react';
import parseRoute from '../client/parse-route';
import Home from './pages/home';
import PastExpenses from './pages/past-expenses';
import Header from './components/header';
import Footer from './components/footer';
import pages from './pages';
import Menu from './components/menu';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      userId: 1,
      route: parseRoute(window.location.hash),
      page: pages.find(pg => pg.name === 'Home'),
      showMenu: false,
      defaultTimeFrame: 'Monthly'
    };
  }

  renderPage() {
    const path = this.state.route.path;
    if (path === '') {
      return <Home
      page={this.state.page}
      userId={this.state.userId}
      route={this.state.route} />;
    } else if (path === 'pastexpenses') {
      return (
      <PastExpenses
      route={this.state.route}
      userId={this.state.userId}
      pastExpenses={this.state.pastExpenses}
      page={this.state.page}
     />
      );
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', e => {
      const route = parseRoute(window.location.hash);
      const page = pages.find(pg => pg.path === route.path);
      this.setState({ route, page });
    });
  }

  toggleMenu(e) {
    const curentShowMenu = this.state.showMenu;
    this.setState({ showMenu: !curentShowMenu });
  }

  render() {
    return (
      <>
      <Header
      toggleMenu={this.toggleMenu}
      route={this.state.route}
      pages={pages}/>
      { this.state.showMenu && <Menu toggleMenu={this.toggleMenu} pages={pages}/> }
      <div className={this.state.page.wholepagecont}>
        {this.renderPage()}
      </div>
        <Footer
        pages={pages}
        route={this.state.route} />
      </>
    );
  }
}
