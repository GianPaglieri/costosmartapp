import axios from 'axios';
const API_URL = 'http://149.50.131.253/api';
let authToken = null;

export const sendAuthenticatedRequest = async (url) => {
  try {
    const token = authToken;
    if (!token) {
      throw new Error('No se ha obtenido un token de autenticación');
    }

    console.log('Token being sent:', token);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al enviar la petición autenticada:', error.message);
    throw error;
  }
};

export const UserController = {
  registerUser: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  loginUser: async (email, contrasena) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasena }),
      });

      if (!response.ok) {
        console.error(`Error logging in: ${response.status} ${response.statusText}`);
        throw new Error(`Error al iniciar sesión: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Login response:', responseData);
      storeToken(responseData.token);
      return responseData;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },

  getToken: () => {
    const token = authToken;
    console.log('Token obtenido:', token);
    return token;
  },
};

const storeToken = (token) => {
  authToken = token;
  console.log('Token almacenado:', authToken);
};

export default UserController;
