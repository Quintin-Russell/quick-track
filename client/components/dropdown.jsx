import React from 'react';

export default class Dropdown extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <select className={this.props.className} name={this.props.name} id={this.props.id}>
        {this.props.arr.map(item => {
          return <option className="form-label-txt" key={item[this.props.primaryKey]} value={item[this.props.primaryKey]}>{item.name}</option>;
        })}
      </select>
    );
  }
}
