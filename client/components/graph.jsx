import React from 'react';

export default class ApexChart extends React.Component {

  render() {
    return (
        <ApexChart options={this.props.options} series={this.props.series} />
    );
  }
}
