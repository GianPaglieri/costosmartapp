import axios from 'axios';
import UserController, { sendAuthenticatedRequest } from './UserController';
import { API_URL } from '../config';

export const fetchIngredientes = async () => {
  try {
    const data = await sendAuthenticatedRequest(`${API_URL}/ingredientes`);
    
    // Asegúrate de que data.ingredientes sea un array
    if (data.success && Array.isArray(data.ingredientes)) {
      return data.ingredientes;
    } else {
      console.error('La respuesta no contiene una lista de ingredientes válida:', data);
      return [];
    }
  } catch (error) {
    console.error('Error al obtener los ingredientes:', error);
    return [];
  }
};

export const fetchIngredientesMenosStock = async () => {
  try {
    const data = await sendAuthenticatedRequest(`${API_URL}/ingredientes/menosstock`);
    return data;
  } catch (error) {
    console.error('Error al obtener los ingredientes con menos stock:', error);
    return [];
  }
};

export const agregarIngrediente = async (ingrediente) => {
  try {
    const token = await UserController.getToken();
    const { data } = await axios.post(
      `${API_URL}/ingredientes`,
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
    console.error('Error al agregar el ingrediente:', error);
    return { success: false };
  }
};

export const editarIngrediente = async (ingrediente) => {
  try {
    const token = await UserController.getToken();
    const { data } = await axios.put(
      `${API_URL}/ingredientes/${ingrediente.id}`,
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
    console.error('Error al editar el ingrediente:', error);
    return { success: false };
  }
};

export const borrarIngrediente = async (id) => {
  try {
    const token = await UserController.getToken();
    const { status, data } = await axios.delete(`${API_URL}/ingredientes/${id}`, {
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
    console.error('Error en la solicitud de borrado del ingrediente:', error);
    return { success: false, error };
  }
};
