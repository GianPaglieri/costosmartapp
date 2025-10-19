import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput as PaperInput, Button, useTheme } from 'react-native-paper';
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
  const theme = useTheme();

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
      <View style={[styles.card, { width: '90%', maxWidth: 420, padding: 24 }]}>
        <Text style={[styles.cardTitle, { fontSize: 24, textAlign: 'center', marginBottom: 16, color: theme.colors.primary }]}>
          Bienvenido
        </Text>

        <PaperInput
          mode="outlined"
          label="Correo electrónico"
          placeholder="usuario@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          style={{ marginBottom: 12 }}
        />

        <PaperInput
          mode="outlined"
          label="Contraseña"
          placeholder="••••••••"
          secureTextEntry
          value={contrasena}
          onChangeText={setPassword}
          editable={!loading}
          style={{ marginBottom: 20 }}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          disabled={loading}
          icon={(props) => <Ionicons name="log-in-outline" size={20} color="#fff" />}
          contentStyle={{ paddingVertical: 8 }}
        >
          Iniciar Sesión
        </Button>

        <Button
          onPress={() => navigation.navigate('Register')}
          disabled={loading}
          style={{ marginTop: 16, alignSelf: 'center' }}
        >
          ¿No tienes una cuenta? Regístrate
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
