// import React from 'react';

// import funct from '../summary-funct';

// export default class SummaryModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       summaryStatistics: [],
//       timeFrame: 'Month'
//     };
//   }

//   componentDidMount() {
//     if (this.props.page.name === 'Summary') {
//       fetch(`${this.props.page.fetchReqs.get.buget.url}/${this.props.userId}`)
//         .then(result => result.json())
//         .then(resJson => {
//           const timeFrame = resJson.timeFrame;
//           this.setState({ timeFrame, summaryStatistics: [this.props.summaryStatistics] });
//         });
//     }
//   }

//   // else if(funct === 'statistics') {
//   //   const functNameArr = Object.Keys(funct)
//   //   return (
//   //     <div className="exp-form-cont exp-form col">
//   //       <div className="col">
//   //         <h2 className="oswald-norm">Choose Which Statistics You Would Like to See:</h2>
//   //                 functNameArr.map(name => {
//   //                   if (this.state.timeFrame === '')
//   //                 })
//   //       </div>
//   //     </div>
//   //   );
//   // }
//   render() {
//     return (this.props.route.path !== 'summary' && this.props.route.params.get('funct') !== 'statistics')
//       ? <></>
//       : (

//     <div className="exp-form-cont exp-form col">
//       <div className="col">
//         <h2 className="oswald-norm">Choose Which Statistics You Would Like to See:</h2>

//       </div>
//     </div>);
//   }
// }
