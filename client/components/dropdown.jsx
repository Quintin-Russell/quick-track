import React from 'react';

export default class Dropdown extends React.Component {

  render() {
    return (
      <select onChange={this.props.handler} id={this.props.id} name={this.props.name} className={this.props.className}>
        {this.props.arr.map(item => {
          return <option selected={(item[this.props.primaryKey]) === this.props.selectedVal} className="form-label-txt" key={item[this.props.primaryKey]} value={item[this.props.primaryKey]}>{item.name}</option>;
        })}
      </select>
    );
  }
}
