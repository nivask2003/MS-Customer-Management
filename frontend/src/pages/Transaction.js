import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";

function Transaction() {
    const [transaction,  setTransaction] = useState('');
    useEffect(() => {
        const fetchData = async() =>{
            try {
                const response = await fetch('https://ms-customer-management.onrender.com/transaction_table');
                const data = await response.json();
                setTransaction(data)
            } catch (error) {
                console.error("Unable to fetch transaction",error);
            }
        };
        fetchData();
    }, [])
    return(
        <>
        <main className='container mt-5' style={{marginBottom : '30%'}}>
            <table>
                <thead>
                    <tr className='text-center'>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Transaction Type</th>
                        <th>Transaction Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.length > 0 ? (
                        transaction.map((transaction, index) => (
                            <tr key={index} className='text-center'>
                                <td>{index + 1}</td>
                                <td>{transaction.name}</td>
                                <td>{transaction.transaction_type}</td>
                                <td>{transaction.transaction_amount}</td>
                            </tr>
                        ))
                    ) : (
                       <h1> </h1>     
                    )}
                </tbody>
            </table>
        </main>
        
        </>
    );
}
export default Transaction;