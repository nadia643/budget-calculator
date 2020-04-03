import React from 'react';
import Item from './ExpenseItem';

const ExpenseList = ({expenses}) => {
    return (
        <>
            <ul className="list">
                {expenses.map((expense) => {
                    return <Item key={expense.id} expense={expense} />
                })}
            </ul>
            <Item />
        </>
    )
}

export default ExpenseList;