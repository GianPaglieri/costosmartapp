import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import api from '../src/services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
    // Exponer un gancho global para que el interceptor pueda forzar logout en 401
    try { globalThis.__forceLogout = () => logout(); } catch (e) {}
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Forzar ir siempre al Login al iniciar la app
      const FORCE_LOGIN_ON_LAUNCH = true;
      if (FORCE_LOGIN_ON_LAUNCH) {
        try {
          await SecureStore.deleteItemAsync('authToken');
          await SecureStore.deleteItemAsync('userData');
        } catch {}
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const token = await SecureStore.getItemAsync('authToken');
      const userData = await SecureStore.getItemAsync('userData');
      
      if (token && userData) {
        // Validar token contra el backend ANTES de marcar autenticado
        try {
          await api.get('ventas/cantidad'); // probe liviano protegido
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        } catch (e) {
          // Token inválido: limpiar y permanecer en Login
          await SecureStore.deleteItemAsync('authToken');
          await SecureStore.deleteItemAsync('userData');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, token) => {
    try {
      // Normalizar token a string válido
      let normalizedToken = token;
      if (typeof normalizedToken !== 'string') {
        if (normalizedToken && typeof normalizedToken === 'object') {
          const candidate = normalizedToken.token || normalizedToken.accessToken || normalizedToken.jwt || normalizedToken.authToken;
          normalizedToken = candidate != null ? String(candidate) : JSON.stringify(normalizedToken);
        } else if (normalizedToken != null) {
          normalizedToken = String(normalizedToken);
        } else {
          throw new Error('Token inválido');
        }
      }

      if (!normalizedToken) {
        throw new Error('Token vacío');
      }

      await SecureStore.setItemAsync('authToken', normalizedToken);
      await SecureStore.setItemAsync('userData', JSON.stringify(userData ?? {}));
      setIsAuthenticated(true);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const forceLogout = () => {
    Alert.alert(
      'Sesión Expirada',
      'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      [
        {
          text: 'OK',
          onPress: () => logout()
        }
      ]
    );
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    forceLogout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
