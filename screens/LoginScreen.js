import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserController from '../controllers/UserController';
import styles from '../components/styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await UserController.loginUser(email, contrasena);
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
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
        />

        <Text style={[styles.label, { marginBottom: 4 }]}>Contraseña</Text>
        <TextInput
          style={[styles.input, { marginBottom: 24 }]}
          placeholder="••••••••"
          secureTextEntry
          value={contrasena}
          onChangeText={setPassword}
        />

        {/* Botón mejorado */}
        <Pressable
          onPress={handleLogin}
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
