import React from 'react';

import parseRoute from '../client/parse-route';
import pages from './pages';

import Header from './components/header';
import Footer from './components/footer';
import Menu from './components/menu';
import Modal from './components/modal';

import Home from './pages/home';
import PastExpenses from './pages/past-expenses';
import AccountSettings from './pages/acc-settings';
import SetBudget from './pages/set-budget';
import PaymentMethods from './pages/payment-methods';
import SpendingCategories from './pages/spending-categories';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      userId: 1,
      route: parseRoute(window.location.hash),
      page: pages.find(pg => pg.path === ''),
      showMenu: false,
      editOrDeleteObj: null
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
      setEditOrDeleteObj={this.setEditOrDeleteObj.bind(this)}
      page={this.state.page}
      />

      );
    } else if (path === 'accsettings') {

      return (
        <AccountSettings
        route={this.state.route}
        page={this.state.page} />
      );

    } else if (path === 'accsettings-setbudget') {
      return (

      <SetBudget
      setTimeFrame={this.setTimeFrame.bind(this)}
      timeFrame={this.state.timeFrame}
      userId ={this.state.userId}
      page={this.state.page}
      route={this.state.route} />
      );

    } else if (path === 'accsettings-managepaymentmethods') {

      <PaymentMethods
      route={this.state.route}
      userId={this.state.userId}
      setEditOrDeleteObj={this.setEditOrDeleteObj.bind(this)}
      page={this.state.page} />;

    } else if (path === 'accsettings-managespendingcategories') {

      <SpendingCategories
      route={this.state.route}
      userId={this.state.userId}
      setEditOrDeleteObj={this.setEditOrDeleteObj.bind(this)}
      page={this.state.page} />;

    }
  }

  componentDidMount() {

    window.addEventListener('hashchange', e => {
      const route = parseRoute(window.location.hash);
      const page = pages.find(pg => pg.path === route.path);
      this.setState({ route, page });
    });

  }

  setEditOrDeleteObj(editOrDeleteObj) {
    this.setState({ editOrDeleteObj });
  }

  resetEditOrDeleteObj() {
    this.setState({ editOrDeleteObj: null });
  }

  convertTime(dt) {
    const time = new Date(dt);
    const yr = time.getYear();
    return `${time.getMonth()}-${time.getDate()}-${yr - 100}`;
  }

  toggleMenu(e) {
    const curentShowMenu = this.state.showMenu;
    this.setState({ showMenu: !curentShowMenu });
  }

  setTimeFrame(val) {
    this.setState({ timeFrame: [val] });
  }

  render() {
    return (
    <>
      <Modal
      route={this.state.route}
      page={this.state.page}
      convertTime={this.convertTime}
      userId={this.state.userId}
      editOrDeleteObj={this.state.editOrDeleteObj}
      resetEditOrDeleteObj={this.resetEditOrDeleteObj.bind(this)} />

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
      </>);
  }
}
