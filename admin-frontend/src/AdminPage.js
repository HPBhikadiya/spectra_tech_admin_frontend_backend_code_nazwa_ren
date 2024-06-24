import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import './AdminPage.css'; // Import your CSS file for styling

const AdminPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:9090/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants', error);
    }
  };

  const deleteRestaurant = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/restaurants/${id}`);
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant', error);
    }
  };
  const toggleAccess = async (id, haveAccess) => {
    try {
      await axios.put(`http://localhost:9090/restaurants/${id}/access`, { have_access: !haveAccess });
      fetchRestaurants();
    } catch (error) {
      console.error('Error toggling access', error);
    }
  };
  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(null);
  };

  return (
    <div className="admin-page">
      <h1>Restaurant Page</h1>
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
          {restaurants.map((restaurant) => (
            <tr key={restaurant._id}>
              <td>{restaurant.name}</td>
              <td>{restaurant.email}</td>
              <td>
                <button onClick={() => openModal(restaurant)}>View Details</button>
                <button onClick={() => deleteRestaurant(restaurant._id)}>Delete</button>
              </td>
              <td>
                <p className={restaurant.have_access ? 'access-yes' : 'access-no'}>
                  {restaurant.have_access ? 'Yes' : 'No'}
                </p>
                <button onClick={() => toggleAccess(restaurant._id, restaurant.have_access)}>
                  {restaurant.have_access ? 'Revoke Access' : 'Grant Access'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRestaurant && (
        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          data={selectedRestaurant}
        />
      )}
    </div>
  );
};

export default AdminPage;
