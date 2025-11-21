import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { TextInput as PaperInput, Button, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import UserController from '../controllers/UserController';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../components/styles';
import { colors, gradients } from '../src/theme/tokens';

const logo = require('../assets/logo.png');
const DEV_CREDENTIALS = {
  email: 'test@test.com',
  password: '123123',
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [autoLoginDone, setAutoLoginDone] = useState(false);
  const { login } = useAuth();
  const theme = useTheme();



  const performLogin = useCallback(
    async (rawEmail, rawPassword) => {
      const trimmedEmail = (rawEmail || '').trim();
      const trimmedPassword = (rawPassword || '').trim();

      if (!trimmedEmail || !trimmedPassword) {
        Alert.alert('Datos incompletos', 'Completa todos los campos.');
        return;
      }

      setLoading(true);
      try {
        const response = await UserController.loginUser(trimmedEmail, trimmedPassword);
        const success = await login(response.user, response.token);
        if (!success) {
          Alert.alert('Error', 'No se pudo iniciar sesión');
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'Error al iniciar sesión');
      } finally {
        setLoading(false);
      }
    },
    [login]
  );

  const handleLogin = () => performLogin(email, contrasena);

  useEffect(() => {
    if (__DEV__ && !autoLoginDone) {
      setEmail(DEV_CREDENTIALS.email);
      setPassword(DEV_CREDENTIALS.password);
      setAutoLoginDone(true);
      performLogin(DEV_CREDENTIALS.email, DEV_CREDENTIALS.password);
    }
  }, [autoLoginDone, performLogin]);

  return (
    <LinearGradient colors={gradients.hero} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={loginStyles.wrapper}>
            <LoadingSpinner visible={loading} message="Iniciando sesión..." />
            <View style={loginStyles.card}>
              <View style={loginStyles.header}>
                <Image source={logo} resizeMode="contain" style={loginStyles.logo} />
                <Text style={loginStyles.brand}>CostoSmart</Text>
                <Text style={loginStyles.tagline}>
                  Gestiona tus recetas y costos desde un solo lugar.
                </Text>
                <View style={loginStyles.divider} />
               
              </View>

              <PaperInput
                mode="outlined"
                label="Correo electrónico"
                placeholder="usuario@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
                style={loginStyles.input}
              />

              <PaperInput
                mode="outlined"
                label="Contraseña"
                placeholder="••••••••"
                secureTextEntry
                value={contrasena}
                onChangeText={setPassword}
                editable={!loading}
                style={loginStyles.input}
              />

              <Button
                mode="contained"
                onPress={handleLogin}
                disabled={loading}
                icon={(props) => <Ionicons name="log-in-outline" size={20} color="#fff" />}
                contentStyle={{ paddingVertical: 8 }}
                style={{ borderRadius: 14 }}
              >
                Iniciar Sesión
              </Button>

              <Button
                mode="text"
                onPress={() => Alert.alert('Recuperá tu cuenta', 'Contacta al administrador para restablecer tu contraseña.')}
                textColor={theme.colors.primary}
                style={{ marginTop: 12 }}
              >
                ¿Olvidaste tu contraseña?
              </Button>

              <Button
                onPress={() => navigation.navigate('Register')}
                disabled={loading}
                mode="outlined"
                textColor={theme.colors.primary}
                style={{ marginTop: 12, borderRadius: 14 }}
              >
                ¿No tienes una cuenta? Registrate
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const loginStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 26,
    shadowColor: 'rgba(15,23,42,0.5)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.18,
    shadowRadius: 35,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  brand: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 26,
    color: colors.primary,
  },
  tagline: {
    textAlign: 'center',
    color: colors.textSubtle,
    marginTop: 4,
    fontSize: 14,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: colors.divider,
    marginVertical: 14,
    borderRadius: 999,
  },
  welcome: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  input: {
    marginBottom: 14,
    backgroundColor: colors.surfaceMuted,
  },
});

export default LoginScreen;
