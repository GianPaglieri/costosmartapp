import UserController, { sendAuthenticatedRequest } from './UserController';
import api from '../src/services/api';

export const fetchIngredientes = async () => {
  try {
    const data = await sendAuthenticatedRequest('/ingredientes');
    
    // Asegúrate de que data.ingredientes sea un array
    if (data.success && Array.isArray(data.ingredientes)) {
      return data.ingredientes;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const fetchIngredientesMenosStock = async () => {
  try {
    const data = await sendAuthenticatedRequest('/ingredientes/menosstock');
    return data;
  } catch (error) {
    return [];
  }
};

export const agregarIngrediente = async (ingrediente) => {
  try {
    const token = await UserController.getToken();
    const { data } = await api.post(
      '/ingredientes',
      ingrediente,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { success: false };
  }
};

export const editarIngrediente = async (ingrediente) => {
  try {
    const token = await UserController.getToken();
    const { data } = await api.put(
      `/ingredientes/${ingrediente.id}`,
      ingrediente,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { success: false };
  }
};

export const borrarIngrediente = async (id) => {
  try {
    const token = await UserController.getToken();
    const { status, data } = await api.delete(`/ingredientes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (status === 200) {
      return { success: true };
    } else {
      return { success: false, error: data };
    }
  } catch (error) {
    return { success: false, error };
  }
};
