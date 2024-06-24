import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import './CustomerPage.css'; // Import your CSS file for styling

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:9090/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers', error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer', error);
    }
  };
  const toggleAccess = async (id, haveAccess) => {
    try {
      await axios.put(`http://localhost:9090/customers/${id}/access`, { have_access: !haveAccess });
      fetchCustomers();
    } catch (error) {
      console.error('Error toggling access', error);
    }
  };
  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="customer-page">
      <h1>Customer Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
            <th>Access</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.first_name} {customer.last_name}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => openModal(customer)}>View Details</button>
                <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
              </td>
              <td>
                <p className={customer.have_access ? 'access-yes' : 'access-no'}>
                  {customer.have_access ? 'Yes' : 'No'}
                </p>
                <button onClick={() => toggleAccess(customer._id, customer.have_access)}>
                  {customer.have_access ? 'Revoke Access' : 'Grant Access'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCustomer && (
        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          data={selectedCustomer}
        />
      )}
    </div>
  );
};

export default CustomerPage;
