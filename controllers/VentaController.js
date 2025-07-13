import api from '../src/services/api';
import UserController, { sendAuthenticatedRequest } from './UserController';

// Controlador de ventas
export const Ventas = async () => {
  try {
    const ventas = await sendAuthenticatedRequest('/ventas');
    const tortas = await sendAuthenticatedRequest('/tortas');

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
    return [];
  }
};
export const obtenerVentas = async () => {
  try {
      const ventas = await sendAuthenticatedRequest('/ventas');

      return ventas;
  } catch (error) {
      throw error;
  }
};

export const registrarVenta = async (idTorta) => {
  try {
    const token = await UserController.getToken();
    const response = await api.post('/ventas', { id_torta: idTorta }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerCantidadVentas = async () => {
    try {
      const response = await sendAuthenticatedRequest('/ventas/cantidad');
      const cantidadVentas = response?.cantidadVentas;

      if (cantidadVentas === undefined) {
        throw new Error('La propiedad "cantidadVentas" no está definida en la respuesta');
      }

      return cantidadVentas;
    } catch (error) {
      throw error;
    }
  };

export const obtenerGanancias = async () => {
  try {
    const response = await sendAuthenticatedRequest('/ventas/ganancias');
    const ganancias = response?.ganancias;
    if (ganancias === undefined) {
      throw new Error('La propiedad "ganancias" no está definida en la respuesta');
    }

    return ganancias;
  } catch (error) {
    throw error;
  }
};

export const obtenerCantidadVentasSemanales = async () => {
  try {
    const response = await sendAuthenticatedRequest('/ventas/cantidad-semana');
    const cantidadVentasSemana = response?.cantidadVentasSemana;

    if (cantidadVentasSemana === undefined) {
      throw new Error('La propiedad "cantidadVentasSemana" no está definida en la respuesta');
    }

    return cantidadVentasSemana;
  } catch (error) {
    throw error;
  }
};

export const obtenerPorcentajeVentas = async () => {
  try {
    const response = await sendAuthenticatedRequest('/ventas/porcentaje-ventas');
    const porcentajeVentas = response?.porcentajeCambio;

    if (porcentajeVentas === undefined) {
      throw new Error('La propiedad "porcentajeCambio" no está definida en la respuesta');
    }

    return porcentajeVentas;
  } catch (error) {
    throw error;
  }
};
