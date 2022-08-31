import React from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import { useRef } from 'react';
import { uncategorizedId, useBudgets } from '../contexts/BudgetContext';
import { currencyFormat } from '../utils';

const ViewExpensesModal = ({budgetId, handleClose}) => {

  const {getBudgetExpense, budgets, deleteBudget, deleteExpense} = useBudgets();
  const budget = uncategorizedId === budgetId ? 
    {name: 'Uncategorized', id: uncategorizedId}
    :
    budgets.find((budgetItem) => budgetItem.id === budgetId);

  const expenses = getBudgetExpense(budgetId);
  console.log(budget);
  return (
    <Modal show={budgetId != null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction='horizontal' gap = '2'>
              <div>
                Expenses - {budget?.name}
              </div>
              {budgetId !== uncategorizedId && (
              <Button 
                variant='outline-danger' 
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
              }}
              >
                Delete
              </Button>)}
            </Stack>
          </Modal.Title>  
        </Modal.Header>
        <Modal.Body>
         <Stack direction='vertical' gap = '3'>
           {expenses.map(expenseItem => {
            return (<Stack direction='horizontal' gap='2' key={expenseItem.id}>
              <div className='me-auto fs-4'>
                {expenseItem.description}
              </div>
              <div className='fs-5'>
                {currencyFormat.format(expenseItem.amount)}
              </div>
              <Button 
                onClick={() => deleteExpense(expenseItem.id)} 
                size='sm' 
                variant='outline-danger'>
                &times;
              </Button>
            </Stack>)
           })}
         </Stack>
        </Modal.Body>
    </Modal>
  );
}

export default ViewExpensesModal;
