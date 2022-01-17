import React from 'react';

import Toggle from '../components/toggle';

export default class SetBudget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeFrame: 'Month',
      monthlyBudget: null
    };
  }

  convertBudget(timeFrame, val) {
    let monthlyBudget;

    val = parseFloat(val);

    (timeFrame === 'Month')
      ? monthlyBudget = val.toFixed(2)
      : (timeFrame === 'Week')
          ? monthlyBudget = (val * 4.333).toFixed(2)
          : monthlyBudget = (val / 12).toFixed(2);

    return (isNaN(monthlyBudget))
      ? null
      : monthlyBudget;
  }

  componentDidMount() {
    fetch(`${this.props.page.fetchReqs.get.url}/${this.props.userId}`)
      .then(result => result.json())
      .then(resJson => {
        const { monthlyBudget, timeFrame } = resJson;
        this.setState({ monthlyBudget, timeFrame });
      });
  }

  handleToggleClick(e) {
    const timeFrame = e.target.getAttribute('data');
    this.setState({ timeFrame });
  }

  setBudget(e) {
    const monthlyBudget = this.convertBudget(this.state.timeFrame, e.target.value);
    this.setState({ monthlyBudget });
  }

  reset(e) {
    document.getElementById('budget').value = '';
  }

  sendPatch(e) {
    if (!this.state.monthlyBudget) {
      return window.alert('You haven\'t entered in a valid budget. Please enter one below.');
    } else {

      const body = {
        userId: `${this.props.userId}`,
        monthlyBudget: `${this.state.monthlyBudget}`,
        timeFrame: `${this.state.timeFrame}`
      };

      const reqOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };

      fetch(`${this.props.page.fetchReqs.patch.url}`, reqOptions)
        .then(result => {
          if (result.ok) {
            window.alert(`${this.props.page.fetchReqs.patch.successMessage}`);
            this.reset();
          } else {
            window.alert('Whoops! Something went wrong. Please try again. Make sure all of the fields are filled out.');
          }
        }
        );
    }
  }

  convertBudgetInfo(timeFrame, val) {

    let monthlyBudget;

    val = parseFloat(val);

    (timeFrame === 'Month')
      ? monthlyBudget = val.toFixed(2)
      : (timeFrame === 'Week')
          ? monthlyBudget = (val / 4.333).toFixed(2)
          : monthlyBudget = (val * 12).toFixed(2);

    return (isNaN(monthlyBudget))
      ? '--'
      : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyBudget);
  }

  renderBudgetInfo(toggleArr, targetVal, messageObjArr) {
    const tarIndex = toggleArr.findIndex(tar => targetVal === tar);

    return toggleArr.map(option => {
      return (

        <p key={option} className={(toggleArr.findIndex(tar => option === tar) === tarIndex) ? 'oswald-semi-bld' : 'oswald-norm'}>
          {messageObjArr[toggleArr.findIndex(tar => option === tar)]}{(!(this.convertBudgetInfo(option, this.state.monthlyBudget) === 'NaN') ? this.convertBudgetInfo(option, this.state.monthlyBudget) : '--')}
        </p>

      );
    });
  }

  render() {
    const placeholderTxt = this.props.page.formOptions.placeHolderTxt[this.state.timeFrame];

    return (
      <>
      <form
      onSubmit={this.sendPatch.bind(this)}
      className="menu-header-cont">

      <Toggle
      page={this.props.page}
      handleToggleClick={this.handleToggleClick.bind(this)}
      route={this.props.route}
      function={this.state.timeFrame}
       />

      <label
      htmlFor="budget"
      className="col form-label budget-width">
        <input
        onChange={this.setBudget.bind(this)}
        placeholder={placeholderTxt}
        className="form-input"
        name="budget"
        id="budget"
        type="number"
        step='0.01'></input>
      </label>

        <div className="row budget-width button-cont">
        <button
        onClick={this.reset}
        className="sm-button"
        >Cancel</button>

          <button
          type='submit'
          className="sm-button"
          >Set Budget</button>

      </div>

      </form>

        <div className="budget-info-cont col">
          {this.renderBudgetInfo(this.props.page.formOptions.toggleOptions, this.state.timeFrame, ['Your Weekly Budget: ', 'Your Monthly Budget: ', 'Your Yearly Budget: '])}
      </div>

      </>
    );
  }
}
