import { IExpense } from "../Interface";
import { ExpenseEnum } from "../enums";
import {expenseReducer} from "../useReducer";
import React, { useEffect, useReducer, useState } from "react";
import Expense_Table from "./Expense_Table";

const Expense = ({ expense, setExpense }: IExpense) => {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [error, setError] = useState<string>("")
    const [expenses, dispatch] = useReducer(expenseReducer, expense, () => {
        const savedExpense = localStorage.getItem("expenses");
        return savedExpense ? JSON.parse(savedExpense) : [];
    });

    const addExpense = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if(!name || amount === 0) {
            setError("Please enter a name and/or amount for your expense")
            return;
        }
        dispatch({
            type: ExpenseEnum.ADD_EXPENSE,
            payload: {
                name: name,
                amount: amount,
                id: Math.round(Math.random() * 1000),
            },
        });
        setName("");
        setAmount(0);
        localStorage.setItem("expenses", JSON.stringify(expenses));
    };


    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
        setExpense(expenses);
    }, [expenses, setExpense]);

    return (
        <div className='md:grid md:grid-cols-2 text-indigo-200 flex flex-col'>
        <div className="">
            <div className="text-4xl pb-4  ">
                <h1>Expenses</h1>
            </div>
            <div className="flex flex-col ">
                <p className='text-orange-500 mb-2'>{error}</p>
                <form onSubmit={addExpense}>
                    <h2 className='text-indigo-200 pb-5 text-2xl'>Add Expense:</h2>
                    <div className="flex flex-col gap-3">
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                           className="indent-2 ml-3 rounded-md bg-transparent border-2 border-blue-500"
                            />
                        </label>
                        <label className='mr-2'>
                            Amount:
                            <input
                                type="number"
                                value={amount || ""}
                                name="expenseAmount"
                                onChange={(e) => setAmount(Number(e.target.value))}
                           className="indent-2 ml-2 rounded-md bg-transparent border-2 border-blue-500"
                            />
                        </label>
                    </div>
                    <button type="submit" className="mt-4 p-1 bg-blue-500 rounded-md">
                        Add Expense
                    </button>
                </form>
            </div>
            </div>
            <div className="expenses_table">
                <Expense_Table expenses={expenses} dispatch={dispatch}/>
            </div>
        </div>
    );
};

export default Expense;
