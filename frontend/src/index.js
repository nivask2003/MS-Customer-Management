import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Customer from './pages/Customer';
import Transaction from './pages/Transaction';
import Header from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './footer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <BrowserRouter>
      <div class="menu text-center mt-4">
        <Link to="/" className='link me-4 p-2'>Home</Link>
        <Link to="/customer" className="link me-4 p-2">Customer</Link>
        <Link to="/transaction" className="link p-2">Transaction</Link>   
      </div>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path="/customer" element={<Customer />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>  
    </BrowserRouter>
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
