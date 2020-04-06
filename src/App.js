import React, { useState, useEffect } from 'react';
import './css/styles.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert';
import uuid from 'uuid/v4';


// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "car payment", amount: 400 },
//   { id: uuid(), charge: "credit card bill", amount: 1200 }
// ]
const initialExpenses = localStorage.getItem('expenses')?  JSON.parse(localStorage.getItem("expenses")): 
[];
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
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);

  // ************************ useEffect *********************
  useEffect(() => {
    console.log("we called useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);



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
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id? { ...item, charge, amount } 
          : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'Item edited' })
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense])
        handleAlert({ type: 'success', text: 'Item added' })
      }    
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
    console.log("cleared all items");
    setExpenses([]);
  };

  // handle delete
  const handleDelete = (id) => {
    console.log(`item deleted: ${id}`);
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses)
    handleAlert({ type: 'danger', text: 'Item deleted' })
  };

    // handle edit
    const handleEdit = (id) => {
      let expense = expenses.find(item => item.id === id)
      let { charge, amount } = expense;
      setCharge(charge);
      setAmount(amount);
      setEdit(true);
      setId(id)
  };

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
    handleSubmit={handleSubmit}
    edit={edit}
    />
    <ExpenseList 
    expenses={expenses}
    handleDelete={handleDelete} 
    handleEdit={handleEdit}
    clearItems={clearItems}
    />
    </main>


    {/* this is the total if i didn't have it on a card */}
    {/* <h1>
      Total spending: <span className="total"> */}
         {/* 0 is the initial value. Acc is the total and curr is the current item in our iteration
         this lot of code basically adds all of the amounts from the array  */}
        {/* $ 
        {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}
      </span>
    </h1> */}

<div class="card">
  <div class="card__side card__side--front">
    <div class="card__details">
      <h2>Hover for total spending: </h2>
    </div>
  </div>
  <div class="card__side card__side--back card__side--back-1">
    <div class="card__cta">
      <div class="card__price-box">
        <h2 class="card__price-value">
          £ 
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </h2>
      </div>
    </div>
  </div>
</div>
                    
    </>
  );
}

export default App;
