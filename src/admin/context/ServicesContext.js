import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../../utility/api';
import { toast } from 'react-toastify';

// Create context
const ServicesContext = createContext();

// Context Provider component
export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch all services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.get('/services/');
      setServices(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  // Add a new service
  const addService = async (serviceData) => {
    try {
      const response = await api.post('/services/', serviceData);
      setServices([...services, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error adding service:', err);
      throw err;
    }
  };

  // Update an existing service
  const updateService = async (id, serviceData) => {
    try {
      const response = await api.put(`/services/${id}/`, serviceData);
      setServices(services.map(service => 
        service.id === id ? response.data : service
      ));
      return response.data;
    } catch (err) {
      console.error('Error updating service:', err);
      throw err;
    }
  };

  // Delete a service
  const deleteService = async (id) => {
    try {
      await api.delete(`/services/${id}/`);
      setServices(services.filter(service => service.id !== id));
    } catch (err) {
      console.error('Error deleting service:', err);
      throw err;
    }
  };

  // Get a single service by ID
  const getServiceById = (id) => {
    return services.find(service => service.id === id);
  };

  // Provide the context value
  const value = {
    services,
    loading,
    error,
    fetchServices,
    addService,
    updateService,
    deleteService,
    getServiceById
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

// Custom hook to use the services context
export const useServicesState = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServicesState must be used within a ServicesProvider');
  }
  return context;
};

export default ServicesContext; 