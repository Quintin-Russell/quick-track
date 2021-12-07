// import React from 'react';
// import Dropdown from './dropdown';
// import Toggle from './toggle';

// const formOptions = {
//   '#': {
//     headerTxt: 'Enter a New Expense',
//     placeHolderTxt1: [
//       { Expense: 'How much did you spend?' },
//       { Deposit: 'How much did you deposit?' }
//     ],
//     buttons: ['Start Over', 'Done']
//   },
//   '#pastExp': {
//     toggleOptions: ['Expense', 'Deposit'],
//     placeHolderTxt: [
//       { Expense: 'How much did you spend?' },
//       { Deposit: 'How much did you deposit?' }
//     ],
//     buttons: ['Cancel', 'Done']
//   }
// };

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
//     const spendingCategories = null;
//     fetch('/api/spendingCategories')
//       .then(res => res.json())
//       .then(spendingCategories => spendingCategories = spendingCategories)
//       .catch(err);
//     fetch('/api/paymentMethods')
//       .then(res => res.json())
//       .then(paymentMethods => this.setState({ spendingCategories, paymentMethods }))
//       .catch(err);
//   }

//   handleToggleClick(e) {
//     this.setState({ function: [e.target.value] });
//   }

//   // whichFormOption(path, )

//   render() {
//     return (
//       <div className="exp-form-cont col">
//           <Toggle />
//         <h2 className="menu-txt">{}</h2>
//         <form className="just-cent exp-form col" action="">
//           <label htmlFor="amount" className="col form-label">
//             <input className="form-input" placeholder="How much did you spend?" id="amount" name="amount" type="number"></input>
//                 </label>
//             <label htmlFor="spending-category" className="col form-label">
//               <h3 className="form-label-txt">Pick a Spending Category:</h3>
//               {/* make component from fetch req to category db */}
//               <Dropdown id="spending-category" name="spending-category" className="form-input" array={this.state.spendingCategories} primaryKey="spendingCategoryId" />
//               {/* <select id="spending-category" name="spending-category" class="form-input">
//                 <option class="form-label-txt" value="Groceries">Groceries</option>
//                 <option class="form-label-txt" value="House">House</option>
//                 <option class="form-label-txt" value="Restaurant">Restaurant</option>
//                 <option class="form-label-txt" value="Gas">Gas</option>
//               </select> */}
//             </label>
//             <label htmlFor="comment" className="col form-label">
//               <input className="form-input" placeholder="What did you buy?" id="comment" name="comment" type="text"></input>
//             </label>
//               {/* make a component from fetch req to payment method db */}
//               <label htmlFor="payment-method" className="col form-label">
//                 <h3 className="form-label-txt">Pick a Payment Method:</h3>
//                 {/* <select id="payment-method" name="payment-method" class="form-input">
//                   <option class="form-label-txt" value="Visa">Visa</option>
//                   <option class="form-label-txt" value="MasterCard">MasterCard</option>
//                   <option class="form-label-txt" value="Cash">Cash</option>
//                   <option class="form-label-txt" value="Debit">Debit</option>
//                 </select> */}
//               </label>
//               <div className="row button-cont">
//                 <button onClick={this.clearForm} className="sm-button">Start Over</button>
//                 <input onSubmit={this.formSubmit} type="submit" className="sm-button" value="Done"></input>
//               </div>
//               </form>

//             </div>
//     );
//   }
// }
