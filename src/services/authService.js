// src/services/authService.js

import axios from "axios";

const API_URL = "http://localhost:5000/auth";

// Function to handle login
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// Function to handle registration (for future implementation)
export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};

// Function to get the token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Set up Axios headers for authenticated routes
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
