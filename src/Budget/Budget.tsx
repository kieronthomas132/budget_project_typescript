import React, {
    FormEventHandler,
    useEffect,
    useState,
} from "react";
import Expense from "../Expense/Expense";
import { ExpenseProps } from "../Interface"
import Budget_Component from "./Budget_Component";


const Budget = () => {
    return (
        <>
            <Budget_Component/>
        </>
    );
};

export default Budget;
