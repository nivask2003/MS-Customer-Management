import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const [transactionName, setTransactionName] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');

  const [error, setError] = useState('');

  const AddCustomer = async (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      setError('Please fill in all customer fields.');
      return;
    }
    try {
      const response = await axios.post('https://ms-customer-management.onrender.com/customer_details', {
        name: customerName,
        email: customerEmail,
        phone: customerPhone
      });
      console.log('Customer Added', response.data);
      setError('');
    } catch (error) {
      console.error('Error adding customer', error);
      setError('Error adding customer.');
    }
  };

  const AddTransaction = async (e) => {
    e.preventDefault();
    if (!transactionName || !transactionType || !transactionAmount) {
      setError('Please fill in all transaction fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/transaction_details', {
        name: transactionName,
        transaction_type: transactionType,
        transaction_amount: transactionAmount
      });
      console.log('Transaction Added', response.data);
      setError('');
    } catch (error) {
      console.error('Error adding transaction', error);
      setError('Error adding transaction.');
    }
  };

  return (
    <>
      <main className='container mt-5'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <div className='card'>
          <div className='card-header'>
            <small>Add Customer</small> 
          </div>
          <div className='container-fluid'>
            <form onSubmit={AddCustomer}>
              <div className='form-group mt-3'>
                <label htmlFor='customerName'>Name</label>
                <input
                  type='text'
                  id='customerName'
                  placeholder='Name'
                  className='form-control'
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  aria-label='Customer Name'
                />
              </div>
              <div className='form-group mt-3'>
                <label htmlFor='customerEmail'>Email</label>
                <input
                  type='email'
                  id='customerEmail'
                  placeholder='Email'
                  className='form-control'
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  aria-label='Customer Email'
                />
              </div>
              <div className='form-group mt-3'>
                <label htmlFor='customerPhone'>Phone</label>
                <input
                  type='tel'
                  id='customerPhone'
                  placeholder='Phone'
                  className='form-control'
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  aria-label='Customer Phone'
                />
              </div>
              <div className='form-group mt-3'>
                <input
                  type='submit'
                  value='Add Customer'
                  className='btn text-white'
                  
                />
              </div>
            </form>
          </div>
        </div>
        <div className='card mt-5'>
          <div className='card-header'>
            <small>Add Transaction</small>
            
          </div>
          <div className='container-fluid'>
            <form onSubmit={AddTransaction}>
              <div className='form-group mt-3'>
                <label htmlFor='transactionName'>Name</label>
                <input
                  type='text'
                  id='transactionName'
                  placeholder='Name'
                  className='form-control'
                  value={transactionName}
                  onChange={(e) => setTransactionName(e.target.value)}
                  aria-label='Transaction Name'
                />
              </div>
              <div className='form-group mt-3'>
                <label htmlFor='transactionType'>Transaction Type</label>
                <select
                  className='form-control'
                  id='transactionType'
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  aria-label='Transaction Type'
                >
                  <option value='Debit Sale'>Debit Sale</option>
                  <option value='Credit Sale'>Credit Sale</option>
                  <option value='Debit Purchase'>Debit Purchase</option>
                  <option value='Credit Purchase'>Credit Purchase</option>
                </select>
              </div>
              <div className='form-group mt-3'>
                <label htmlFor='transactionAmount'>Amount</label>
                <input
                  type='number'
                  id='transactionAmount'
                  placeholder='Amount'
                  className='form-control'
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  aria-label='Transaction Amount'
                />
              </div>
              <div className='form-group mt-3'>
                <input
                  type='submit'
                  value='Add Transaction'
                  className='btn text-white'
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
