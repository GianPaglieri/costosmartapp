import axios from 'axios';
import UserController, { sendAuthenticatedRequest } from './UserController';
import { API_URL } from '../config';

// Controlador de ventas
export const Ventas = async () => {
  try {
    const ventas = await sendAuthenticatedRequest(`${API_URL}/ventas`);
    const tortas = await sendAuthenticatedRequest(`${API_URL}/tortas`);

    if (!ventas || !tortas) {
      throw new Error('Error al obtener las listas de ventas o tortas');
    }

    const ventasConNombres = ventas.map((venta) => {
      const tortaAsociada = tortas.find((torta) => torta.ID_TORTA === venta.ID_TORTA);
      return {
        ...venta,
        nombre_torta: tortaAsociada ? tortaAsociada.nombre_torta : 'Torta no encontrada',
      };
    });

    return ventasConNombres;
  } catch (error) {
    console.error('Error al obtener las ventas con nombres de tortas:', error);
    return [];
  }
};
export const obtenerVentas = async () => {
  try {
      const ventas = await sendAuthenticatedRequest(`${API_URL}/ventas`);

      return ventas;
  } catch (error) {
      console.error('Error al obtener las ventas:', error.message);
      throw error;
  }
};

export const registrarVenta = async (idTorta) => {
  try {
    const token = await UserController.getToken();
    const response = await axios.post(`${API_URL}/ventas`, { id_torta: idTorta }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    throw error;
  }
};

export const obtenerCantidadVentas = async () => {
    try {
      const response = await sendAuthenticatedRequest(`${API_URL}/ventas/cantidad`);
      const cantidadVentas = response?.cantidadVentas;

      if (cantidadVentas === undefined) {
        throw new Error('La propiedad "cantidadVentas" no está definida en la respuesta');
      }

      return cantidadVentas;
    } catch (error) {
      console.error('Error al obtener la cantidad de ventas:', error);
      throw error;
    }
  };

export const obtenerGanancias = async () => {
  try {
    const response = await sendAuthenticatedRequest(`${API_URL}/ventas/ganancias`);
    const ganancias = response?.ganancias;
    if (ganancias === undefined) {
      throw new Error('La propiedad "ganancias" no está definida en la respuesta');
    }

    return ganancias;
  } catch (error) {
    console.error('Error al obtener ganancias:', error);
    throw error;
  }
};

export const obtenerCantidadVentasSemanales = async () => {
  try {
    const response = await sendAuthenticatedRequest(`${API_URL}/ventas/cantidad-semana`);
    const cantidadVentasSemana = response?.cantidadVentasSemana;

    if (cantidadVentasSemana === undefined) {
      throw new Error('La propiedad "cantidadVentasSemana" no está definida en la respuesta');
    }

    return cantidadVentasSemana;
  } catch (error) {
    console.error('Error al obtener la cantidad de ventas semanales:', error);
    throw error;
  }
};

export const obtenerPorcentajeVentas = async () => {
  try {
    const response = await sendAuthenticatedRequest(`${API_URL}/ventas/porcentaje-ventas`);
    const porcentajeVentas = response?.porcentajeCambio;

    if (porcentajeVentas === undefined) {
      throw new Error('La propiedad "porcentajeCambio" no está definida en la respuesta');
    }

    return porcentajeVentas;
  } catch (error) {
    console.error('Error al obtener el porcentaje de ventas', error);
    throw error;
  }
};
