import React from 'react';
import Table from '../components/table';

export default class PastExpenses extends React.Component {

  render() {
    return (
      <>
        <Table
        route={this.props.route}
        userId={this.props.userId}
        setEditOrDeleteObj={this.props.setEditOrDeleteObj}
        page={this.props.page} />
        page={this.props.page}
        arr={this.props.pastExpenses}
        convertTime={this.props.convertTime}
        setEditOrDeleteObj={this.props.setEditOrDeleteObj} />
      </>
    );
  }
}
