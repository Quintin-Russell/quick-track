import React from 'react';
import ApexCharts from 'apexcharts';

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyBudget: null,
      timeFrame: 'Month',
      totalSpending: 0
    };
  }

  componentDidMount() {
    fetch(`${this.props.page.fetchReqs.get.budget}/${this.props.userId}`);
    const options = {
      chart: {
        height: 300,
        type: 'radialBar'
      },

      series: [67],
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
      labels: ['Progress']
    };

    const chart = new ApexCharts(document.querySelector('#chart'), options);

    chart.render();
    // const options1 = {
    //   chart: {
    //     height: 280,
    //     type: 'radialBar'
    //   },
    //   series: [67],
    //   colors: ['#20E647'],
    //   plotOptions: {
    //     radialBar: {
    //       startAngle: -135,
    //       endAngle: 135,
    //       track: {
    //         background: '#333',
    //         startAngle: -135,
    //         endAngle: 135
    //       },
    //       dataLabels: {
    //         name: {
    //           show: false
    //         },
    //         value: {
    //           fontSize: '30px',
    //           show: true
    //         }
    //       }
    //     }
    //   },
    //   fill: {
    //     type: 'gradient',
    //     gradient: {
    //       shade: 'dark',
    //       type: 'horizontal',
    //       gradientToColors: ['#87D4F9'],
    //       stops: [0, 100]
    //     }
    //   },
    //   stroke: {
    //     lineCap: 'butt'
    //   },
    //   labels: ['Progress']
    // };

    // new ApexCharts(document.querySelector('#chart'), options1).render();
  }

  render() {

    return (
      <div className="exp-form-cont col">
        <h1 className="menu-txt">Summary Quick View</h1>
        <div id="chart"></div>
      </div>
    );
  }
}
