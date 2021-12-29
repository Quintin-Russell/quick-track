import React from 'react';

export default class Toggle extends React.Component {

  setHighlight(option) {
    const funct = (typeof (this.props.function) === 'object')
      ? this.props.function[0]
      : this.props.function;
    return option === funct
      ? 'toggle-highlight exp-toggle-txt'
      : 'exp-toggle-txt';
  }

  render() {
    return (
      <span className={(this.props.page.name === 'Set Your Budget')
        ? 'row'
        : 'row padding-extra'}>
        {
          this.props.page.formOptions.toggleOptions.map(option => {
            if (this.props.page.formOptions.toggleOptions.findIndex(index => (index === option)) < (this.props.page.formOptions.toggleOptions.length - 1)) {
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
