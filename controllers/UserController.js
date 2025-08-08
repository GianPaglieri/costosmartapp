import api from '../src/services/api';

export const sendAuthenticatedRequest = async (url, config = {}) => {
  try {
    const response = await api({
      url,
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
      return data;
    } catch (error) {
      const mensajeBackend = error.response?.data?.error || error.response?.data?.message;
      if (mensajeBackend) {
        throw new Error(mensajeBackend);
      }
      throw error;
    }
  },
};

export default UserController;
