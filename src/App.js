import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import CustomerListScreen from './components/CustomerListScreen';
import AddCustomerScreen from './components/AddCustomerScreen';
import EditCustomerScreen from './components/EditCustomerScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/customer-list" element={<CustomerListScreen />} />
        <Route path="/add-customer" element={<AddCustomerScreen />} />
        <Route path="/edit-customer/:uuid" element={<EditCustomerScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
