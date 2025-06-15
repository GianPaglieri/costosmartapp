import UserController, { sendAuthenticatedRequest } from './UserController';

const API_URL = 'http://149.50.131.253/api';

const waitUntilTokenIsAvailable = async () => {
  while (!UserController.getToken()) {
    console.log('Esperando a que se obtenga un token de autenticación...');
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return UserController.getToken();
};

export const fetchIngredientes = async () => {
  try {
    const token = await waitUntilTokenIsAvailable();
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
    const token = await waitUntilTokenIsAvailable();
    const data = await sendAuthenticatedRequest(`${API_URL}/ingredientes/menosstock`);
    return data;
  } catch (error) {
    console.error('Error al obtener los ingredientes con menos stock:', error);
    return [];
  }
};

export const agregarIngrediente = async (ingrediente) => {
  try {
    const token = await waitUntilTokenIsAvailable();
    const response = await fetch(`${API_URL}/ingredientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(ingrediente),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al agregar el ingrediente:', error);
    return { success: false };
  }
};

export const editarIngrediente = async (ingrediente) => {
  try {
    const token = await waitUntilTokenIsAvailable();
    const response = await fetch(`${API_URL}/ingredientes/${ingrediente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(ingrediente),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al editar el ingrediente:', error);
    return { success: false };
  }
};

export const borrarIngrediente = async (id) => {
  try {
    const token = await waitUntilTokenIsAvailable();
    const response = await fetch(`${API_URL}/ingredientes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      console.log('Ingrediente eliminado exitosamente');
      return { success: true };
    } else {
      const error = await response.json();
      console.error('Error al eliminar el ingrediente:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('Error en la solicitud de borrado del ingrediente:', error);
    return { success: false, error };
  }
};
