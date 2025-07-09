import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

let authToken = null;

export const sendAuthenticatedRequest = async (url, config = {}) => {
  try {
    const token = await UserController.getToken();
    if (!token) {
      throw new Error('No se ha obtenido un token de autenticación');
    }

    const response = await axios({
      url,
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'get',
      ...config
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UserController = {
  registerUser: async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/register`, userData);
      return data;
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (email, contrasena) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, contrasena });
      await storeToken(data.token);
      return data;
    } catch (error) {
      const mensajeBackend = error.response?.data?.error || error.response?.data?.message;
      if (mensajeBackend) {
        throw new Error(mensajeBackend);
      }
      throw error;
    }
  },

  getToken: async () => {
    if (authToken) {
      return authToken;
    }
    const storedToken = await AsyncStorage.getItem('authToken');
    authToken = storedToken;
    return storedToken;
  },
};

const storeToken = async (token) => {
  authToken = token;
  await AsyncStorage.setItem('authToken', token);
};

export default UserController;
