import { sendAuthenticatedRequest, UserController } from './UserController';
import { API_URL } from '../config';

export const fetchListaPrecios = async () => {
  try {
    const data = await sendAuthenticatedRequest(`${API_URL}/lista_precios`);
    return data;
  } catch (error) {
    console.error('Error al obtener la lista de precios:', error.message);
    return [];
  }
};
