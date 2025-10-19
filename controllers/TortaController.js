import { sendAuthenticatedRequest, UserController } from './UserController';
import api from '../src/services/api';

const toNumber = (value) => {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value === 'number') {
    return Number.isNaN(value) ? null : value;
  }
  const parsed = parseFloat(String(value).replace(',', '.'));
  return Number.isNaN(parsed) ? null : parsed;
};

const normalizeTortaResponse = (item = {}) => {
  const costo = toNumber(item.costo_total);
  const precioLista = toNumber(item.precio_lista ?? item.precio);
  const margen = toNumber(item.porcentaje_ganancia);

  return {
    ...item,
    costo_total: costo,
    precio_lista: precioLista,
    precio: precioLista ?? costo ?? null,
    porcentaje_ganancia: margen ?? 0,
  };
};

export const fetchTortas = async () => {
  try {
    const data = await sendAuthenticatedRequest('tortas/tortas-con-precios');
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(normalizeTortaResponse);
  } catch (error) {
    return [];
  }
};

export const agregarTorta = async (tortaData) => {
  try {
    const token = await UserController.getToken();
    const response = await api.post('tortas', tortaData, {
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
    const { data } = await api.put(`tortas/${idTorta}`, formData, {
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
    const response = await api.delete(`tortas/${id}`, {
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
