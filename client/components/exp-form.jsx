// import React from 'react';
// import Dropdown from './dropdown';
// // import Toggle from './toggle';

// const userId = 1;

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

// export default class ExpenseForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       function: props.route.path,
//       spendingCategories: [],
//       paymentMethods: [],
//       inputedOption: null,
//       expense: true
//     };
//   }

//   componentDidMount() {
//     console.log('componentdidmount in ExpenseForm');
//     const spCatFetchUrl = `/api/spendingCategories/${userId}`;
//     fetch(spCatFetchUrl)
//       .then(spCatRes => );
//     // const fetchUrl = `/api/expense-form/${userId}`;
//     // fetch(fetchUrl)
//     //   .then(result => result.json())
//     //   .then(catAndMethObj => {
//     //     console.log('catAndMethObj in fetch:', catAndMethObj);
//     //     this.setState({ catAndMethObj });
//     //   });
//   }

//   // handleToggleClick(e) {
//   //   this.setState({ expense: [!this.state.expense] });
//   // }

//   // whichFormOption(path, )

//   render() {
//     console.log('catAndMethObj:', this.state.catAndMethObj);
//     return (
//       <div className="exp-form-cont col">
//           {/* <Toggle handleToggleClick= /> */}
//         <h2 className="menu-txt">{}</h2>
//         <form className="just-cent exp-form col" action="">
//           <label htmlFor="amount" className="col form-label">
//             <input className="form-input" placeholder="How much did you spend?" id="amount" name="amount" type="number"></input>
//                 </label>
//             <label htmlFor="spending-category" className="col form-label">
//               <h3 className="form-label-txt">Pick a Spending Category:</h3>
//               {/* make component from fetch req to category db */}
//               {/* <Dropdown id="spending-category" name="spending-category" className="form-input" arr={this.state.catAndMethObj} primaryKey="spendingCategoryId" /> */}
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
