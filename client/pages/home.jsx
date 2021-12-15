import React from 'react';
import ExpenseForm from '../components/exp-form';

export default function Home(props) {
  return (
    <>
      <ExpenseForm
      userId={props.userId}
      route={props.route} />
    </>
  );
}
