import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export const API_URL = Constants.expoConfig?.extra?.API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado renovar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Aquí podrías implementar renovación de token
        // Por ahora, simplemente eliminamos el token
        await SecureStore.deleteItemAsync('authToken');
        
        // Redirigir al login (esto requeriría un contexto global)
        console.log('Token expirado, redirigir al login');
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
      }
    }

    // Mejorar mensajes de error
    let errorMessage = 'Error de conexión';
    
    if (error.response) {
      // Error del servidor
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Datos inválidos';
          break;
        case 401:
          errorMessage = 'No autorizado';
          break;
        case 403:
          errorMessage = 'Acceso denegado';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 500:
          errorMessage = 'Error del servidor';
          break;
        default:
          errorMessage = data?.message || `Error ${status}`;
      }
    } else if (error.request) {
      // Error de red
      errorMessage = 'Error de conexión. Verifica tu internet.';
    } else {
      // Error de configuración
      errorMessage = 'Error de configuración';
    }

    // Agregar mensaje personalizado al error
    error.userMessage = errorMessage;
    
    return Promise.reject(error);
  }
);

export default api;
