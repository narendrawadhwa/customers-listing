import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddCustomerScreen = () => {
  const [customerData, setCustomerData] = useState({
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  });
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('/assignment.jsp?cmd=create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error('Failed to add a new customer');
      }

      navigate('/customer-list');
    } catch (error) {
      console.error('Error adding a new customer:', error);
    }
  };

  return (
    <div style={{margin:'70px'}}>
      <h1>Add a New Customer</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="First Name" name="first_name" value={customerData.first_name} onChange={handleInputChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Last Name" name="last_name" value={customerData.last_name} onChange={handleInputChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Street" name="street" value={customerData.street} onChange={handleInputChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Address" name="address" value={customerData.address} onChange={handleInputChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
        <TextField label="City" name="city" value={customerData.city} onChange={handleInputChange} fullWidth />
                </Grid>
        <Grid item xs={6}>
        <TextField label="State" name="state" value={customerData.state} onChange={handleInputChange} fullWidth/>
                </Grid>
        <Grid item xs={6}>
        <TextField label="Email" name="email" value={customerData.email} onChange={handleInputChange} fullWidth/>
                </Grid>
        <Grid item xs={6}>
        <TextField label="Phone No." name="phone" value={customerData.phone} onChange={handleInputChange} fullWidth/>
                </Grid>

      </Grid>

      <Button variant="contained" style={{margin:'20px 0px'}} onClick={handleAddCustomer}>
        Add Customer
      </Button>
    </div>
  );
};

export default AddCustomerScreen;
