import React from 'react';

export default class Table extends React.Component {

  convertTime(createdAt) {
    const time = new Date(createdAt);
    const yr = time.getYear();
    return `${time.getMonth()}-${time.getDate()}-${yr - 100}`;
  }

  render() {
    let counter = 1;
    const arr = this.props.tableInfo.table;
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
                  <i className={`table-txt fas fa-ellipsis-v ${arr.className.icon}`}></i>
              </div>);
              } else {
                counter++;
                return (
          <div key={exp.expenseId.toString()} className='table-item row'>
                      <p className={`table-txt ${arr.className.text}`}>{this.convertTime(exp.date)}</p>
                      <p className={`table-txt ${arr.className.text}`}>{exp.amount}</p>
                      <p className={`table-txt ${arr.className.text}`}>{exp.comment}</p>
                      <i className={`table-txt fas fa-ellipsis-v ${arr.className.icon}`}></i>
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
