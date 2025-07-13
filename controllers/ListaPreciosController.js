import { sendAuthenticatedRequest, UserController } from './UserController';

export const fetchListaPrecios = async () => {
  try {
    const data = await sendAuthenticatedRequest('/lista_precios');
    return data;
  } catch (error) {
    return [];
  }
};
