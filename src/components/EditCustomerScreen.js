import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';


const EditCustomerScreen = () => {
  const { uuid } = useParams();
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

  const navigate = useNavigate();
  const [token, setToken] = useState('');


  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`/assignment.jsp?cmd=get_customer&uuid=${uuid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to get customer details');
        }

        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [uuid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('/assignment.jsp?cmd=update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          uuid: uuid,
          ...customerData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update customer details');
      }

      // Navigate back to the customer list screen after successful update
      navigate('/customer-list');
    } catch (error) {
      console.error('Error updating customer details:', error);
    }
  };

  return (
    <div style={{margin:'70px'}}>
      <h1>Edit Customer</h1>
      <Grid container spacing={2}>
      <Grid item xs={6}>
      <TextField label="First Name" name="first_name" value={customerData.first_name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
      <TextField label="Last Name" name="last_name"  value={customerData.first_name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
      <TextField label="Street" name="street" value={customerData.first_name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
      <TextField label="Address" name="address"  value={customerData.first_name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
      <TextField label="City" name="city" value={customerData.first_name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
      <TextField label="State" name="state" value={customerData.first_name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
      <TextField label="Email" name="email" value={customerData.first_name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
      <TextField label="Phone No." name="phone" value={customerData.first_name} onChange={handleInputChange} fullWidth />
      </Grid>
      </Grid>

      <Button variant="contained" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </div>
  );
};

export default EditCustomerScreen;
