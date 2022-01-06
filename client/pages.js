export default [
  {
    name: 'Home',
    hash: '#',
    path: '',
    imgSrc: 'images/home.png',
    imgAlt: 'home-icon',
    footerIcon: false,
    menuIcon: true,
    id: null,
    createQuery: null,
    editQuery: null,
    deleteQuery: null,
    fetchReqs: {},
    wholepagecont: 'whole-pg-cont',
    table: {},
    formOptions: {
      headerTxt: 'Enter a New Expense',
      toggleOptions: ['Expense', 'Deposit'],
      placeHolderTxt: {
        Expense: 'How much did you spend?',
        Deposit: 'How much did you deposit?'
      }
    },
    subPageHash: []
  },
  {
    name: 'Past Expenses',
    hash: '#pastexpenses',
    path: 'pastexpenses',
    imgSrc: 'images/past-exp-logo.png',
    imgAlt: 'past-exp-icon',
    footerIcon: true,
    menuIcon: true,
    id: 'expenseId',
    createQuery: '#pastexpenses?funct=create',
    editQuery: '#pastexpenses?funct=edit',
    deleteQuery: '#pastexpenses?funct=delete',
    fetchReqs: {
      get: {
        type: 'GET',
        url: '/api/expenses'
      },
      delete: {
        type: 'DELETE',
        successMessage: 'Your expense was deleted!',
        url: '/api/expenses'
      }
    },
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
    },
    subPageHash: []
  },
  {
    name: 'Summary',
    hash: '#summary',
    path: 'summary',
    imgSrc: 'images/summary-logo.png',
    imgAlt: 'summary-icon',
    footerIcon: true,
    menuIcon: true,
    id: null,
    createQuery: null,
    editQuery: null,
    deleteQuery: null,
    showModalQuery: '#summary?funct=statistics',
    fetchReqs: {
      get: {
        budget: {
          url: '/api/users'
        },
        expenses: {
          url: '/api/expenses'
        },
        spendingCategories: {
          url: '/api/spendingCategories'
        }
      }
    },
    wholepagecont: 'whole-pg-cont scroll',
    table: {},
    formOptions: {
      toggleOptions: ['Week', 'Month', 'Year']
    },
    subPageHash: []
  },
  {
    name: 'Account Settings',
    hash: '#accsettings',
    path: 'accsettings',
    imgSrc: 'images/acc-settings-logo.png',
    imgAlt: 'account-settings-icon',
    footerIcon: true,
    menuIcon: true,
    id: null,
    createQuery: null,
    editQuery: null,
    deleteQuery: null,
    fetchReqs: {},
    wholepagecont: 'whole-pg-cont',
    table: {},
    formOptions: {},
    subPageHash: ['#accsettings-setbudget', '#accsettings-managepaymentmethods', '#accsettings-managespendingcategories']
  },
  {
    name: 'Set Your Budget',
    hash: '#accsettings-setbudget',
    path: 'accsettings-setbudget',
    imgSrc: 'images/set-budget-icon.png',
    imgAlt: 'set-budget-icon',
    footerIcon: false,
    menuIcon: false,
    id: null,
    createQuery: null,
    editQuery: null,
    deleteQuery: null,
    fetchReqs: {
      get: {
        url: '/api/users'
      },
      delete: {
        successMessage: null,
        url: null
      },
      patch: {
        successMessage: 'Your Budget was successfully updated!',
        url: '/api/users'
      }
    },
    wholepagecont: 'whole-pg-cont just-sp-bw-70vh',
    table: {
      tableHeaders: [],
      className: {
        text: null,
        icon: null,
        divCont: null
      }
    },
    formOptions: {
      headerTxt: {
        edit: null,
        create: null
      },
      toggleOptions: ['Week', 'Month', 'Year'],
      placeHolderTxt: {
        Week: 'Enter Your Weekly Budgte Here',
        Month: 'Enter Your Monthly Budget Here',
        Year: 'Enter Your Yearly Budget Here'
      }
    },
    subPageHash: []
  },
  {
    name: 'Manage Payment Methods',
    hash: '#accsettings-managepaymentmethods',
    path: 'accsettings-managepaymentmethods',
    imgSrc: 'images/manage-payment-icon.png',
    imgAlt: 'manage-payment-icon',
    footerIcon: false,
    menuIcon: false,
    id: 'paymentMethodId',
    createQuery: '#accsettings-managepaymentmethods?funct=create',
    editQuery: '#accsettings-managepaymentmethods?funct=edit',
    deleteQuery: '#accsettings-managepaymentmethods?funct=delete',
    fetchReqs: {
      get: {
        type: 'GET',
        url: '/api/paymentMethods'
      },
      delete: {
        type: 'DELETE',
        successMessage: 'Your Payment Method was successfully deleted!',
        url: 'api/paymentMethods'
      },
      edit: {
        type: 'PATCH',
        successMessage: 'Your Payment Method was successfully updated!',
        url: 'api/paymentMethods'
      },
      create: {
        type: 'POST',
        successMessage: 'Your Payment Method was successfully added!',
        url: 'api/paymentMethods'
      }
    },
    wholepagecont: 'whole-pg-cont',
    table: {
      tableHeaders: ['Payment Methods'],
      className: {
        text: 'flex-90',
        icon: 'flex-10',
        divCont: 'flex-100'
      }
    },
    formOptions: {
      headerTxt: {
        edit: null,
        create: null
      },
      toggleOptions: [],
      placeHolderTxt: {
        Expense: null,
        Deposit: null
      }
    },
    subPageHash: []
  },
  {
    name: 'Manage Spending Categories',
    hash: '#accsettings-managespendingcategories',
    path: 'accsettings-managespendingcategories',
    imgSrc: 'images/manage-spending-icon.png',
    imgAlt: 'manage-spending-icon',
    footerIcon: false,
    menuIcon: false,
    id: 'spendingCategoryId',
    createQuery: '#accsettings-managespendingcategories?funct=create',
    editQuery: '#accsettings-managespendingcategories?funct=edit',
    deleteQuery: '#accsettings-managespendingcategories?funct=delete',
    fetchReqs: {
      get: {
        type: 'GET',
        url: '/api/spendingCategories'
      },
      delete: {
        type: 'DELETE',
        successMessage: 'Your Spending Category was successfully deleted!',
        url: 'api/spendingCategories'
      },
      edit: {
        type: 'PATCH',
        successMessage: 'Your Spending Category was successfully updated!',
        url: 'api/spendingCategories'
      },
      create: {
        type: 'POST',
        successMessage: 'Your Spending Category was successfully added!',
        url: 'api/spendingCategories'
      }
    },
    wholepagecont: 'whole-pg-cont',
    table: {
      tableHeaders: ['Spending Categories'],
      className: {
        text: 'flex-90',
        icon: 'flex-10',
        divCont: 'flex-100'
      }
    },
    formOptions: {
      headerTxt: {
        edit: null,
        create: null
      },
      toggleOptions: [],
      placeHolderTxt: {
        Expense: null,
        Deposit: null
      }
    },
    subPageHash: []
  }
];

// template

// {
//   name: ,
//   hash: ,
//   path: ,
//   imgSrc: ,
//   imgAlt: ,
//   footerIcon: ,
//   menuIcon: ,
//   id: ,
//   createQuery: ,
//   editQuery: ,
//   deleteQuery: ,
//   fetchReqs: {
//     get: {
//       type: 'GET',
//       url:
//     },
//     delete: {
//       type: 'DELETE',
//       successMessage: ,
//       bodyParameter: ,
//       url:
//     }
//   },
//   wholepagecont: ,
//   table: {
//     tableHeaders: ['Date', 'Amount', 'Comment'],
//     className: {
//       text: ,
//       icon: ,
//       divCont:
//     }
//   },
//   formOptions: {
//     headerTxt: {
//       edit: ,
//       create:
//     },
//     toggleOptions: ['Expense', 'Deposit'],
//       placeHolderTxt: {
//       Expense: 'How much did you spend?',
//       Deposit: 'How much did you deposit?'
//     }
//   },
// subPageHash: []
// }
