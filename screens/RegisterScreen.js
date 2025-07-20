import React, { useState } from 'react';
import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import UserController from '../controllers/UserController';
import styles from '../components/styles';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nombre.trim() || !email.trim() || !contrasena.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    if (contrasena !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      const userData = { nombre, email, contrasena };
      await UserController.registerUser(userData);
      Alert.alert('Usuario registrado', 'Tu cuenta se creó correctamente', [
        { text: 'Ir a login', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <View style={[styles.card, { width: '90%', maxWidth: 400, padding: 24 }]}>
        <Text style={[styles.cardTitle, { fontSize: 24, textAlign: 'center', marginBottom: 16 }]}>Crear Cuenta</Text>
        <TextInput
          mode="outlined"
          label="Nombre"
          placeholder="Tu nombre"
          value={nombre}
          onChangeText={setNombre}
          style={[styles.input, { marginBottom: 16, backgroundColor: '#fff' }]}
          accessibilityLabel="campo-nombre"
          testID="register-name"
        />
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
          testID="register-email"
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          placeholder="••••••••"
          secureTextEntry
          value={contrasena}
          onChangeText={setPassword}
          style={[styles.input, { marginBottom: 16, backgroundColor: '#fff' }]}
          accessibilityLabel="campo-contrasena"
          testID="register-password"
        />
        <TextInput
          mode="outlined"
          label="Confirmar contraseña"
          placeholder="••••••••"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, { marginBottom: 24, backgroundColor: '#fff' }]}
          accessibilityLabel="campo-confirmar"
          testID="register-confirm"
        />
        <Pressable
          onPress={handleRegister}
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
              <Ionicons name="person-add-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.botonTexto}>Registrarse</Text>
            </>
          )}
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: 16, alignSelf: 'center' }}
          accessibilityRole="link"
          accessibilityLabel="ir-a-login"
        >
          <Text style={styles.seccionLink}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;
