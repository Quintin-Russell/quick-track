import React from 'react';
import Table from '../components/table';
import ExpenseForm from '../components/exp-form';

export default class PastExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastExpenses: []
    };
  }

  componentDidMount() {
    fetch(`/api/expenses/${this.props.userId.toString()}`)
      .then(result => result.json())
      .then(resJson => this.setState({ pastExpenses: resJson }));
  }

  render() {
    return (
      <>
      <ReadFunct
        route={this.props.route}
        userId={this.props.userId}
        hash={this.props.hash.hash} />
        <Table
        tableInfo={this.props.tableInfo}
        arr={this.state.pastExpenses} />

      </>
    );
  }
}

function ReadFunct(props) {
  const funct = props.route.params.get('funct');
  if (funct === 'create') {
    return (
      <>

        <div className="overlay">
          <a href={props.hash} className="x-button">
            <i className="far fa-times-circle"></i>
          </a>
        <ExpenseForm
          className= "z-index-1"
          userId={props.userId}
          route={props.route} />
      </div>
      </>

    );
  } else {
    return <>
    </>;
  }
  // else if (funct === 'edit') {

  // } else if (funct === 'delete') {

  // }
}
