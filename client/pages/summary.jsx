// import React from 'react';
// import ApexCharts from 'apexcharts';

// export default class Summary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       monthlyBudget: null,
//       timeFrame: 'Month',
//       arr: []
//     };
//   }

//   convertBudget(timeFrame, monthlyBudget) {
//     return (timeFrame === 'Month')
//       ? parseFloat(monthlyBudget).toFixed(2)
//       : (timeFrame === 'Year')
//           ? (parseFloat(monthlyBudget).toFixed(2)) * 12
//           : (parseFloat(monthlyBudget).toFixed(2)) / 4.33;
//   }

//   findWkNum(date) {
//     date = new Date(date);
//     const oneJan = new Date(date.getFullYear(), 0, 1);
//     const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
//     return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
//   }

//   findWkExpSum(arr) {
//     if (arr) {
//       const wkExpSum = 0;
//       const wkNum = this.findWkNum(new Date());
//       for (const exp of arr) {
//         if (this.findWkNum(exp.date) === wkNum) {
//           return wkExpSum + (parseFloat(exp.amount).toFixed(2));
//         }
//       }
//       return wkExpSum;
//     }
//   }

//   componentDidMount() {
//     fetch(`${this.props.page.fetchReqs.get.budget.url}/${this.props.userId}`)
//       .then(result => result.json())
//       .then(resultJson => {
//         const { monthlyBudget, timeFrame } = resultJson;
//         fetch(`${this.props.page.fetchReqs.get.expenses.url}/${this.props.userId}`)
//           .then(result1 => result1.json())
//           .then(arr => this.setState({ arr, monthlyBudget, timeFrame }));
//       });
//     const options = {
//       chart: {
//         height: 300,
//         type: 'radialBar'
//       },

//       series: [],
//       colors: ['#20E647'],
//       plotOptions: {
//         radialBar: {
//           hollow: {
//             margin: 0,
//             size: '70%',
//             background: '#293450'
//           },
//           track: {
//             dropShadow: {
//               enabled: true,
//               top: 2,
//               left: 0,
//               blur: 4,
//               opacity: 0.15
//             }
//           },
//           dataLabels: {
//             name: {
//               offsetY: -10,
//               color: '#fff',
//               fontSize: '13px'
//             },
//             value: {
//               color: '#fff',
//               fontSize: '30px',
//               show: true
//             }
//           }
//         }
//       },
//       fill: {
//         type: 'gradient',
//         gradient: {
//           shade: 'dark',
//           type: 'vertical',
//           gradientToColors: ['#87D4F9'],
//           stops: [0, 100]
//         }
//       },
//       stroke: {
//         lineCap: 'round'
//       },
//       labels: [`${this.state.timeFrame}ly Budget Spent`]
//     };

//     const series = (this.state.timeFrame === 'Week')
//       ? findWkExpSum(this.state.arr) / this.convertBudget(this.state.timeFrame, this.state.monthlyBudget)
//       : (this.state.timeFrame === 'Year')
//           ? findYrExpSum(this.state.arr) / this.convertBudget(this.state.timeFrame, this.state.monthlyBudget)
//           : findMnExpSum(this.state.arr) / this.convertBudget(this.state.timeFrame, this.state.monthlyBudget);

//     const chart = new ApexCharts(document.querySelector('#chart'), options);

//     chart.render();
//     // const options1 = {
//     //   chart: {
//     //     height: 280,
//     //     type: 'radialBar'
//     //   },
//     //   series: [67],
//     //   colors: ['#20E647'],
//     //   plotOptions: {
//     //     radialBar: {
//     //       startAngle: -135,
//     //       endAngle: 135,
//     //       track: {
//     //         background: '#333',
//     //         startAngle: -135,
//     //         endAngle: 135
//     //       },
//     //       dataLabels: {
//     //         name: {
//     //           show: false
//     //         },
//     //         value: {
//     //           fontSize: '30px',
//     //           show: true
//     //         }
//     //       }
//     //     }
//     //   },
//     //   fill: {
//     //     type: 'gradient',
//     //     gradient: {
//     //       shade: 'dark',
//     //       type: 'horizontal',
//     //       gradientToColors: ['#87D4F9'],
//     //       stops: [0, 100]
//     //     }
//     //   },
//     //   stroke: {
//     //     lineCap: 'butt'
//     //   },
//     //   labels: ['Progress']
//     // };

//     // new ApexCharts(document.querySelector('#chart'), options1).render();
//   }

//   render() {
//     console.log('this.state in Summary.jsx:', this.state);
//     console.log('findWkExpSum(arr) in summary.jsx:', this.findWkExpSum(this.state.arr));
//     return (
//       <div className="exp-form-cont col">
//         <h1 className="menu-txt">Summary Quick View</h1>
//         <div id="chart"></div>
//       </div>
//     );
//   }
// }
