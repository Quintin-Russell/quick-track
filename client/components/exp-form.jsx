// import React from 'react';

// const formOptions = {
//   #: {
//     headerTxt: 'Enter a New Expense',
//     placeHolderTxt: []
//       "Expense": "How much did you spend?",
//       "Deposit": "How much did you deposit?"
//   ],
//     buttons: ['Start Over', 'Done']
//     ]
//   }
//   #pastExp: {
//     toggleOptions: ["Expense", "Deposit"],
//     placeHolderTxt: [
//       "Expense": "How much did you spend?",
//       "Deposit": "How much did you deposit?"
//     ],
//     buttons: ['Cancel', 'Done']
//   }
// }

// // make if/else for if it's a new or past expense

// class ExpenseForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       function: props.route.path,
//       spendingCategories: null,
//       paymentMethods: null,
//       inputedOption: null
//     };
//   }

//   componentDidMount() {
//     fetch()
//       .then()
//       .catch(err)
//   }

//   handleToggleClick(e) {
//     this.setState({ function: [e.target.value] });
//   }

//   render() {
//     return (
//       <div class="exp-form-cont col">
//           <Toggle />
//         <h2 class="menu-txt">Enter a New Expense</h2>
//         <form class="just-cent exp-form col" action="">
//           <label for="amount" class="col form-label">
//             <input class="form-input" placeholder="How much did you spend?" id="amount" name="amount" type="number">
//                 </label>
//             <label for="spending-category" class="col form-label">
//               <h3 class="form-label-txt">Pick a Spending Category:</h3>
//               {/* make component from fetch req to category db */}
//               <select id="spending-category" name="spending-category" class="form-input">
//                 <option class="form-label-txt" value="Groceries">Groceries</option>
//                 <option class="form-label-txt" value="House">House</option>
//                 <option class="form-label-txt" value="Restaurant">Restaurant</option>
//                 <option class="form-label-txt" value="Gas">Gas</option>
//               </select>
//             </label>
//             <label for="comment" class="col form-label">
//               <input class="form-input" placeholder="What did you buy?" id="comment" name="comment" type="text">
//             </label>
//               {/* make a component from fetch req to payment method db */}
//               <label for="payment-method" class="col form-label">
//                 <h3 class="form-label-txt">Pick a Payment Method:</h3>
//                 <select id="payment-method" name="payment-method" class="form-input">
//                   <option class="form-label-txt" value="Visa">Visa</option>
//                   <option class="form-label-txt" value="MasterCard">MasterCard</option>
//                   <option class="form-label-txt" value="Cash">Cash</option>
//                   <option class="form-label-txt" value="Debit">Debit</option>
//                 </select>
//               </label>
//               <div class="row button-cont">
//                 <button class="sm-button">Start Over</button>
//                 <button class="sm-button">Done</button>
//               </div>
//               </form>

//             </div>
//     )
//   }
// }
