import React from 'react';

export default class LoginForm extends React.Component {
  // 2 options: login || create account
  // create account
  render() {
    return (
    // <div className="exp-form-cont col">
    //   <h2 className="menu-txt">{this.whichFormOption('header')}</h2>
    //   <form
    //     onSubmit={this.onSubmit.bind(this)}
    //     className="just-cent exp-form col"
    //   >
    //     <label
    //       htmlFor="date"
    //       className={`col form-label ${this.showDate(this.props.route)}`}>
    //       <h3 className={`form-label-txt ${this.showDate(this.props.route)}`}>Date:</h3>
    //       <input
    //         onChange={this.change.bind(this)}
    //         className={`${this.showDate(this.props.route)} form-input`}
    //         name="date"
    //         id="date"
    //         type="date"
    //         min="2000-01-01"
    //         max={new Date()}></input>
    //     </label>
    //     <label
    //       htmlFor="amount"
    //       className="col form-label">
    //       <input
    //         onChange={this.change.bind(this)}
    //         className="form-input"
    //         name="amount"
    //         id="amount"
    //         placeholder={this.whichFormOption('placeHolderTxt', this.state.expense)}
    //         type="number"
    //         step='0.01'></input>
    //     </label>
    //     <label
    //       htmlFor="spending-category"
    //       className="col form-label">
    //       <h3 className="form-label-txt">Pick A Spending Category:</h3>
    //       <Dropdown
    //         selectedVal={this.state.spendingCategory}
    //         handler={this.change.bind(this)}
    //         name="spendingCategory"
    //         id="spendingCategory"
    //         className="form-input"
    //         arr={this.state.spendingCategories}
    //         primaryKey="spendingCategoryId" />
    //     </label>
    //     <label
    //       htmlFor="comment"
    //       className="col form-input-extra-padding form-label">
    //       <input
    //         onChange={this.change.bind(this)}
    //         name="comment"
    //         id="comment"
    //         className="form-input"
    //         placeholder="What did you buy?"
    //         type="text"></input>
    //     </label>
    //     <label
    //       htmlFor="payment-method"
    //       className="col form-label">
    //       <h3 className="form-label-txt">Pick a Payment Method:</h3>
    //       <Dropdown
    //         selectedVal={this.state.paymentMethod}
    //         handler={this.change.bind(this)}
    //         className="form-input"
    //         arr={this.state.paymentMethods}
    //         name="paymentMethod"
    //         id="paymentMethod"
    //         primaryKey="paymentMethodId" />
    //     </label>
    //     <div className="row button-cont">
    //       <input type="reset"
    //         className="sm-button"
    //         value="Start Over"></input>

    //       <a href={this.props.page.hash}>
    //         <button
    //           onClick={(this.props.resetEditOrDeleteObj) ? this.props.resetEditOrDeleteObj : null}
    //           type="submit"
    //           className="sm-button"
    //           value="Done">
    //           Done
    //         </button>
    //       </a>
    //     </div>
    //   </form>

    // </div>
    <h1>Login</h1>
    );
  }
}
