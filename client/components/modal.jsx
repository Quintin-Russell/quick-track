import React from 'react';

import ExpenseForm from './exp-form';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEntry: ''
    };
  }

  sendFetchReq(e) {
    const bodyParameter = this.props.page.id;
    const funct = this.props.route.params.get('funct');
    const body =
    (funct === 'delete')
      ? {
          [bodyParameter]: `${this.props.editOrDeleteObj[bodyParameter]}`
        }
      : (funct === 'edit')
          ? {
              [bodyParameter]: `${this.props.editOrDeleteObj[bodyParameter]}`,
              name: `${this.state.newEntry}`
            }
          : {
              userId: `${this.props.userId}`,
              name: `${this.state.newEntry}`
            };
    const reqOptions = {
      method: `${this.props.page.fetchReqs[funct].type}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch(`${this.props.page.fetchReqs[funct].url}`, reqOptions)
      .then(result => {
        if (result.ok) {
          this.props.resetEditOrDeleteObj();
          window.alert(`${this.props.page.fetchReqs[funct].successMessage}`);
        } else {
          window.alert('Whoops! Something went wrong. Please try again.');
        }
      });
  }

  handleNewEntryChange(e) {
    const newEntry = e.target.value;
    this.setState({ newEntry });
  }

  readFunct() {
    if (!this.props.route.params.get('funct')) {
      return <></>;
    } else {
      const funct = this.props.route.params.get('funct');
      if (funct === 'create') {
        return (this.props.route.path === 'pastexpenses')
          ? <ExpenseForm
            page={this.props.page}
            userId={this.props.userId}
            route={this.props.route}
            resetEditOrDeleteObj={this.props.resetEditOrDeleteObj} />
          : (
            <div className= "just-align-center exp-form-cont exp-form col" >
              <h2 className='menu-txt'>{
              (this.props.route.path === 'accsettings-managepaymentmethods')
                ? 'New Payment Method'
                : 'New Spending Category'
              }</h2>
              <label className='budget-width just-cent' htmlFor="new-payment-method">
                <input
                id="new-payment-method"
                name="new-payment-method"
                onChange={this.handleNewEntryChange.bind(this)}
                placeholder={(this.props.route.path === 'accsettings-managepaymentmethods') ? 'Enter the new payment method here' : 'Enter the new category here'}
                className='form-input'></input>
              </label>
              <div className="row budget-width button-cont">
                <a href={this.props.page.hash}>
                  <button className="sm-button">Go Back</button>
                </a>
                <a href={this.props.page.hash}>
                  <button onClick={this.sendFetchReq.bind(this)} className="sm-button">Submit</button>
                </a>
              </div>

        </div>
            );
      } else if (funct === 'edit') {
        return (this.props.route.path === 'pastexpenses')
          ? <ExpenseForm
            route={this.props.route}
            page={this.props.page}
            userId={this.props.userId}
            editObj={this.props.editOrDeleteObj}
            resetEditOrDeleteObj={this.props.resetEditOrDeleteObj} />
          : (
            <div className="just-align-center exp-form-cont exp-form col" >
              <h2 className='menu-txt'>{
                (this.props.route.path === 'accsettings-managepaymentmethods')
                  ? 'Edit Payment Method'
                  : 'Edit Spending Category'
              }</h2>
              <label className='budget-width just-cent' htmlFor="edit-payment-method">
                <input
                  id="edit-payment-method"
                  name="edit-payment-method"
                  defaultValue={(!this.props.editOrDeleteObj)
                    ? this.state.newEntry
                    : this.props.editOrDeleteObj.name}
                  onChange={this.handleNewEntryChange.bind(this)}
                  placeholder={(this.props.route.path === 'accsettings-managepaymentmethods') ? 'Enter the a payment method here' : 'Enter the a category here'}
                  className='form-input'></input>
              </label>
              <div className="row budget-width button-cont">
                <a onClick={this.props.resetEditOrDeleteObj} href={this.props.page.hash}>
                  <button className="sm-button">Go Back</button>
                </a>
                <a href={this.props.page.hash}>
                  <button onClick={this.sendFetchReq.bind(this)} className="sm-button">Submit</button>
                </a>
              </div>

            </div>
            );
      } else if (funct === 'delete') {
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
                      <h2 className={(this.props.route.path === 'pastexpenses') ? `menu-txt ${this.props.page.table.className.text}` : `${this.props.page.table.className.text} menu-txt just-cent`}>{item}</h2>
                      <i className={`${this.props.page.table.className.icon} fas fa-ellipsis-v disp-none`}></i>
                    </div>);
                }
              })
            }
          </div>
          {
            (this.props.route.path === 'pastexpenses')
              ? (
              <div className='table-item shaded row'>
            {
            (this.props.editOrDeleteObj)
              ? (
               <>
                <p className={`table-txt ${this.props.page.table.className.text}`}>{this.props.convertTime(this.props.editOrDeleteObj.date)}</p>
                <p className={`table-txt ${this.props.page.table.className.text}`}>{`$${this.props.editOrDeleteObj.amount}`}</p>
                <p className={`table-txt ${this.props.page.table.className.text}`}>{this.props.editOrDeleteObj.comment}</p>
                <i className={`disp-none table-txt fas fa-ellipsis-v ${this.props.page.table.className.icon}`}></i>
               </>
                )
              : <></>
                }
 </div>
                )
              : (
              <div className='table-item shaded row'>
                <p className={`table-txt ${this.props.page.table.className.text}`}>
                  {
                  (!this.props.editOrDeleteObj)
                    ? ''
                    : this.props.editOrDeleteObj.name
                    }
                  </p>
              </div>
                )
          }

          <div className="row button-cont">
            <a onClick={this.props.resetEditOrDeleteObj} href={this.props.page.hash}>
              <button className="sm-button">No</button>
            </a>
            <a href={this.props.page.hash}>
              <button onClick={this.sendFetchReq.bind(this)} className="sm-button">Delete</button>
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
        <div className="overlay z-2 just-align-center">
        <a href={this.props.page.hash} className="x-button">
          <i className="far fa-times-circle"></i>
        </a>
        {this.readFunct()}
        </div>
      );
    }
  }
}
