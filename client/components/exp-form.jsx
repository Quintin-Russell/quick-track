import React from 'react';
import ClientError from '../../server/client-error';
// import { sources, ContextExclusionPlugin } from 'webpack';
import Dropdown from './dropdown';
import Toggle from './toggle';

const formOptions = {
  newExp: {
    headerTxt: 'Enter a New Expense',
    placeHolderTxt: [
      { true: 'How much did you spend?' },
      { false: 'How much did you deposit?' }
    ],
    buttons: ['Start Over', 'Done']
  },
  '#past-expenses': {
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
    const spCatFetchUrl = `/api/spendingCategories/${this.props.userId.toString()}`;
    const payMethFetchUrl = `/api/paymentMethods/${this.props.userId.toString()}`;
    fetch(spCatFetchUrl)
      .then(spCatRes => spCatRes.json())
      .then(spendingCategories => {
        fetch(payMethFetchUrl)
          .then(payMethRes => payMethRes.json())
          .then(paymentMethods => this.setState({ spendingCategories, paymentMethods, spendingCategory: spendingCategories[0].spendingCategoryId, paymentMethod: paymentMethods[0].paymentMethodId }));
      });
  }

  whichFormOption(funct, bool, num) {
    // console.log('props.route in exp-form:', this.state.route);
    if (Object.keys(formOptions).includes(this.state.route.path)) {
      return null;
    } else {
      if (this.state.route.path === '') {
        if (funct === 'header') {
          return formOptions.newExp.headerTxt;
        } else if (funct === 'placeHolderTxt') {
          if ((typeof (bool) === 'string') && (bool === 'Expense')) {
            return formOptions.newExp.placeHolderTxt.true;
          } else if (bool === 'Deposit') {
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
    (e.target.getAttribute('data') === 'Expense')
      ? this.setState({ expense: 'Expense' })
      : this.setState({ expense: 'Deposit' });
  }

  change(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val });
  }

  findAmount(amount, expense) {
    amount = parseInt(amount).toFixed(2);
    return (expense === 'Expense')
      ? amount
      : amount * -1;

  }

  generateDate() {
    const dateFieldVal = document.querySelector('#date');
    return (this.state.route.path === '')
      ? new Date().toISOString()
      : dateFieldVal.value;
  }

  onSubmit(e) {
    e.preventDefault();
    const body = {
      userId: `${this.props.userId}`,
      date: this.generateDate(),
      amount: `${this.findAmount(this.state.amount, this.state.expense)}`,
      spendingCategory: `${this.state.spendingCategory}`,
      comment: `${this.state.comment}`,
      paymentMethod: `${this.state.paymentMethod}`
    };
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    fetch('/api/expenses', reqOptions)
      .then(result => {
        if (result.ok) {
          window.alert('Thanks for entering in your transaction!');
          e.target.reset();
        } else {
          window.alert('Whoops! Something went wrong. Please try again. Make sure all of the fields are filled out.');
        }
      })
      .catch(new ClientError(400, 'An unexpected error occured.'));
  }

  showDate(route) {
    return ((route.params.get('funct') === 'create') || (route.params.get('funct') === 'edit'))
      ? ''
      : 'disp-none';
  }

  render() {
    return (
      <div className="exp-form-cont col">
          <Toggle
          handleToggleClick={this.handleToggleClick.bind(this)}
          route={this.state.route}
          function={this.state.expense} />
        <h2 className="menu-txt">{this.whichFormOption('header')}</h2>
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="just-cent exp-form col"
          >
          <label
            htmlFor="date"
            className={`col form-label ${this.showDate(this.state.route)}`}>
            <h3 className={`form-label-txt ${this.showDate(this.state.route)}`}>Date:</h3>
            <input
              onChange={this.change.bind(this)}
              className={`${this.showDate(this.state.route)} form-input`}
              name="date"
              id="date"
              placeholder={this.whichFormOption('placeHolderTxt', [this.state.expense])}
              type="date"
              value={new Date()}
              min="2000-01-01"
              max={new Date()}></input>
          </label>
          <label
          htmlFor="amount"
           className="col form-label">
            <input
              onChange={this.change.bind(this)}
              className="form-input"
              name="amount"
              id="amount"
              placeholder={this.whichFormOption('placeHolderTxt', [this.state.expense])}
              type="number"></input>
                </label>
            <label
            htmlFor="spending-category"
            className="col form-label">
              <h3 className="form-label-txt">Pick A Spending Category:</h3>
              <Dropdown
              handler={this.change.bind(this)}
              name="spendingCategory"
              id="spendingCategory"
              className="form-input"
              arr={this.state.spendingCategories}
              primaryKey="spendingCategoryId" />
            </label>
            <label
            htmlFor="comment"
            className="col form-input-extra-padding form-label">
            <input
            onChange={this.change.bind(this)}
            name="comment"
            id="comment"
            className="form-input"
            placeholder="What did you buy?"
            type="text"></input>
            </label>
              <label
              htmlFor="payment-method"
              className="col form-label">
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
                <input type="reset"
                className="sm-button"
                value="Start Over"></input>
                <input
                type="submit"
                className="sm-button"
                value="Done"></input>
              </div>
              </form>

            </div>
    );
  }
}
