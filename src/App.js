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
  // alert
  const [alert, setAlert] = useState({ show: false })


  // ************************ functionality *********************
  
  // handle charge
  const handleCharge = e => {
    // console.log(`charge: ${e.target.value}`);
    setCharge(e.target.value)
  }
  // handle amount
  const handleAmount = e => {
    // console.log(`amount: ${e.target.value}`);
    setAmount(e.target.value)
  }

  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 6000)
  }

  // handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense])
      handleAlert({ type: 'success', text: 'Item added' })
      setCharge("");
      setAmount("");
    }
    else {
      // handle alert called
      handleAlert({ 
        type: 'danger', 
        text: `Charge can't be empty, and the amount has to be a value bigger than zero.`
      })
    }  
  }

  // clear all items
  const clearItems = () => {
    
  }

  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} />}
    <Alert />
    <h1>Budget calculator</h1>
    <main className="App">
    <ExpenseForm 
    charge={charge} 
    amount={amount} 
    handleAmount={handleAmount} 
    handleCharge={handleCharge} 
    handleSubmit={handleSubmit}/>
    <ExpenseList expenses={expenses} />
    </main>
    <h1>
      Total spending: <span className="total">
        {/* 0 is the initial value. Acc is the total and curr is the current item in our iteration*/}
        {/* this lot of code basically adds all of the amounts from the array  */}
        $ 
        {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}
      </span>
    </h1>
    </>
  );
}

export default App;
