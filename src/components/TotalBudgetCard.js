import React from 'react';
import BudgetCard from './BudgetCard';
import { useBudgets } from '../contexts/BudgetContext';


const UncategorizedBudgetCard = (props) => {

  const { budgets, expenses} = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.maxAmount, 0);
  if (max === 0 ) {
    return null;
  }
  return (
    <BudgetCard amount = {amount} gray name="Total" maxAmount={max} hideButtons={true} />
  );
}

export default UncategorizedBudgetCard;
