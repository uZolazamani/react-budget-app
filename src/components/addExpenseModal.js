import React from 'react';
import { Button, Form, Modal, Toast } from 'react-bootstrap';
import { useRef } from 'react';
import { useBudgets } from '../contexts/BudgetContext';
import { uncategorizedId } from '../contexts/BudgetContext';

const AddExpenseModal = ({show, handleClose, defaultBudgetId}) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const {addExpense, budgets} = useBudgets();
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      budgetId: budgetIdRef.current.value, 
      amount: parseFloat(amountRef.current.value),
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>  
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>
              Description
            </Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className='mb-3' controlId='amount'>
            <Form.Label>
              Amount
            </Form.Label>
            <Form.Control ref={amountRef} type="number" required min={0} step={0.01}/>
          </Form.Group>
          <Form.Group className='mb-3' controlId='budgetId'>
            <Form.Label>
              Budget
            </Form.Label>
            <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
            <option id={uncategorizedId}>Uncategorized</option>
              {budgets.map((budgetItem) => {
                return (<option key={budgetItem.id} value={budgetItem.id}>
                  {budgetItem.name}
                </option>)
              })}
            </Form.Select>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='primary' type='submit'>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}


export default AddExpenseModal;
