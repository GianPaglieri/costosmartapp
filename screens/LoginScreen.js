import React, { useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import UserController from '../controllers/UserController';
import styles from '../components/styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !contrasena.trim()) {
      Alert.alert('Error', 'Completa email y contraseña');
      return;
    }
    setLoading(true);
    try {
      await UserController.loginUser(email, contrasena);
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <View style={[styles.card, { width: '90%', maxWidth: 400, padding: 24 }]}>
        <Text style={[styles.cardTitle, { fontSize: 24, textAlign: 'center', marginBottom: 16 }]}>
          Bienvenido
        </Text>

        <TextInput
          mode="outlined"
          label="Correo electrónico"
          placeholder="usuario@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { marginBottom: 16, backgroundColor: '#fff' }]}
          accessibilityLabel="campo-email"
          testID="login-email"
        />

        <TextInput
          mode="outlined"
          label="Contraseña"
          placeholder="••••••••"
          secureTextEntry
          value={contrasena}
          onChangeText={setPassword}
          style={[styles.input, { marginBottom: 24, backgroundColor: '#fff' }]}
          accessibilityLabel="campo-contrasena"
          testID="login-password"
        />

        {/* Botón mejorado */}
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.botonPrimario,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingVertical: 14,
              borderRadius: 12,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.botonTexto}>Iniciar Sesión</Text>
            </>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{ marginTop: 16, alignSelf: 'center' }}
          accessibilityRole="link"
          accessibilityLabel="registrarse"
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
