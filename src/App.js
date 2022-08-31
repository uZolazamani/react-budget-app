import { Container, Stack, Button } from 'react-bootstrap';
import AddBudgetModal from './components/addBudgetModal';
import BudgetCard from './components/BudgetCard';
import { useState } from 'react';
import { uncategorizedId, useBudgets } from './contexts/BudgetContext';
import AddExpenseModal from './components/addExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [viewExpensesModalId, setViewExpensesModalId] = useState();
  const [addExpenseModalId, setAddExpenseModalId] = useState();
  const {budgets, getBudgetExpense} = useBudgets();

  const openExpenseModal = (budgetId) => {
    setShowExpenseModal(true);
    setAddExpenseModalId(budgetId);
  }
  
  return (
    <>
    <Container className='my-4'>
      <Stack direction='horizontal' gap="2" className='mb-4'>
        <h1 className='me-auto'>
          Budget App
        </h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Budget
        </Button>
        <Button variant="outline-primary" onClick={openExpenseModal}>
          Add Expense
        </Button>
      </Stack>
      <div style={{
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "1rem", 
        alignItems: "flex-start"}}>

        {budgets.map((budgetItem) => {
          const amount = getBudgetExpense(budgetItem.id).reduce((total, expense) => total + expense.amount, 0);
          
        return (<BudgetCard 
          key={budgetItem.id}
          name={budgetItem.name}
          amount={amount} 
          maxAmount = {budgetItem.maxAmount}
          onAddExpenseClick = {() => openExpenseModal(budgetItem.id)}
          onViewExpensesClick = {() => setViewExpensesModalId(budgetItem.id)}
          />)
        })}
        <UncategorizedBudgetCard
         onViewExpensesClick = {() => setViewExpensesModalId(uncategorizedId)}
         onAddExpenseClick = {openExpenseModal} />
        <TotalBudgetCard />
      </div>
    </Container>
    <AddBudgetModal show={showModal} handleClose = {() => setShowModal(false)} />
    <AddExpenseModal 
      show={showExpenseModal} 
      defaultBudgetId={addExpenseModalId} 
      handleClose={() => setShowExpenseModal(false)} 
    />
      <ViewExpensesModal 
      budgetId={viewExpensesModalId}
      handleClose={() => setViewExpensesModalId()}
    />
    </>
  );
}

export default App;
