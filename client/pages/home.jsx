import React from 'react';
import ExpenseForm from '../components/exp-form';

export default function Home(props) {
  return (
    <>
      <ExpenseForm route={props.route} />
    </>
  );
}
