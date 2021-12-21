import React from 'react';
import Table from '../components/table';
import ExpenseForm from '../components/exp-form';

export default class PastExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastExpenses: [],
      newExp: false
    };
  }

  componentDidMount() {
    fetch(`/api/expenses/${this.props.userId.toString()}`)
      .then(result => result.json())
      .then(resJson => this.setState({ pastExpenses: resJson }));
    this.setState({ newExp: false });
  }

  render() {
    return (
      <>
      <ReadFunct
        route={this.props.route}
        userId={this.props.userId}
        page={this.props.page} />
        <Table
        route={this.props.route}
        userId={this.props.userId}
        handleClick={this.handleClick}
        page={this.props.page}
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
          <a href={props.page.hash} className="x-button">
            <i className="far fa-times-circle"></i>
          </a>
          <ExpenseForm
            page={props.page}
            userId={props.userId}
            route={props.route} />
        </div>
      </>

    );
  } else {
    return <>
    </>;
  }
}
