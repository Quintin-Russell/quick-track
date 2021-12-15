import React from 'react';
import ClientError from '../../server/client-error';
// import { sources } from 'webpack';
// import { ContextExclusionPlugin } from 'webpack';
import Dropdown from './dropdown';
import Toggle from './toggle';

const userId = 1;

const formOptions = {
  newExp: {
    headerTxt: 'Enter a New Expense',
    placeHolderTxt: [
      { true: 'How much did you spend?' },
      { false: 'How much did you deposit?' }
    ],
    buttons: ['Start Over', 'Done']
  },
  pastExp: {
    toggleOptions: ['Expense', 'Deposit'],
    placeHolderTxt: [
      { expense: 'How much did you spend?' },
      { deposit: 'How much did you deposit?' }
    ],
    buttons: ['Cancel', 'Done']
  }
};

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props.route,
      spendingCategories: [],
      paymentMethods: [],
      spendingCategory: null,
      paymentMethod: null,
      comment: null,
      amount: null,
      expense: 'Expense'
    };
  }

  componentDidMount() {
    const spCatFetchUrl = `/api/spendingCategories/${userId.toString()}`;
    const payMethFetchUrl = `/api/paymentMethods/${userId.toString()}`;
    fetch(spCatFetchUrl)
      .then(spCatRes => spCatRes.json())
      .then(spendingCategories => {
        fetch(payMethFetchUrl)
          .then(payMethRes => payMethRes.json())
          .then(paymentMethods => this.setState({ spendingCategories, paymentMethods, spendingCategory: spendingCategories[0].spendingCategoryId, paymentMethod: paymentMethods[0].paymentMethodId }));
      });
  }

  whichFormOption(funct, bool, num) {
    if (Object.keys(formOptions).includes(this.state.route.path)) {
      return null;
    } else {
      if (this.state.route.path === '') {
        if (funct === 'header') {
          return formOptions.newExp.headerTxt;
        } else if (funct === 'placeHolderTxt') {
          if ((typeof (bool) === 'boolean') && (bool === true)) {
            return formOptions.newExp.placeHolderTxt.true;
          } else if (bool === false) {
            return formOptions.newExp.placeHolderTxt.false;
          }
        } else {
          if (typeof (num) === 'number') {
            return formOptions.newExp.buttons[num];
          }
        }
      } else if (this.state.route.path === '#pastExp') {
        if (funct === 'header') {
          return formOptions.pastExp.headerTxt;
        } else if (funct === 'placeHolderTxt') {
          if ((typeof (bool) === 'boolean') && (bool === true)) {
            return formOptions.pastExp.placeHolderTxt.true;
          } else if (bool === false) {
            return formOptions.pastExp.placeHolderTxt.false;
          }
        } else {
          if (typeof (num) === 'number') {
            return formOptions.pastExp.buttons[num];
          }
        }
      }
    }
  }

  handleToggleClick(e) {
    (e.target.data === 'Expense')
      ? this.setState({ expense: 'Deposit' })
      : this.setState({ expense: 'Expense' });
  }

  change(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val });
  }

  findAmount(amount, expense) {
    return (expense === 'Expense')
      ? amount
      : amount * -1;

  }

  onSubmit(e) {
    e.preventDefault();
    const body = {
      userId,
      amount: `${this.findAmount(this.state.amount, this.state.expense)}`,
      spendingCategory: `${this.state.spendingCategory}`,
      comment: `${this.state.comment}`,
      paymentMethos: `${this.state.paymentMethod}`
    };
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    fetch('/api/expenses', reqOptions)
      .then(result => (result.ok)
        ? window.alert('Thanks for entering in your transaction!')
        : window.alert('Whoops! Something went wrong. Please try again. Make sure all of the fields are filled out.'))
      .catch(new ClientError(400, 'An unexpected error occured.'));
  }

  render() {
    return (
      <div className="exp-form-cont col">
          <Toggle handleToggleClick={this.handleToggleClick} route={this.state.route} funciton={this.state.expense} />
        <h2 className="menu-txt">{this.whichFormOption('header')}</h2>
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="just-cent exp-form col"
          >
          <label htmlFor="amount" className="col form-label">
            <input
              onChange={this.change.bind(this)}
              className="form-input"
              name="amount"
              id="amount"
              placeholder={this.whichFormOption('placeHolderTxt', [this.state.expense])}
              type="number"></input>
                </label>
            <label htmlFor="spending-category" className="col form-label">
              <h3 className="form-label-txt">Pick A Spending Category:</h3>
              <Dropdown
              handler={this.change.bind(this)}
              name="spendingCategory"
              id="spendingCategory"
              className="form-input"
              arr={this.state.spendingCategories}
              primaryKey="spendingCategoryId" />
            </label>
            <label htmlFor="comment" className="col form-input-extra-padding form-label">
            <input
            onChange={this.change.bind(this)}
            name="comment"
            id="comment"
            className="form-input"
            placeholder="What did you buy?"
            type="text"></input>
            </label>
              <label htmlFor="payment-method" className="col form-label">
                <h3 className="form-label-txt">Pick a Payment Method:</h3>
                <Dropdown
                handler={this.change.bind(this)}
                className="form-input"
                arr={this.state.paymentMethods}
                name="paymentMethod"
                id="paymentMethod"
                primaryKey="paymentMethodId" />
              </label>
              <div className="row button-cont">
                <input type="reset" className="sm-button" value="Start Over"></input>
                <input type="submit" className="sm-button" value="Done"></input>
              </div>
              </form>

            </div>
    );
  }
}
