import React from 'react';

const toggleOptions = {
  form: {
    toggleOptions: ['Expense', 'Deposit']
  },
  setBudget: {
    toggleOptions: ['Weekly', 'Monthly', 'Year']
  }
};

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisPage:
        ((props.route.path === '') || (props.route.path === 'past-exp'))
          ? toggleOptions.form
          : toggleOptions.setBudget,
      selected:
        ((props.route.path === '') || (props.route.path === 'past-exp'))
          ? toggleOptions.form.toggleOptions[0]
          : props.defaultTimeFrame
    };
  }

  toggleClick(e) {
    this.props.handleToggleClick.bind(this);
    this.setState({ selected: e.target.getAttribute('data') });
  }

  setHighlight(option) {
    return option === this.state.selected
      ? 'toggle-highlight exp-toggle-txt'
      : 'exp-toggle-txt';
  }

  render() {
    return (
      <span onClick={this.toggleClick.bind(this)} className="row padding-extra">
        {
          this.state.thisPage.toggleOptions.map(option => {
            if (this.state.thisPage.toggleOptions.findIndex(index => index === option) < (this.state.thisPage.toggleOptions.length - 1)) {
              return (
                <div className='row' key={Math.random()}>
                 <p data={option} className={this.setHighlight(option)}>
                  {option}
                    </p>
                    <p className="exp-toggle-txt">
                  |
                    </p>
                  </div>

              );
            } else {
              return <p data={option} key={Math.random()} className={this.setHighlight(option)}>{option}</p>;
            }
          })
        }
      </span>
    );
  }
}
