import React from 'react';
import { uncategorizedId } from '../contexts/BudgetContext';
import BudgetCard from './BudgetCard';
import { useBudgets } from '../contexts/BudgetContext';


const UncategorizedBudgetCard = (props) => {

  const { getBudgetExpense} = useBudgets();
  const amount = getBudgetExpense(uncategorizedId).reduce((total, expense) => total + expense.amount, 0);
  
  if (amount === 0 ) {
    return null;
  }
  return (
    <BudgetCard amount = {amount} gray name="Uncategorized" {...props} />
      
  );
}

export default UncategorizedBudgetCard;
