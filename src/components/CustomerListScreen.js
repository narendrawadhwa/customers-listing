import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoIosTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

const CustomerListScreen = () => {
  const [customers, setCustomers] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchCustomerList(storedToken);
    }
  }, []);

  const fetchCustomerList = async (token) => {
    try {
        const response = await fetch('/assignment.jsp?cmd=get_customer_list', {
            method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get customer list');
      }

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customer list:', error);
    }
  };
  const handleDeleteCustomer = async (uuid) => {
    try {
      const response = await fetch('/assignment.jsp?cmd=delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uuid }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete the customer');
      }

      fetchCustomerList(token);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditCustomer = (uuid) => {
    navigate(`/edit-customer/${uuid}`);
  };

  const handleAddCustomer = () => {
    navigate('/add-customer');
  };

  return (
    <div style={{margin:'40px 80px'}}>
      <h1>Customer List Screen</h1>
      <Button variant="contained" style={{margin:'20px 0px'}} onClick={handleAddCustomer}>
        Add a New Customer
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.email}>
                <TableCell>{customer.first_name}</TableCell>
                <TableCell>{customer.last_name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell>{customer.state}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteCustomer(customer.uuid)}>
                  <IoIosTrash style={{marginRight:'10px'}} />
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => handleEditCustomer(customer.uuid)}>
                  <FaEdit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   
    </div>
  );
};

export default CustomerListScreen;
