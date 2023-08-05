import React from 'react';
import {ExpenseProps} from "../Interface";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ExpenseEnum} from "../enums";
import {ExpenseAction} from "../useReducer";

interface ExpenseTableProps {
    expenses: ExpenseProps[];
    dispatch: React.Dispatch<ExpenseAction>;
}


function ExpenseTable({expenses, dispatch}: ExpenseTableProps) {

    const deleteExpense = (id:number) => {
        dispatch({type: ExpenseEnum.DELETE_EXPENSE, payload: id})
    }

    return (
        <div className='flex flex-col justify-center items-center h-[100%] mt-4'>
            {expenses.length === 0 ? <div className='text-2xl'>You currently have no expenses!</div> :
                <div>
                    {expenses.map((expense) => (
                        <div key={expense.id}>
                            <ul className='bg-fuchsia-800 p-2 mb-2 md:min-w-[400px] text-slate-300 rounded-lg min-w-[300px] flex justify-evenly'>
                                <li>{expense.name.toUpperCase()}</li>
                                <li>£{expense.amount}</li>
                                <button onClick={() => deleteExpense(expense.id)}><HighlightOffIcon/></button>
                            </ul>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default ExpenseTable;