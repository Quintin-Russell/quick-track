import React from 'react';
import Table from '../components/table';

export default class PastExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastExpenses: []
    };
  }

  componentDidMount() {
    fetch(`/api/expenses/${this.props.userId.toString()}`)
      .then(result => result.json())
      .then(resJson => this.setState({ pastExpenses: resJson }));
  }

  render() {
    // console.log('this.state.pastExpenses:', this.state.pastExpenses);
    return (
      <>
        <Table
        tableInfo={this.props.tableInfo}
        arr={this.state.pastExpenses} />
      </>
    );
  }
}
