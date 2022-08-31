import React, { createContext, useContext} from "react";
import { v4 as uuidV4} from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { Toast, ToastBody } from "react-bootstrap";

const BudgetContext = createContext();
export const uncategorizedId = 'Uncategorized';
export const useBudgets = () => {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({children}) => {
  const [budgets, setBudgets] = useLocalStorage("budgets",[]);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpense = (budgetId) => {
    
    return expenses.filter(expenseItem => expenseItem.budgetId === budgetId);
  }
  const addBudget = ({name, maxAmount}) => {
    setBudgets(prevBudget => { 
      if(prevBudget.find(budget => budget.name === name)){
        return prevBudget;
      }
      return [...prevBudget, {id: uuidV4(), name, maxAmount}]
    });
  }
  const addExpense = ({amount, description, budgetId}) => {
    setExpenses(prevExpense => {
      return [...prevExpense, {id: uuidV4(), description, amount, budgetId}];
    });
  }
  const deleteBudget = ({id}) => {
    setExpenses(prevExpenses => {
      return (prevExpenses.map(expenseItem => {
        if(expenseItem.budgetId !== id) return expenseItem
        return {...expenseItem, budgetId: uncategorizedId}
      }));
    })
    setBudgets(prevBudget => {
      return prevBudget.filter(budget => budget.id !== id);
    });
  
  }
  const deleteExpense = (id) => {
    setExpenses(prevExpense => {
      return prevExpense.filter(expense => expense.id !== id);
    });
  
  
  }

  return <BudgetContext.Provider value ={{
    budgets,
    expenses,
    getBudgetExpense,
    addExpense,
    addBudget,
    deleteBudget,
    deleteExpense,
    }}>
      {children}
  </BudgetContext.Provider>
}
