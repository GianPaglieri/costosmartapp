import { sendAuthenticatedRequest, UserController } from './UserController';
import api from '../src/services/api';

export const fetchTortas = async () => {
  try {
    const data = await sendAuthenticatedRequest('/tortas');
    return data;
  } catch (error) {
    return [];
  }
};

export const agregarTorta = async (tortaData) => {
  try {
    const token = await UserController.getToken();
    const response = await api.post('/tortas', tortaData, {
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
    return { success: false, error: error.message };
  }
};

export const editarTorta = async (idTorta, formData) => {
  try {
    const { data } = await api.put(`/tortas/${idTorta}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const borrarTorta = async (id) => {
  try {
    const token = await UserController.getToken();
    const response = await api.delete(`/tortas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return { success: true };
    }
    return { success: false, error: 'Error al eliminar la torta' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
