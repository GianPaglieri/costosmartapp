import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserController from '../controllers/UserController';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../components/styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !contrasena) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const response = await UserController.loginUser(email, contrasena);
      const success = await login(response.user, response.token);
      
      if (!success) {
        Alert.alert('Error', 'No se pudo iniciar sesión');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <LoadingSpinner visible={loading} message="Iniciando sesión..." />
      
      <View style={[styles.card, { width: '90%', maxWidth: 400, padding: 24 }]}>
        <Text style={[styles.cardTitle, { fontSize: 24, textAlign: 'center', marginBottom: 16 }]}>
          Bienvenido
        </Text>

        <Text style={[styles.label, { marginBottom: 4 }]}>Correo electrónico</Text>
        <TextInput
          style={[styles.input, { marginBottom: 16 }]}
          placeholder="usuario@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <Text style={[styles.label, { marginBottom: 4 }]}>Contraseña</Text>
        <TextInput
          style={[styles.input, { marginBottom: 24 }]}
          placeholder="••••••••"
          secureTextEntry
          value={contrasena}
          onChangeText={setPassword}
          editable={!loading}
        />

        {/* Botón mejorado */}
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={({ pressed }) => [
            styles.botonPrimario,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingVertical: 14,
              borderRadius: 12,
              elevation: 4,             // Android
              shadowColor: '#000',      // iOS
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              opacity: pressed ? 0.8 : 1,
            }
          ]}
        >
          <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.botonTexto}>Iniciar Sesión</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{ marginTop: 16, alignSelf: 'center' }}
          disabled={loading}
        >
          <Text style={styles.seccionLink}>
            ¿No tienes una cuenta? Regístrate
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
