import React from 'react';
import Dropdown from './dropdown';
// import Toggle from './toggle';

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

// make if/else for if it's a new or past expense

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props.route,
      formSpCat: null,
      formPayMeth: null,
      formComment: null,
      formAmount: null,
      spendingCategories: [],
      paymentMethods: [],
      inputedOption: null,
      expense: true
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
          .then(paymentMethods => this.setState({ spendingCategories, paymentMethods }));
      });
  }

  // handleToggleClick(e) {
  //   this.setState({ expense: [!this.state.expense] });
  // }

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

  onChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val });
  }

  clearForm(e) {

  }

  onSubmit(e) {
    e.preventDefault();
    const body = { userId };
    fetch('/api/expenses', { method: 'POST', body });
  }

  render() {
    return (
      <div className="exp-form-cont col">
          {/* <Toggle handleToggleClick= /> */}
        <h2 className="menu-txt">{this.whichFormOption('header')}</h2>
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="just-cent exp-form col"
          >
          <label htmlFor="amount" className="col form-label">
            <input
              onChange={this.onChange.bind(this)}
              className="form-input"
              name="formAmount"
              id="formAmount"
              placeholder={this.whichFormOption('placeHolderTxt', [this.state.expense])}
              type="number"></input>
                </label>
            <label htmlFor="spending-category" className="col form-label">
              <h3 className="form-label-txt">Pick A Spending Category:</h3>
              {/* make component from fetch req to category db */}
              <Dropdown
              onChange={this.onChange.bind(this)}
              name="formSpCat"
              id="formSpCat"
              className="form-input"
              arr={this.state.spendingCategories}
              primaryKey="spendingCategoryId" />
            </label>
            <label htmlFor="comment" className="col form-input-extra-padding form-label">
            <input
            onChange={this.onChange.bind(this)}
            name="formComment"
            id="formComment"
            className="form-input"
            placeholder="What did you buy?"
            type="text"></input>
            </label>
              <label htmlFor="payment-method" className="col form-label">
                <h3 className="form-label-txt">Pick a Payment Method:</h3>
                <Dropdown
                onChange={this.onChange.bind(this)}
                className="form-input"
                arr={this.state.paymentMethods}
                name="formPayMeth"
                id="formPayMeth"
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
