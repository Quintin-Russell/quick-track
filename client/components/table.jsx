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
                    <RenderIcon
                    route={this.props.route}
                    page={this.props.page}
                    exp={exp}
                    userId={this.props.userId}
                    data={exp[id]}
                    setEditOrDeleteObj={this.setEditOrDeleteObj.bind(this)}
                    className={`${table.className.icon}`}
                    editOrDeleteObj={this.state.editOrDeleteObj}
                    convertTime= {this.convertTime} />
              </div>);
              } else {
                counter++;
                return (
                  <div data={exp[id]} key={exp[id].toString()} className='table-item row'>
                    <p className={`table-txt ${table.className.text}`}>{this.convertTime(exp.date)}</p>
                    <p className={`table-txt ${table.className.text}`}>{`$${exp.amount}`}</p>
                    <p className={`table-txt ${table.className.text}`}>{exp.comment}</p>
                    <RenderIcon
                    route={this.props.route}
                    page={this.props.page}
                    exp={exp}
                    userId={this.props.userId}
                    data={exp[id]}
                    setEditOrDeleteObj={this.setEditOrDeleteObj.bind(this)}
                    editOrDeleteObj={this.state.editOrDeleteObj}
                    className={`${table.className.icon}`}
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
