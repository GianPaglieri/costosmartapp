import { sendAuthenticatedRequest, UserController } from './UserController';

const API_URL = 'http://149.50.131.253/api';

const waitUntilTokenIsAvailable = async () => {
  while (!UserController.getToken()) {
    console.log('Esperando a que se obtenga un token de autenticación...');
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return UserController.getToken();
};

export const fetchListaPrecios = async () => {
  try {
    const token = await waitUntilTokenIsAvailable();
    const data = await sendAuthenticatedRequest(`${API_URL}/lista_precios`);
    return data;
  } catch (error) {
    console.error('Error al obtener la lista de precios:', error.message);
    return [];
  }
};
