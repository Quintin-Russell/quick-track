import React from 'react';
import Table from '../components/table';

export default class SpendingCategories extends React.Component {
  render() {
    return (
      <Table
        route={this.props.route}
        userId={this.props.userId}
        setEditOrDeleteObj={this.props.setEditOrDeleteObj}
        page={this.props.page} />
    );
  }
}
