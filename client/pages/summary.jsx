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
      spendingCategories: [],
      graph: null
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
      let options;
      if (!this.state.graph || this.state.graph === 'a') {
        const budgetPercent = functList.find(fun => fun.name === '% of Budget Spent');

        const series = (this.state.arr)
          ? budgetPercent.funct(this.state.arr, this.state.timeFrame, this.state.monthlyBudget)
          : 0;

        const quickViewColor = (series >= 100)
          ? { startFade: ['#C3326F'], endFade: ['#FF532F'] }
          : (series > 90 && series < 100)
              ? { startFade: ['#F2BF6C'], endFade: ['#EDE342'] }
              : { startFade: ['#20c3e660'], endFade: ['#44aa4490'] };

        options = {
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
      } else if (this.state.graph === 'b') {
        const nameVal = (this.state.timeFrame === 'Year')
          ? 'Monthly Spending'
          : 'Daily Spending';
        options = {
          chart: {
            height: 350,
            type: 'line',
            stacked: false
          },
          dataLabels: {
            enabled: false
          },
          colors: ['#99C2A2', '#C5EDAC', '#66C7F4'],
          series: [

            {
              name: nameVal,
              type: 'column',
              data: [21.1, 23, 33.1, 34, 44.1, 44.9, 56.5, 58.5]
            },
            {
              name: 'Total Spending',
              type: 'line',
              data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
            },
            {
              name: 'Budget',
              type: 'line',
              data: [convertBudget(this.state.timeFrame, this.state.monthlyBudget)]
            }
          ],
          stroke: {
            width: [4, 4, 4]
          },
          plotOptions: {
            bar: {
              columnWidth: '20%'
            }
          },
          xaxis: {
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
          },
          yaxis: [
            {
              seriesName: 'Column A',
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true
              },
              title: {
                text: 'Spending'
              }
            },
            {
              seriesName: 'Column A',
              show: false
            }, {
              opposite: true,
              seriesName: 'Line C',
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true
              },
              title: {
                text: 'Line'
              }
            }
          ],
          tooltip: {
            shared: false,
            intersect: true,
            x: {
              show: false
            }
          },
          legend: {
            horizontalAlign: 'left',
            offsetX: 40
          }
        };
      }
      const chart = new ApexCharts(document.querySelector('#chart'), options);

      chart.render();
    }

  }

  handleToggleClick(e) {
    const timeFrame = e.target.getAttribute('data');
    this.setState({ timeFrame });
  }

  change(e) {
    const val = e.target.value;
    this.setState({ graph: val });
  }

  setDropdownArr() {
    const obj1 = {
      name: 'Quick View',
      spendingCategoryId: 'a'
    };
    const obj2 = {
      name: 'All Categories',
      spendingCategoryId: 'b'
    };
    const obj3 = {
      name: 'By Category',
      spendingCategoryId: 'c'
    };
    return [...this.state.spendingCategories, obj1, obj2, obj3];
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
            <h5 className='text-center summary-dropdown-title oswald-semi-bld'>Graphed by:</h5>
            <Dropdown
              selectedVal='a'
              handler={this.change.bind(this)}
              name="graph"
              id="spendingCategory"
              className="form-input"
              arr={this.setDropdownArr()}
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
