import React from 'react';
import Dropdown from './dropdown';
import Toggle from './toggle';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          .then(paymentMethods => {
            let expense = 'Expense';
            if (this.props.editObj) {
              expense =
              (this.props.editObj.amount)
                ? parseFloat(this.props.editObj.amount) < 0
                  ? 'Deposit'
                  : 'Expense'
                : 'Expense';
              this.addEditValues();
              this.setState({ expense, spendingCategories, paymentMethods });
            } else {
              this.setState({ expense, spendingCategories, paymentMethods, spendingCategory: spendingCategories[0].spendingCategoryId, paymentMethod: paymentMethods[0].paymentMethodId });
            }
          });
      });
  }

  whichFormOption(funct, exp) {
    const formOptions = this.props.page.formOptions;
    if (this.props.route.path === '') {
      if (funct === 'header') {
        return formOptions.headerTxt;
      } else if (funct === 'placeHolderTxt') {
        if (exp === 'Expense') {
          return formOptions.placeHolderTxt.Expense;
        } else if (exp === 'Deposit') {
          return formOptions.placeHolderTxt.Deposit;
        }
      }
    } else if (this.props.route.path === 'pastexpenses') {
      if (funct === 'header') {
        return (this.props.route.params.get('funct') === 'create')
          ? formOptions.headerTxt.create
          : formOptions.headerTxt.edit;
      } else if (funct === 'placeHolderTxt') {
        if (exp === 'Expense') {
          return formOptions.placeHolderTxt.Expense;
        } else if (exp === 'Deposit') {
          return formOptions.placeHolderTxt.Deposit;
        }
      }
    }
  }

  showDate(route) {
    return ((route.params.get('funct') === 'create') || (route.params.get('funct') === 'edit'))
      ? ''
      : 'disp-none';
  }

  findAmount(amount, expense) {
    amount = parseFloat(amount);
    return (expense === 'Expense')
      ? amount.toFixed(2)
      : (amount * -1).toFixed(2);

  }

  generateDate() {
    const dateFieldVal = document.querySelector('#date');
    let time;
    if (this.props.route.path === '') {
      time = Date.now() + (new Date().getTimezoneOffset() * 60 * 1000);
    } else {
      const inputDate = Date.parse(dateFieldVal.value) + (new Date().getTimezoneOffset() * 60 * 1000);
      time = new Date(inputDate);
    }
    const dt = new Date(time);
    return `${((dt.getMonth() + 1) < 10) ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1}-${(dt.getDate() < 10) ? `0${dt.getDate()}` : dt.getDate()}-${dt.getFullYear()}`;
  }

  addEditValues() {

    if (this.props.editObj) {
      const update = {};
      const vals = {
        date: document.getElementById('date'),
        amount: document.getElementById('amount'),
        spendingCategory: document.getElementById('spendingCategory'),
        comment: document.getElementById('comment'),
        paymentMethod: document.getElementById('paymentMethod')
      };
      for (const item in this.props.editObj) {
        if (vals[item]) {
          if (item === 'date') {
            const dt = new Date(this.props.editObj[item]);
            vals[item].value = dt.toISOString().substr('T', 10);
            update[item] = dt.toISOString().substr('T', 10);
          } else if (item === 'amount') {
            let itemNum = parseFloat(this.props.editObj[item]).toFixed(2);
            if (itemNum < 0) {
              update.expense = 'Deposit';
              itemNum = itemNum * -1;
            } else {
              update.expense = 'Expense';
            }
            update.amount = itemNum;
            vals[item].value = itemNum.toString();
          } else {
            vals[item].value = this.props.editObj[item];
            update[item] = this.props.editObj[item];
          }
        } else if (item === 'paymentMethodId') {
          const paymentMethod = this.props.editObj[item];
          update.paymentMethod = paymentMethod;
          vals.paymentMethod.value = paymentMethod;
        } else if (item === 'spendingCategoryId') {
          update.spendingCategory = this.props.editObj[item];
          vals.spendingCategory.selected = true;
        }
      }
      this.setState(update);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.amount) {
      return window.alert('Please enter an amount, payment method, spending category and comment');
    }
    if (!this.state.paymentMethod || !this.state.spendingCategory) {
      return window.alert('We can\'t find the Payment Method or Spending Category you originally used. Please choose another one from the list');
    }

    const body = {
      userId: `${this.props.userId}`,
      date: this.generateDate(),
      amount: `${this.findAmount(this.state.amount, this.state.expense)}`,
      spendingCategory: `${this.state.spendingCategory}`,
      comment: `${this.state.comment}`,
      paymentMethod: `${this.state.paymentMethod}`
    };
    if (this.props.editObj) body.expenseId = this.props.editObj.expenseId;
    const reqOptions =
    (!this.props.route.params.get('funct') || this.props.route.params.get('funct') === 'create')
      ? {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      : {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        };
    fetch('/api/expenses', reqOptions)
      .then(result => {
        if (result.ok) {
          if (this.props.resetEditOrDeleteObj) {
            this.props.resetEditOrDeleteObj();
          }
          window.alert('Thanks for entering in your transaction!');
          e.target.reset();
        } else {
          window.alert('Whoops! Something went wrong. Please try again. Make sure all of the fields are filled out.');
        }
      });
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

  render() {
    return (
      <div className="exp-form-cont col">
          <Toggle
          page={this.props.page}
          handleToggleClick={this.handleToggleClick.bind(this)}
          function={this.state.expense} />
        <h2 className="menu-txt">{this.whichFormOption('header')}</h2>
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="just-cent exp-form col"
          >
          <label
            htmlFor="date"
            className={`col form-label ${this.showDate(this.props.route)}`}>
            <h3 className={`form-label-txt ${this.showDate(this.props.route)}`}>Date:</h3>
            <input
              onChange={this.change.bind(this)}
              className={`${this.showDate(this.props.route)} form-input`}
              name="date"
              id="date"
              type="date"
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
              placeholder={this.whichFormOption('placeHolderTxt', this.state.expense)}
              type="number"
              step='0.01'></input>
                </label>
            <label
            htmlFor="spending-category"
            className="col form-label">
              <h3 className="form-label-txt">Pick A Spending Category:</h3>
              <Dropdown
              selectedVal={this.state.spendingCategory}
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
              selectedVal={this.state.paymentMethod}
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

            <a href={this.props.page.hash}>
                    <button
                    onClick={(this.props.resetEditOrDeleteObj) ? this.props.resetEditOrDeleteObj : null}
                    type="submit"
                    className="sm-button"
                    value="Done">
                      Done
                    </button>
                </a>
              </div>
              </form>

            </div>
    );
  }
}
