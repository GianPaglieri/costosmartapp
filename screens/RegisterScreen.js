import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserController from '../controllers/UserController';
import styles from '../components/styles';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (contrasena !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    try {
      const userData = { nombre, email, contrasena };
      await UserController.registerUser(userData);
      Alert.alert('Usuario registrado', 'Tu cuenta se creó correctamente', [
        { text: 'Ir a login', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <View style={[styles.card, { width: '90%', maxWidth: 400, padding: 24 }]}>
        <Text style={[styles.cardTitle, { fontSize: 24, textAlign: 'center', marginBottom: 16 }]}>Crear Cuenta</Text>
        <Text style={[styles.label, { marginBottom: 4 }]}>Nombre</Text>
        <TextInput
          style={[styles.input, { marginBottom: 16 }]}
          placeholder="Tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />
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
          style={[styles.input, { marginBottom: 16 }]}
          placeholder="••••••••"
          secureTextEntry
          value={contrasena}
          onChangeText={setPassword}
        />
        <Text style={[styles.label, { marginBottom: 4 }]}>Confirmar contraseña</Text>
        <TextInput
          style={[styles.input, { marginBottom: 24 }]}
          placeholder="••••••••"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable
          onPress={handleRegister}
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
          <Ionicons name="person-add-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.botonTexto}>Registrarse</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 16, alignSelf: 'center' }}>
          <Text style={styles.seccionLink}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;
