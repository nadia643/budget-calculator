import React, { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert';
import uuid from 'uuid/v4';

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
]


function App() {
  // ************************ state values *********************
  // all expenses, add expense 
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState('')
  // single amount
  const [amount, setAmount] = useState('')
  // ************************ functionality *********************

  return (
    <>
    <Alert />
    <h1>Budget calculator</h1>
    <main className="App">
    <ExpenseForm />
    <ExpenseList expenses={expenses} />
    </main>
    <h1>
      Total spending: <span className="total">
        {/* 0 is the initial value. Acc is the total and curr is the current item in our iteration*/}
        {/* this lot of code basically adds all of the amounts from the array  */}
        $ 
        {expenses.reduce((acc, curr) => {
          return (acc += curr.amount);
        }, 0)}
      </span>
    </h1>
    </>
  );
}

export default App;
