import { sendAuthenticatedRequest } from './UserController';

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

const normalizeListaPrecio = (item = {}) => {
  const costo = toNumber(item.costo_total) ?? 0;
  const precioLista = toNumber(item.precio_lista ?? item.precio ?? item.costo_total) ?? costo;
  const margen = toNumber(item.porcentaje_ganancia) ?? 0;

  return {
    ...item,
    costo_total: costo,
    precio_lista: precioLista,
    porcentaje_ganancia: margen,
  };
};

export const fetchListaPrecios = async () => {
  try {
    const data = await sendAuthenticatedRequest('lista_precios');
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(normalizeListaPrecio);
  } catch (error) {
    return [];
  }
};
