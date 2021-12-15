export default [
  {
    name: 'Home',
    hash: '#',
    imgSrc: 'images/home.png',
    imgAlt: 'home-icon',
    footerIcon: false,
    meunIcon: true,
    createQuery: null
  },
  {
    name: 'Past Expenses',
    hash: '#pastexpenses',
    imgSrc: 'images/past-exp-logo.png',
    imgAlt: 'past-exp-icon',
    footerIcon: true,
    menuIcon: true,
    createQuery: '#pastexpenses?funct=create',
    table: {
      tableHeaders: ['Date', 'Amount', 'Comment'],
      className: {
        text: 'flex-30',
        icon: 'flex-10',
        divCont: 'flex-40'
      }
    }
  },
  {
    name: 'Summary',
    hash: '#summary',
    imgSrc: 'images/summary-logo.png',
    imgAlt: 'summary-icon',
    footerIcon: true,
    menuIcon: true,
    createQuery: null
  },
  {
    name: 'Account Settings',
    hash: '#accsettings',
    imgSrc: 'images/acc-settings-logo.png',
    imgAlt: 'account-settings-icon',
    footerIcon: true,
    menuIcon: true,
    createQuery: null
  },
  {
    name: 'Set Your Budget',
    hash: '#setbudget',
    imgSrc: 'images/set-budget-icon.png',
    imgAlt: 'set-budget-icon',
    footerIcon: false,
    menuIcon: false,
    createQuery: '#setbudget?funct=create'
  }
];
