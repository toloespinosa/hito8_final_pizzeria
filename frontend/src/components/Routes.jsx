import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';


export const PrivateRoute = ({ children }) => {
  const { token } = useUser();
  return token ? children : <Navigate to="/login" />;
};


export const PublicRoute = ({ children }) => {
  const { token } = useUser();
  return !token ? children : <Navigate to="/" />;
};
