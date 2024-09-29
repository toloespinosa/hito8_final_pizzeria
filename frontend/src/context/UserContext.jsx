import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // Método para realizar el login
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
    
      if (data.token) {
        setToken(data.token); 
        setEmail(data.email); 
        localStorage.setItem('token', data.token); 
      } else {
        console.error('Login fallido: no se recibió un token.');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
    }
  };

  // Método para realizar el registro
  const register = async (email, password) => {
    const response = await fetch('http://localhost:5001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      setToken(data.token); 
      setEmail(data.email); 
    }
  };

  // Método para cerrar sesión
  const logout = () => {
    setToken(null);
    setEmail(null); 
  };

  // Método para obtener el perfil del usuario autenticado
  const getProfile = async () => {
    const response = await fetch('http://localhost:5001/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};
