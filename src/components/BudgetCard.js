import React from 'react';
import {Card, ProgressBar, Stack, Button} from 'react-bootstrap';
import { currencyFormat} from '../utils';

const BudgetCard = ({
  name, 
  amount, 
  maxAmount, 
  gray, 
  onAddExpenseClick,
  onViewExpensesClick, 
  hideButtons}) => {
  
  const classNames = [];
  if(amount > maxAmount){
    classNames.push("bg-danger", "bg-opacity-10");
  }
  else if (gray){
    classNames.push('bg-light');
  }


  return (
    <div>
      <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
          <div className='me-2'>
            {name}
          </div>
          <div className='d-flex align-items-baseline me-1'>
            {currencyFormat.format(amount)} {" "}
            
            { maxAmount ?  <span className='text-muted fs-6 ms-1'> / {" "} 
              {currencyFormat.format(maxAmount)}
            </span> : "" }
           
          </div>
        </Card.Title>
        { maxAmount ?
        <ProgressBar 
          className='rounded-pill'
          min={0}
          max={maxAmount}
          now={amount} 
          variant={getProgressBarColour(amount, maxAmount)} 
          />
          :
          ""}
          <Stack direction="horizontal" gap="2" className='mt-2'>
            { !hideButtons && <><Button variant="outline-primary" className='ms-auto' onClick={onAddExpenseClick}>
              Add Expense
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-secondary">
              View Expenses
            </Button></>
            }
          </Stack>
      </Card.Body>
      </Card>
    </div>
  );
}

const getProgressBarColour = (amount, maxAmount) => {
  const ratio = amount/maxAmount;
  if(ratio < 0.5){
    return 'primary'
  }
  else if (ratio < 0.75){
    return 'warning';
  }
  return 'danger';
}

export default BudgetCard;
