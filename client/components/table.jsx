import React from 'react';


export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      editOrDeleteObj: null
    };
  }

  componentDidMount() {
    fetch(`${this.props.page.fetchReqs.get.url}/${this.props.userId.toString()}`)
      .then(result => result.json())
      .then(resJson => this.setState({ arr: resJson }));
  }

  convertTime(dt) {
    const time = new Date(dt);
    const yr = time.getYear();
    return `${time.getMonth()}-${time.getDate()}-${yr - 100}`;
  }

  setEditOrDeleteObj(e) {
    const id = this.props.page.id;
  handleClick(e) {
    const tar = e.target.getAttribute('data');
    const editOrDeleteObj = this.state.arr.find(obj => obj[id] === parseInt(tar));
    this.props.setEditOrDeleteObj(editOrDeleteObj);
    this.setState({ editOrDeleteObj });
  }

  resetEditOrDeleteObj(e) {
    this.props.resetEditOrDeleteObj();
  }

  renderHeaders() {
    const table = this.props.page.table;
    return (
      table.tableHeaders.map(item => {
        if (table.tableHeaders.findIndex(index => index === item) < table.tableHeaders.length - 1) {
          return <h2 key={item} className={`menu-txt ${table.className.text}`}>{item}</h2>;
        } else {
          return (
          <div className={`row ${table.className.divCont}`} key={item}>
            <h2 className={`menu-txt ${table.className.text}`}>{item}</h2>
            <i className={`${table.className.icon} fas fa-ellipsis-v disp-none`}></i>
          </div>);
        }
      })
    );
  }

  render() {
    const table = this.props.page.table;
    let counter = 1;
    const id = this.props.page.id;
    if (this.state.arr.length === 0) {
      return <h1 className="menu-txt">Loading...</h1>;
    } else {
      return (
        <>
      <div className="table-header">
        { this.renderHeaders() }
        </div>

        <div className="col table-cont">
          {
            this.state.arr.map(exp => {
              if (counter % 2 === 1) {
                counter++;
                return (
                  <div data={exp[id]} key={exp[id].toString()} className='table-item shaded row'>
                  <p className={`table-txt ${table.className.text}`}>{this.convertTime(exp.date)}</p>
                  <p className={`table-txt ${table.className.text}`}>{`$${exp.amount}`}</p>
                  <p className={`table-txt ${table.className.text}`}>{exp.comment}</p>

                  <div key={exp.expenseId.toString()} className='table-item shaded row'>
                  <p className={`table-txt ${arr.className.text}`}>{this.props.convertTime(exp.date)}</p>
                  <p className={`table-txt ${arr.className.text}`}>{`$${exp.amount}`}</p>
                  <p className={`table-txt ${arr.className.text}`}>{exp.comment}</p>
                    <RenderIcon
                    route={this.props.route}
                    page={this.props.page}
                    exp={exp}
                    userId={this.props.userId}
                    data={exp[id]}
                    setEditOrDeleteObj={this.setEditOrDeleteObj.bind(this)}
                    className={`${table.className.icon}`}
                    editOrDeleteObj={this.state.editOrDeleteObj}

                    data={exp.expenseId}
                    showOptions={this.state.showOptions}
                    handleClick={this.handleClick.bind(this)}
                    className={`${arr.className.icon}`}
                    setEditOrDeleteObj={this.props.setEditOrDeleteObj}
                    convertTime= {this.convertTime} />
              </div>);
              } else {
                counter++;
                return (
                  <div data={exp[id]} key={exp[id].toString()} className='table-item row'>
                    <p className={`table-txt ${table.className.text}`}>{this.convertTime(exp.date)}</p>
                    <p className={`table-txt ${table.className.text}`}>{`$${exp.amount}`}</p>
                    <p className={`table-txt ${table.className.text}`}>{exp.comment}</p>

          <div key={exp.expenseId.toString()} className='table-item row'>
                      <p className={`table-txt ${arr.className.text}`}>{this.props.convertTime(exp.date)}</p>
                      <p className={`table-txt ${arr.className.text}`}>{`$${exp.amount}`}</p>
                      <p className={`table-txt ${arr.className.text}`}>{exp.comment}</p>
                    {/* <i data={exp.expenseId} onClick={this.props.handleClick} className={`table-txt fas fa-ellipsis-v ${arr.className.icon}`}></i> */}
                    <RenderIcon
                    route={this.props.route}
                    page={this.props.page}
                    exp={exp}
                    userId={this.props.userId}
                    data={exp[id]}
                    setEditOrDeleteObj={this.setEditOrDeleteObj.bind(this)}
                    editOrDeleteObj={this.state.editOrDeleteObj}
                    className={`${table.className.icon}`}

                    data={exp.expenseId}
                    showOptions={this.state.showOptions}
                    handleClick={this.handleClick.bind(this)}
                    className={`${arr.className.icon}`}
                    convertTime={this.convertTime} />
                    </div>
                );
              }

            }
            )

          }
        </div>
        </>
      );
    }
  }
}

