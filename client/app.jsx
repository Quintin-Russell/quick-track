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
      showMenu: false,
      defaultTimeFrame: 'Monthly',
      pastExpenses: []
    };
  }

  renderPage() {
    const path = this.state.route.path;
    if (path === '') {
      return <Home
      userId={this.state.userId}
      route={this.state.route} />;
    } else if (path === 'pastexpenses') {
      return (
      <PastExpenses
      route={this.state.route}
      userId={this.state.userId}
      tableInfo={pages.find(elm => (elm.name === 'Past Expenses'))}
      pastExpenses={this.state.pastExpenses}
      hash={pages.find(pg => pg.hash === '#pastexpenses')}
     />
      );
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', e => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
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
      {/* place Menu here; add if(props.route.params.get('funct')==='menu') to render() */}
      { this.state.showMenu && <Menu toggleMenu={this.toggleMenu} pages={pages}/> }
      <div className="whole-pg-cont">
        {this.renderPage()}
      </div>
        <Footer
        pages={pages}
        route={this.state.route} />
      </>
    );
  }
}
