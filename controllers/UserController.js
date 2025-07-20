import api from '../src/services/api';
import * as SecureStore from 'expo-secure-store';

let authToken = null;

export const sendAuthenticatedRequest = async (url, config = {}) => {
  try {
    const token = await UserController.getToken();
    if (!token) {
      throw new Error('No se ha obtenido un token de autenticación');
    }

    const response = await api({
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
      const { data } = await api.post('/users/register', userData);
      return data;
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (email, contrasena) => {
    try {
      const { data } = await api.post('/login', { email, contrasena });
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
    const storedToken = await SecureStore.getItemAsync('authToken');
    authToken = storedToken;
    return storedToken;
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('authToken');
    authToken = null;
  },
};

const storeToken = async (token) => {
  authToken = token;
  await SecureStore.setItemAsync('authToken', token);
};

export default UserController;
