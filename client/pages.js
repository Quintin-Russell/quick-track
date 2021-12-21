export default [
  {
    name: 'Home',
    hash: '#',
    path: '',
    imgSrc: 'images/home.png',
    imgAlt: 'home-icon',
    footerIcon: false,
    menuIcon: true,
    createQuery: null,
    wholepagecont: 'whole-pg-cont',
    formOptions: {
      headerTxt: 'Enter a New Expense',
      toggleOptions: ['Expense', 'Deposit'],
      placeHolderTxt: {
        Expense: 'How much did you spend?',
        Deposit: 'How much did you deposit?'
      }
    }
  },
  {
    name: 'Past Expenses',
    hash: '#pastexpenses',
    path: 'pastexpenses',
    imgSrc: 'images/past-exp-logo.png',
    imgAlt: 'past-exp-icon',
    footerIcon: true,
    menuIcon: true,
    createQuery: '#pastexpenses?funct=create',
    editQuery: '#pastexpenses?funct=edit',
    deleteQuery: '#pastexpenses?funct=delete',
    wholepagecont: 'whole-pg-cont scroll',
    table: {
      tableHeaders: ['Date', 'Amount', 'Comment'],
      className: {
        text: 'flex-30',
        icon: 'flex-10',
        divCont: 'flex-40'
      }
    },
    formOptions: {
      headerTxt: {
        edit: 'Edit an Expense',
        create: 'Enter a New Expense'
      },
      toggleOptions: ['Expense', 'Deposit'],
      placeHolderTxt: {
        Expense: 'How much did you spend?',
        Deposit: 'How much did you deposit?'
      }
    }
  },
  {
    name: 'Summary',
    hash: '#summary',
    path: 'summary',
    wholepagecont: 'whole-pg-cont',
    imgSrc: 'images/summary-logo.png',
    imgAlt: 'summary-icon',
    footerIcon: true,
    menuIcon: true,
    createQuery: null
  },
  {
    name: 'Account Settings',
    hash: '#accsettings',
    path: 'accsettings',
    wholepagecont: 'whole-pg-cont',
    imgSrc: 'images/acc-settings-logo.png',
    imgAlt: 'account-settings-icon',
    footerIcon: true,
    menuIcon: true,
    createQuery: null
  },
  {
    name: 'Set Your Budget',
    hash: '#setbudget',
    path: 'setbudget',
    wholepagecont: 'whole-pg-cont',
    imgSrc: 'images/set-budget-icon.png',
    imgAlt: 'set-budget-icon',
    footerIcon: false,
    menuIcon: false,
    createQuery: '#setbudget?funct=create',
    formOptions: {
      toggleOptions: ['Weekly', 'Monthly', 'Year']
    }
  }
];
