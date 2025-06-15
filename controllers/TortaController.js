import { sendAuthenticatedRequest, UserController } from './UserController';
import axios from 'axios';

const API_URL = 'http://149.50.131.253/api';

const waitUntilTokenIsAvailable = async () => {
  while (!UserController.getToken()) {
    console.log('Esperando a que se obtenga un token de autenticación...');
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return UserController.getToken();
};

export const fetchTortas = async () => {
  try {
    const token = await waitUntilTokenIsAvailable();
    const data = await sendAuthenticatedRequest(`${API_URL}/tortas`);
    console.log("Datos recibidos del API:", data); // Añade este console.log
    return data;
  } catch (error) {
    console.error('Error al obtener las tortas:', error.message);
    return [];
  }
};

export const agregarTorta = async (tortaData) => {
  try {
    const token = await waitUntilTokenIsAvailable();
    const response = await axios.post(`${API_URL}/tortas`, tortaData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 200) {
      console.log('Torta agregada exitosamente');
      return { success: true };
    } else {
      console.error('Error al agregar la torta');
      return { success: false, error: 'Error al agregar la torta' };
    }
  } catch (error) {
    console.error('Error al agregar la torta:', error.message);
    return { success: false, error: error.message };
  }
};

export const editarTorta = async (idTorta, formData) => {
  try {
    const response = await fetch(`${API_URL}/tortas/${idTorta}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error editando torta:', error);
    return { success: false, error: error.message };
  }
};

export const borrarTorta = async (id) => {
  try {
    const token = await waitUntilTokenIsAvailable();
    const response = await axios.delete(`${API_URL}/tortas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      console.log('Torta eliminada exitosamente');
      return { success: true };
    } else {
      console.error('Error al eliminar la torta');
      return { success: false, error: 'Error al eliminar la torta' };
    }
  } catch (error) {
    console.error('Error en la solicitud de borrado de la torta:', error.message);
    return { success: false, error: error.message };
  }
};
