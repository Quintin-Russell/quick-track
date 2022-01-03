import React from 'react';
import ApexCharts from 'apexcharts';
import { findBudgetPercent } from '../summary-funct';

import Dropdown from '../components/dropdown';
import Toggle from '../components/toggle';

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyBudget: null,
      timeFrame: 'Month',
      arr: [],
      spendingCategories: []
    };
  }

  componentDidMount() {
    fetch(`${this.props.page.fetchReqs.get.budget.url}/${this.props.userId}`)
      .then(result => result.json())
      .then(resultJson => {
        const { monthlyBudget, timeFrame } = resultJson;
        fetch(`${this.props.page.fetchReqs.get.expenses.url}/${this.props.userId}`)
          .then(result1 => result1.json())
          .then(arr => {
            fetch(`${this.props.page.fetchReqs.get.spendingCategories.url}/${this.props.userId}`)
              .then(result2 => result2.json())
              .then(spendingCategories => this.setState({ spendingCategories, arr, monthlyBudget, timeFrame }));
          });

      });
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldState !== this.state) {

      const series = (this.state.arr)
        ? findBudgetPercent(this.state.arr, this.state.timeFrame, this.state.monthlyBudget)
        : 0;

      const options = {
        chart: {
          height: 300,
          type: 'radialBar'
        },

        series: [series],
        colors: ['#20E647'],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '70%',
              background: '#293450'
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15
              }
            },
            dataLabels: {
              name: {
                offsetY: -10,
                color: '#fff',
                fontSize: '13px'
              },
              value: {
                color: '#fff',
                fontSize: '30px',
                show: true
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            gradientToColors: ['#87D4F9'],
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [`${this.state.timeFrame}ly Budget Spent`]
      };

      const chart = new ApexCharts(document.querySelector('#chart'), options);

      chart.render();
    }
  }

  handleToggleClick(e) {
    const timeFrame = e.target.getAttribute('data');
    this.setState({ timeFrame });
  }

  change(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val });
  }

  render() {
    return (
      <>
      <div className="row just-align-center">
          <div className="col just-align-center">
          <Toggle
            page={this.props.page}
            handleToggleClick={this.handleToggleClick.bind(this)}
            route={this.props.route}
            function={this.state.timeFrame} />
          <div className="col">
            <h5 className='summary-dropdown-title oswald-semi-bld'>Spending Categories</h5>
            <Dropdown
              selectedVal=''
              handler={this.change.bind(this)}
              name="spendingCategory"
              id="spendingCategory"
              className="form-input"
              arr={this.state.spendingCategories}
              primaryKey="spendingCategoryId" />
          </div>
        </div>
        <i className="fas fa-th"></i>
      </div>
      <div className="exp-form-cont col">
        <h1 className="menu-txt">Summary Quick View</h1>
        <div id="chart"></div>
      </div>
      </>

    );
  }
}
