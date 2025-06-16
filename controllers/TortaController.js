import { sendAuthenticatedRequest, UserController } from './UserController';
import axios from 'axios';
import { API_URL } from '../config';

export const fetchTortas = async () => {
  try {
    const data = await sendAuthenticatedRequest(`${API_URL}/tortas`);
    return data;
  } catch (error) {
    console.error('Error al obtener las tortas:', error.message);
    return [];
  }
};

export const agregarTorta = async (tortaData) => {
  try {
    const token = await UserController.getToken();
    const response = await axios.post(`${API_URL}/tortas`, tortaData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true };
    }
    return { success: false, error: 'Error al agregar la torta' };
  } catch (error) {
    console.error('Error al agregar la torta:', error.message);
    return { success: false, error: error.message };
  }
};

export const editarTorta = async (idTorta, formData) => {
  try {
    const { data } = await axios.put(`${API_URL}/tortas/${idTorta}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    console.error('Error editando torta:', error);
    return { success: false, error: error.message };
  }
};

export const borrarTorta = async (id) => {
  try {
    const token = await UserController.getToken();
    const response = await axios.delete(`${API_URL}/tortas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return { success: true };
    }
    return { success: false, error: 'Error al eliminar la torta' };
  } catch (error) {
    console.error('Error en la solicitud de borrado de la torta:', error.message);
    return { success: false, error: error.message };
  }
};
