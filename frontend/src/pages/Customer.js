import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";


function Customer(){
    const [customers, setCustomers] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('https://ms-customer-management.onrender.com/customer_table');
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error("Unable to fetch",error);
            }
        };
        fetchData();
    }, []);
    return(
        <>
      
      <div className="container mt-5" style={{ marginBottom : '30%'}}>
        <table>
          <thead>
            <tr className=" text-center">
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
    );
}
export default Customer;
