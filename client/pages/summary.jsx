import React from 'react';
import ApexCharts from 'apexcharts';
import { convertBudget, functList } from '../summary-funct';

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
      const budgetPercent = functList.find(fun => fun.name === '% of Budget Spent');

      const series = (this.state.arr)
        ? budgetPercent.funct(this.state.arr, this.state.timeFrame, this.state.monthlyBudget)
        : 0;

      const quickViewColor = (series >= 100)
        ? { startFade: ['#C3326F'], endFade: ['#FF532F'] }
        : (series > 90 && series < 100)
            ? { startFade: ['#F2BF6C'], endFade: ['#EDE342'] }
            : { startFade: ['#20c3e660'], endFade: ['#44aa4490'] };

      const options = {
        chart: {
          height: 300,
          type: 'radialBar'
        },

        series: [series],
        colors: quickViewColor.startFade,
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '70%'
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
                color: '#292929',
                fontSize: '13px'
              },
              value: {
                color: '#292929',
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
            gradientToColors: quickViewColor.endFade,
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
        <div className="padding-1rem row just-align-center">
          <div className="col just-align-center budget-width">
          <Toggle
            page={this.props.page}
            handleToggleClick={this.handleToggleClick.bind(this)}
            route={this.props.route}
            function={this.state.timeFrame} />
          <div className="col budget-width">
            <h5 className='text-center summary-dropdown-title oswald-semi-bld'>Spending Categories</h5>
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
        {/* <a href={this.props.page.showModalQuery}>
          <i className="fas fa-th"></i>
        </a> */}

      </div>
        <div className="exp-form-cont margin-0-cent col">
        <h1 className="menu-txt">Summary Quick View</h1>
        <div id="chart"></div>
          <div className=" col summary-info-cont">
            <p className="text-center oswald-norm">
              {`Your ${this.state.timeFrame}ly Budget: $${convertBudget(this.state.timeFrame, this.state.monthlyBudget)}`}
            </p>
            {functList.map(funct => {
              return (<p key={funct.name} className="text-center oswald-norm">
               {funct.name}: {funct.funct(this.state.arr, this.state.timeFrame, this.state.monthlyBudget)}
              </p>);
            })}
          </div>
      </div>
      </>

    );
  }
}
