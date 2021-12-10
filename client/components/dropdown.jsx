import React from 'react';

export default class Dropdown extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <select id={this.props.id} name={this.props.name} className={this.props.className}>
        {this.props.arr.map(item => {
          return <option className="form-label-txt" key={item[this.props.primaryKey]} value={item[this.props.primaryKey]}>{item.name}</option>;
        })}
      </select>
    );
  }
}
