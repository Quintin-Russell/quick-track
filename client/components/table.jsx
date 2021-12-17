import React from 'react';
import ExpenseForm from './exp-form';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: null
    };
  }

  convertTime(createdAt) {
    const time = new Date(createdAt);
    const yr = time.getYear();
    return `${time.getMonth()}-${time.getDate()}-${yr - 100}`;
  }

  handleClick(e) {
    const tar = e.target.getAttribute('data');
    this.setState({ showOptions: parseInt(tar) });
  }

  render() {
    let counter = 1;
    const arr = this.props.page.table;
    if (this.props.arr.length === 0) {
      return <h1 className="menu-txt">There is no data to display</h1>;
    } else {
      return (
        <>
      <div className="table-header menu-icon-cont">
        {
          arr.tableHeaders.map(item => {
            if (arr.tableHeaders.findIndex(index => index === item) < arr.tableHeaders.length - 1) {
              return <h2 key={item} className={`menu-txt ${arr.className.text}`}>{item}</h2>;
            } else {
              return (
              <div className={`row ${arr.className.divCont}`} key={item}>
              <h2 className={`menu-txt ${arr.className.text}`}>{item}</h2>
              <i className={`${arr.className.icon} fas fa-ellipsis-v disp-none`}></i>
              </div>);
            }
          })
        }
        </div>

        <div className="col table-cont">
          {
            this.props.arr.map(exp => {
              if (counter % 2 === 1) {
                counter++;
                return (
                  <div key={exp.expenseId.toString()} className='table-item shaded row'>
                  <p className={`table-txt ${arr.className.text}`}>{this.convertTime(exp.date)}</p>
                  <p className={`table-txt ${arr.className.text}`}>{exp.amount}</p>
                  <p className={`table-txt ${arr.className.text}`}>{exp.comment}</p>
                  {/* <i data={exp.expenseId} onClick={this.props.handleClick} className={`table-txt fas fa-ellipsis-v ${arr.className.icon}`}></i> */}
                    <RenderIcon
                    route={this.props.route}
                    page={this.props.page}
                    exp={exp}
                    userId={this.props.userId}
                    data={exp.expenseId}
                    showOptions={this.state.showOptions}
                    onClick={this.handleClick}
                    className={`${arr.className.icon}`}
                    handleClick={this.handleClick.bind(this)} />
              </div>);
              } else {
                counter++;
                return (
          <div key={exp.expenseId.toString()} className='table-item row'>
                      <p className={`table-txt ${arr.className.text}`}>{this.convertTime(exp.date)}</p>
                      <p className={`table-txt ${arr.className.text}`}>{exp.amount}</p>
                      <p className={`table-txt ${arr.className.text}`}>{exp.comment}</p>
                    {/* <i data={exp.expenseId} onClick={this.props.handleClick} className={`table-txt fas fa-ellipsis-v ${arr.className.icon}`}></i> */}
                    <RenderIcon
                    route={this.props.route}
                    page={this.props.page}
                    exp={exp}
                    userId={this.props.userId}
                    data={exp.expenseId}
                    showOptions={this.state.showOptions}
                    onClick={this.handleClick}
                    className={`${arr.className.icon}`}
                    handleClick={this.handleClick.bind(this)} />
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
  if (props.showOptions === props.exp.expenseId) {
    return (
      <>
      <EditDeleteModal
      route={props.route}
      page={props.page}
      exp={props.exp}
      userId={props.userId}
      editOrDelete={props.editOrDelete}
      handleClick={props.handleClick} />
      <div onClick={props.handleClick} className={`row menu-icon-cont ${props.className}`}>
          <a href={props.page.deleteQuery} function='delete' data={props.exp.expenseId} className="menu-header-cont ">
            <i function='delete' data={props.exp.expenseId} className="far fa-trash-alt"></i>
            <p function='delete' data={props.exp.expenseId} className="form-label-txt">Delete</p>
        </a>
          <a href={props.page.editQuery} function='edit' data={props.exp.expenseId} className="menu-header-cont">
            <i function='edit' data={props.exp.expenseId} className="far fa-edit"></i>
            <p function='edit' data={props.exp.expenseId} className="form-label-txt">Edit</p>
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

function EditDeleteModal(props) {
  let modal;
  if (props.route.params.get('funct') === 'edit') {
    modal = (
        <ExpenseForm
        route={props.route}
        page={props.page}
        userId={props.userId}
        editObj={props.exp} />
    );

  } else if (props.route.params.get('funct') === 'delete') {
    modal = (
      <div></div>
    );

  } else {
    return <></>;
  }
  return (
    <div className="overlay">
      <a href={props.page.hash} className="x-button">
        <i className="far fa-times-circle"></i>
      </a>
      {modal}
      </div>
  );
}
