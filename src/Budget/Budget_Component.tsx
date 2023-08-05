import React, {
    FormEventHandler,
    useEffect,
    useState,
} from "react";
import Expense from "../Expense/Expense";
import { ExpenseProps } from "../Interface"


const Budget_Component= () => {
    const [budget, setBudget] = useState<number>(() => {
        const storedBudget = localStorage.getItem("budget");
        return storedBudget ? JSON.parse(storedBudget) : 0;
    });

    const [expenses, setExpenses] = useState<ExpenseProps[]>([])

    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const remaining: number = budget - totalExpenses;
    const spent: number = budget - remaining;


    const handleSubmit: FormEventHandler<HTMLFormElement> = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
    };

    useEffect(() => {
        localStorage.setItem("budget", JSON.stringify(budget));
    }, [budget, expenses]);

    return (
        <div>
            <div className="md:flex-row flex flex-col gap-5 p-6 text-indigo-200">
                <div>
                    <form onSubmit={handleSubmit}>
                        Budget: £
                        <input
                            type="number"
                            value={budget || ""}
                            onChange={(e) => setBudget(Number(e.target.value))}
                        className=' text-indigo-200 indent-2 ml-3 bg-transparent rounded-md border-2 border-blue-500'
                        />
                    </form>
                </div>
                <div className="remaining">Remaining: £
                    <input
                    type="number"
                    value={remaining || ""}
                    disabled
                    className='mr-6 md:mr-0 text-indigo-200 indent-2 ml-3 bg-transparent rounded-md border-2 border-blue-500'
                /></div>
                <div className="spent">Spent so far :<input
                    type="number"
                    value={spent || ""}
                    disabled
                    className='mr-6 md:mr-6 text-indigo-200 indent-2 ml-3 bg-transparent rounded-md border-2 border-blue-500'
                /></div>
            </div>
            <Expense expense={expenses} setExpense={setExpenses} />
        </div>
    );
};

export default Budget_Component;
