import React from 'react';
import Item from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

const ExpenseList = ({expenses}) => {
    return (
        <>
            <ul className="list">
                {expenses.map((expense) => {
                    return <Item key={expense.id} expense={expense} />
                })}
            </ul>
            {/* button won't be displayed if don't have anything in our list */}
            {expenses.length > 0 && (
            <button className="btn">
                Clear Expenses
                <MdDelete className="btn-icon" />
            </button>
            )}
        </>
    )
}

export default ExpenseList;