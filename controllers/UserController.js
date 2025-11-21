import api from '../src/services/api';
import * as SecureStore from 'expo-secure-store';

export const sendAuthenticatedRequest = async (url, config = {}) => {
  try {
    const normalizedUrl = typeof url === 'string' ? url.replace(/^\/+/, '') : url;
    const response = await api({
      url: normalizedUrl,
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
      const { data } = await api.post('users/register', userData);
      return data;
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (email, contrasena) => {
    try {
      const { data } = await api.post('users/login', { email, contrasena });
      return data;
    } catch (error) {
      const mensajeBackend = error.response?.data?.error || error.response?.data?.message;
      if (mensajeBackend) {
        throw new Error(mensajeBackend);
      }
      throw error;
    }
  },
  
  requestPasswordReset: async (email) => {
    try {
      const { data } = await api.post('users/request-password-reset', { email });
      return data;
    } catch (error) {
      const mensajeBackend = error.response?.data?.error || error.response?.data?.message;
      if (mensajeBackend) {
        throw new Error(mensajeBackend);
      }
      throw error;
    }
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    try {
      const { data } = await api.post('users/change-password', { currentPassword, newPassword });
      return data;
    } catch (error) {
      const mensajeBackend =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.userMessage;
      if (mensajeBackend) {
        throw new Error(mensajeBackend);
      }
      throw error;
    }
  },
  
  // Devuelve el token guardado en SecureStore (null si no existe)
  getToken: async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      return token || null;
    } catch (error) {
      console.error('Error obteniendo token desde SecureStore:', error);
      return null;
    }
  },
};

export default UserController;


