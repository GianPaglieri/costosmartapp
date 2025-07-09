import { sendAuthenticatedRequest, UserController } from './UserController';
import axios from 'axios';
import { API_URL } from '../config';

export const fetchRecetas = async () => {
  try {
    const response = await sendAuthenticatedRequest(`${API_URL}/recetas`);

    // Procesar la respuesta agrupada del backend
    return response.map(receta => ({
      ...receta,
      ingredientes: receta.ingredientes.map(ing => ({
        ...ing,
        total_cantidad: parseFloat(ing.total_cantidad) || 0
      }))
    }));
  } catch (error) {
    return [];
  }
};

export const agregarReceta = async (recetaBase) => {
  try {
    const token = await UserController.getToken();
    const response = await axios.post(`${API_URL}/tortas`, recetaBase, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.error || 'Error al crear receta' };
  }
};

export const agregarIngrediente = async (ID_TORTA, ID_INGREDIENTE, cantidad) => {
  try {
    const token = await UserController.getToken();
    const response = await axios.post(
      `${API_URL}/recetas/nueva-relacion`,
      { ID_TORTA, ID_INGREDIENTE, cantidad },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    // Adaptación para el formato de respuesta de tu backend
    if (response.data.message === 'Nueva relación agregada exitosamente') {
      return { 
        success: true,
        data: {
          ID_TORTA,
          ID_INGREDIENTE,
          cantidad
        }
      };
    }
    
    return { 
      success: false, 
      error: response.data.error || 'Respuesta inesperada del servidor' 
    };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || error.message
    };
  }
};

export const editarCantidadIngrediente = async (ID_TORTA, ID_INGREDIENTE, cantidad) => {
  try {
    const token = await UserController.getToken();

    const response = await axios.put(
      `${API_URL}/recetas/${ID_TORTA}/${ID_INGREDIENTE}`,
      { total_cantidad: cantidad },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data.success
      ? { success: true, data: response.data }
      : { success: false, error: response.data.error };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Error al actualizar cantidad'
    };
  }
};

export const eliminarIngrediente = async (ID_TORTA, ID_INGREDIENTE) => {
  try {
    const token = await UserController.getToken();
    const response = await axios.delete(
      `${API_URL}/recetas/${ID_TORTA}/${ID_INGREDIENTE}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    return response.data.success
      ? { success: true, message: response.data.message }
      : { success: false, error: response.data.error };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Error al eliminar ingrediente'
    };
  }
};

export const borrarReceta = async (ID_TORTA) => {
  try {
    const token = await UserController.getToken();
    const response = await axios.delete(
      `${API_URL}/recetas/${ID_TORTA}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    return response.data.success
      ? { success: true, message: 'Receta eliminada' }
      : { success: false, error: response.data.error };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Error al eliminar receta'
    };
  }
};
