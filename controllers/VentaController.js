import api from '../src/services/api';
import { sendAuthenticatedRequest } from './UserController';

const toNumber = (v) => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const n = parseFloat(v.replace('%', '').replace(',', '.'));
    return Number.isNaN(n) ? 0 : n;
  }
  return 0;
};

const toArray = (v) => (Array.isArray(v) ? v : (Array.isArray(v?.data) ? v.data : []));

export const obtenerVentas = async () => {
  try {
    const ventas = await sendAuthenticatedRequest('ventas');
    return toArray(ventas);
  } catch (error) {
    throw error;
  }
};

export const registrarVenta = async (idTorta) => {
  try {
    const response = await api.post('ventas', { id_torta: idTorta });
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.error || 'No se pudo registrar la venta';
    const enriched = new Error(message);
    enriched.code = error?.response?.data?.code;
    enriched.details = error?.response?.data?.details;
    enriched.original = error;
    throw enriched;
  }
};

export const obtenerCantidadVentas = async () => {
  try {
    const response = await sendAuthenticatedRequest('ventas/cantidad');
    const val = response?.cantidadVentas ?? response?.cantidad ?? response ?? 0;
    const total = typeof val === 'number' ? val : Number(val) || 0;
    const rango = response?.rango;
    return {
      total,
      rango: rango && rango.inicio && rango.fin
        ? { inicio: rango.inicio, fin: rango.fin }
        : null
    };
  } catch (error) {
    throw error;
  }
};

export const obtenerGanancias = async () => {
  try {
    const response = await sendAuthenticatedRequest('ventas/ganancias');
    const raw = response?.ganancias ?? response?.total ?? response ?? 0;
    const total = typeof raw === 'number' ? raw : Number(raw) || 0;
    const rango = response?.rango;
    return {
      total,
      rango: rango && rango.inicio && rango.fin
        ? { inicio: rango.inicio, fin: rango.fin }
        : null
    };
  } catch (error) {
    throw error;
  }
};

export const obtenerCantidadVentasSemanales = async () => {
  try {
    const response = await sendAuthenticatedRequest('ventas/cantidad-semana');
    const val = response?.cantidadVentasSemana ?? response?.cantidadVentas ?? response?.cantidad ?? response ?? 0;
    return typeof val === 'number' ? val : Number(val) || 0;
  } catch (error) {
    throw error;
  }
};

export const obtenerPorcentajeVentas = async () => {
  try {
    const response = await sendAuthenticatedRequest('ventas/porcentaje-ventas');
    const raw = response?.porcentajeCambio ?? response?.porcentaje ?? response ?? 0;
    if (typeof raw === 'number') return raw;
    if (typeof raw === 'string') return toNumber(raw);
    return 0;
  } catch (error) {
    throw error;
  }
};
