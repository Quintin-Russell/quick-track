import React from 'react';

import { convertBudget, setCategoryGraphInfo, functList, budgetPercent, setAllCategoryColGraphInfo, setDonutInfo } from '../summary-funct';

import Dropdown from '../components/dropdown';
import Toggle from '../components/toggle';
import Chart from 'react-apexcharts';

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyBudget: null,
      timeFrame: 'Month',
      arr: [0, 1, 2],
      spendingCategories: [],
      graph: null,
      options: {}
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

  setGraph() {
    let options;
    let series;
    let type;

    const percentBudget = budgetPercent(this.state.arr, this.state.timeFrame, this.state.monthlyBudget);

    if (!this.state.graph || this.state.graph === 'a') {

      type = 'radialBar';

      series = [percentBudget];

      const quickViewColor = (series >= 100)
        ? { startFade: ['#C3326F'], endFade: ['#FF532F'] }
        : (series > 90 && series < 100)
            ? { startFade: ['#F2BF6C'], endFade: ['#EDE342'] }
            : { startFade: ['#20c3e660'], endFade: ['#44aa4490'] };

      options = {
        chart: { height: '375vh' },
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
    } else if (this.state.graph === 'c') {

      series = setDonutInfo(this.state.spendingCategories, 'spendingCategoryId', this.state.arr, this.state.timeFrame).values;

      type = 'donut';

      options = {
        chart: {
          type: 'donut'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '70%'
            },
            labels: {
              show: true
            }
          }
        },
        labels: setDonutInfo(this.state.spendingCategories, 'spendingCategoryId', this.state.arr, this.state.timeFrame).categories,
        title: {
          text: 'Spending Breakdown By Spending Category'
        },
        states: {
          hover: {
            filter: 'none'
          }
        }
      };
    } else {

      const nameVal = (this.state.timeFrame === 'Year')
        ? 'Monthly Spending'
        : 'Daily Spending';

      const lineColor = (percentBudget >= 100)
        ? '#FF532F'
        : (percentBudget > 90 && percentBudget < 100)
            ? '#EDE342'
            : '#C5EDAC';

      type = 'line';

      series = [
        {
          name: nameVal,
          type: 'column',
          data: (this.state.graph === 'b')
            ? setAllCategoryColGraphInfo(this.state.arr, this.state.timeFrame, this.state.monthlyBudget).unitSpending
            : setCategoryGraphInfo(this.state.arr, this.state.timeFrame, this.state.monthlyBudget, this.state.graph).unitSpending
        },
        {
          name: 'Total Spending',
          type: 'line',
          data: (this.state.graph === 'b')
            ? setAllCategoryColGraphInfo(this.state.arr, this.state.timeFrame, this.state.monthlyBudget).totalSpending
            : setCategoryGraphInfo(this.state.arr, this.state.timeFrame, this.state.monthlyBudget, this.state.graph).totalSpending
        },
        {
          name: 'Budget',
          type: 'line',
          data: (this.state.graph === 'b')
            ? setAllCategoryColGraphInfo(this.state.arr, this.state.timeFrame, this.state.monthlyBudget).budgetArr
            : setCategoryGraphInfo(this.state.arr, this.state.timeFrame, this.state.monthlyBudget, this.state.graph).budgetArr
        }
      ];

      options = {
        chart: {
          height: 350,
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#99C2A2', lineColor, '#66C7F4'],
        stroke: {
          width: [4, 4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        xaxis: {
          categories: (this.state.graph === 'b')
            ? setAllCategoryColGraphInfo(this.state.arr, this.state.timeFrame, this.state.monthlyBudget).xaxis
            : setCategoryGraphInfo(this.state.arr, this.state.timeFrame, this.state.monthlyBudget, this.state.graph).xaxis
        },
        yaxis: [
          {
            seriesName: nameVal,
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
            opposite: true,
            seriesName: (this.state.timeFrame === 'Week') ? nameVal : 'Total Spending',
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true
            },
            title: {
              text: 'Total Spending'
            }
          },
          {
            seriesName: (this.state.timeFrame === 'Week') ? nameVal : 'Total Spending',
            show: false
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

    const retVal = { options, series, type };
    return retVal;
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

  graphInfo() {
    const graphInfo = this.setGraph();
    return (graphInfo.type === 'line' && graphInfo.series[0].data.length === 0)
      ? <p className="text-center padding-1rem pg-id-txt">There are no expenses in this category yet!</p>
      : <Chart
          options={graphInfo.options}
          series={graphInfo.series}
          type={graphInfo.type}
          width='100%' />;
  }

  render() {
    if (!this.state.options || !this.state.arr || !this.state.spendingCategories) {
      return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
    } else {
      const header = (this.state.graph === 'a' || !this.state.graph)
        ? 'Summary Quick View'
        : 'Categorical Summary';
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

        </div>
        <div className="exp-form-cont margin-0-cent col">
          <h1 className="menu-txt">{header}</h1>

          <div id="chart">
            {this.graphInfo()}
          </div>
          <div className=" col summary-info-cont">
            <p className="text-center oswald-norm">
              {`Your ${this.state.timeFrame}ly Budget: $${convertBudget(this.state.timeFrame, this.state.monthlyBudget)}`}
            </p>
            {functList.map(funct => {
              return (<p key={funct.name} className="text-center oswald-norm">
                {funct.name}: {`$${funct.funct(this.state.arr, this.state.timeFrame, this.state.monthlyBudget)}`}
              </p>);
            })}
           </div>
         </div>
      </>
      );
    }
  }
}
