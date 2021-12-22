import React from 'react';
import ExpenseForm from './exp-form';

export default class Modal extends React.Component {

  sendDeleteReq(e) {
    const delBodyParameter = this.props.page.fetchReqs.delete.bodyParameter;
    const delBodyValue = this.props.editOrDeleteObj[delBodyParameter];
    const body = {
      [delBodyParameter]: `${delBodyValue}`
    };
    const reqOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch(`${this.props.page.fetchReqs.delete.url}`, reqOptions)
      .then(result => {
        if (result.ok) {
          window.alert(`${this.props.page.fetchReqs.delete.successMessage}`);
        } else {
          window.alert('Whoops! Something went wrong. Please try again.');
        }
      });
  }

  readFunct() {
    if (!this.props.route.params.get('funct')) {
      return <></>;
    } else {
      const funct = this.props.route.params.get('funct');
      if (funct === 'create') {
        return (
      <>
        <div className="overlay">
          <a href={this.props.page.hash} className="x-button">
            <i className="far fa-times-circle"></i>
          </a>
          <ExpenseForm
            page={this.props.page}
            userId={this.props.userId}
            route={this.props.route} />
        </div>
      </>

        );
      } else if (this.props.route.params.get('funct') === 'edit') {
        return <ExpenseForm
                  route={this.props.route}
                  page={this.props.page}
                  userId={this.props.userId}
                  editObj={this.props.editOrDeleteObj} />;

      } else if (this.props.route.params.get('funct') === 'delete') {
        return (
        <div className="exp-form-cont exp-form col">

          <h2 className='menu-txt'>Are You Sure?</h2>
            <div className="table-header modal-cont">
            {
              this.props.page.table.tableHeaders.map(item => {
                if (this.props.page.table.tableHeaders.findIndex(index => index === item) < this.props.page.table.tableHeaders.length - 1) {
                  return <h2 key={item} className={`menu-txt ${this.props.page.table.className.text}`}>{item}</h2>;
                } else {
                  return (
                    <div className={`row ${this.props.page.table.className.divCont}`} key={item}>
                      <h2 className={`menu-txt ${this.props.page.table.className.text}`}>{item}</h2>
                      <i className={`${this.props.page.table.className.icon} fas fa-ellipsis-v disp-none`}></i>
                    </div>);
                }
              })
            }
          </div>
          <div className='table-item shaded row'>
              <p className={`table-txt ${this.props.page.table.className.text}`}>{this.props.convertTime(this.props.editOrDeleteObj.date)}</p>
              <p className={`table-txt ${this.props.page.table.className.text}`}>{`$${this.props.editOrDeleteObj.amount}`}</p>
              <p className={`table-txt ${this.props.page.table.className.text}`}>{this.props.editOrDeleteObj.comment}</p>
            <i className={`disp-none table-txt fas fa-ellipsis-v ${this.props.page.table.className.icon}`}></i>
          </div>
          <div className="row button-cont">
            <a href={this.props.page.hash}>
              <button className="sm-button">No</button>
            </a>
            <a href={this.props.page.hash}>
              <button onClick={this.sendDeleteReq.bind(this)} className="sm-button">Delete</button>
            </a>
          </div>
        </div>);
      } else {
        return <></>;
      }
    }
  }

  render() {
    if (!this.props.route.params.get('funct')) {
      return <></>;
    } else {
      return (
      <div className="overlay">
        <a href={this.props.page.hash} className="x-button">
          <i className="far fa-times-circle"></i>
        </a>
        {this.readFunct()}
        </div>
      );
    }
  }
}
