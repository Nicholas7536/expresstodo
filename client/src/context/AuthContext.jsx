import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [ready, setReady] = useState(false); // Track when token is set

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setReady(true);
      console.log('Set axios Authorization header:', axios.defaults.headers.common['Authorization']);
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setReady(false);
      console.log('Removed axios Authorization header');
    }
  }, [token]);

  // Axios interceptor to always attach token
  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Interceptor set header:', config.headers['Authorization']);
      }
      return config;
    });
    return () => axios.interceptors.request.eject(reqInterceptor);
  }, [token]);

  // login now accepts a callback to run after token is set
  const login = (token, user, cb) => {
    setToken(token);
    setUser(user);
    if (cb) {
      // Wait for token to be set before running callback
      const interval = setInterval(() => {
        if (localStorage.getItem('token')) {
          clearInterval(interval);
          cb();
        }
      }, 10);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
};