function RenderIcon(props) {
  const id = props.page.id;
  if (!props.editOrDeleteObj || props.editOrDeleteObj[id] !== props.exp[id]) {
    return (
      <i data={props.exp[id]}
      onClick={props.setEditOrDeleteObj}
      className={`table-txt fas fa-ellipsis-v ${props.className}`}></i>
    );
  } else {
    return (
      <>
        <div className={`row menu-icon-cont ${props.className}`}>
          <a href={props.page.deleteQuery} data={props.exp[id]} className="menu-header-cont ">
            <i data={props.exp[id]} className="far fa-trash-alt"></i>
            <p data={props.exp[id]} className="form-label-txt">Delete</p>
          </a>
          <a href={props.page.editQuery} data={props.exp[id]} className="menu-header-cont">
            <i data={props.exp[id]} className="far fa-edit"></i>
            <p data={props.exp[id]} className="form-label-txt">Edit</p>
        </a>
      </div>
      </>
    );
  }
}
      <>
      {/* <EditDeleteModal
      route={props.route}
      page={props.page}
      exp={props.exp}
      userId={props.userId}
      // editOrDelete={props.editOrDelete}
      handleClick={props.handleClick}
      convertTime={props.convertTime} /> */}
        <div className={`row menu-icon-cont ${props.className}`}>
          <a onClick={props.setEditOrDeleteObj} href={props.page.deleteQuery} data={props.exp.expenseId} className="menu-header-cont ">
            <i data={props.exp.expenseId} className="far fa-trash-alt"></i>
            <p data={props.exp.expenseId} className="form-label-txt">Delete</p>
          </a>
          <a onClick={props.setEditOrDeleteObj} href={props.page.editQuery} data={props.exp.expenseId} className="menu-header-cont">
            <i onClick={props.setEditOrDeleteObj} data={props.exp.expenseId} className="far fa-edit"></i>
            <p onClick={props.setEditOrDeleteObj} data={props.exp.expenseId} className="form-label-txt">Edit</p>
        </a>
      </div>
      </>
    );
  } else {
    return (
      <i data={props.exp.expenseId}
      onClick={props.handleClick}
      className={`table-txt fas fa-ellipsis-v ${props.className}`}></i>
    );
  }
}

// class EditDeleteModal extends React.Component {

//   sendDeleteReq(e) {
//     const body = {
//       expenseId: `${this.props.exp.expenseId}`
//     };
//     const reqOptions = {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     };

//     fetch('/api/expenses', reqOptions)
//       .then(result => {
//         if (result.ok) {
//           window.alert('Your expense was deleted!');
//           e.target.reset();
//         } else {
//           window.alert('Whoops! Something went wrong. Please try again.');
//         }
//       });
//   }

//   render() {
//     return (
//     <div className={(this.props.route.params.get('funct')) ? 'overlay' : 'disp-none'}>
//       <a href={this.props.page.hash} className="x-button">
//         <i className="far fa-times-circle"></i>
//       </a>
//           <Modal
//           route={this.props.route}
//           page={this.props.page}
//           userId={this.props.userId}
//           editObj={this.props.exp}
//           sendDeleteReq={this.sendDeleteReq.bind(this)}
//           convertTime={this.props.convertTime} />
//     </div>
//     );
//   }
// }

// function Modal(props) {
//   if (props.route.params.get('funct') === 'edit') {
//     return <ExpenseForm
//       route={props.route}
//       page={props.page}
//       userId={props.userId}
//       editObj={props.editObj} />;

//   } else if (props.route.params.get('funct') === 'delete') {
//     return (
//     <div className="exp-form-cont exp-form col">

//       <h2 className='menu-txt'>Are You Sure?</h2>
//       <div className="table-header menu-icon-cont">
//         {
//           props.page.table.tableHeaders.map(item => {
//             if (props.page.table.tableHeaders.findIndex(index => index === item) < props.page.table.tableHeaders.length - 1) {
//               return <h2 key={item} className={`menu-txt ${props.page.table.className.text}`}>{item}</h2>;
//             } else {
//               return (
//                 <div className={`row ${props.page.table.className.divCont}`} key={item}>
//                   <h2 className={`menu-txt ${props.page.table.className.text}`}>{item}</h2>
//                   <i className={`${props.page.table.className.icon} fas fa-ellipsis-v disp-none`}></i>
//                 </div>);
//             }
//           })
//         }
//       </div>
//       <div className='table-item shaded row'>
//         <p className={`table-txt ${props.page.table.className.text}`}>{props.convertTime(props.editObj.date)}</p>
//         <p className={`table-txt ${props.page.table.className.text}`}>{`$${props.editObj.amount}`}</p>
//         <p className={`table-txt ${props.page.table.className.text}`}>{props.editObj.comment}</p>
//         <i className={`disp-none table-txt fas fa-ellipsis-v ${props.page.table.className.icon}`}></i>
//       </div>
//       <div className="row button-cont">
//         <a href={props.page.hash}>
//             <button className="sm-button">No</button>
//         </a>
//         <a onClick={props.sendDeleteReq} href={props.page.hash}>
//             <button className="sm-button">Delete</button>
//         </a>
//       </div>
//     </div>);
//   } else {
//     return <></>;
//   }
// }
