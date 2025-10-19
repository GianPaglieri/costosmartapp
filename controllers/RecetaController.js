import { sendAuthenticatedRequest, UserController } from './UserController';
import api from '../src/services/api';

export const fetchRecetas = async () => {
  try {
    const response = await sendAuthenticatedRequest('recetas');

    return response.map((receta) => ({
      ID_TORTA: receta.idTorta,
      nombre_torta: receta.nombreTorta,
      imagen: receta.imagen,
      costos: {
        total: Number(receta?.costos?.total ?? 0),
      },
      ingredientes: receta.ingredientes.map((ingrediente) => ({
        ID_INGREDIENTE: ingrediente.idIngrediente,
        Nombre: ingrediente.nombre,
        total_cantidad: Number(ingrediente.cantidad ?? 0),
        unit_cost: Number(ingrediente.unitCost ?? 0),
        subtotal_cost: Number(ingrediente.subtotalCost ?? 0),
      })),
    }));
  } catch (error) {
    return [];
  }
};

export const agregarReceta = async (recetaBase) => {
  try {
    const token = await UserController.getToken();
    const response = await api.post('tortas', recetaBase, {
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
    const response = await api.post(
      'recetas/nueva-relacion',
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

    const response = await api.put(
      `recetas/${ID_TORTA}/${ID_INGREDIENTE}`,
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
    const response = await api.delete(
      `recetas/${ID_TORTA}/${ID_INGREDIENTE}`,
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
    const response = await api.delete(
      `recetas/${ID_TORTA}`,
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
