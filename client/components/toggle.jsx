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
          : toggleOptions.setBudget
    };

  }

  // toggleClick(e) {
  //   console.log('e.target.data in toggle.jsx:', e.target.getAttribute('data'));
  //   return () => this.props.handleToggleClick();
  // }

  setHighlight(option) {
    return option === this.props.function
      ? 'toggle-highlight exp-toggle-txt'
      : 'exp-toggle-txt';
  }

  render() {
    return (
      <span className="row padding-extra">
        {
          this.state.thisPage.toggleOptions.map(option => {
            if (this.state.thisPage.toggleOptions.findIndex(index => (index === option)) < (this.state.thisPage.toggleOptions.length - 1)) {
              return (
                <div className='row' key={Math.random()}>
                  <p onClick={this.props.handleToggleClick} data={option} className={this.setHighlight(option)}>
                  {option}
                    </p>
                    <p className="exp-toggle-txt">
                  |
                    </p>
                  </div>

              );
            } else {
              return <p onClick={this.props.handleToggleClick} data={option} key={Math.random()} className={this.setHighlight(option)}>{option}</p>;
            }
          })
        }
      </span>
    );
  }
}
