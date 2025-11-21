import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, View, ActivityIndicator, Text, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { gradients, colors as brandColors } from '../src/theme/tokens';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import IngredientScreen from '../screens/IngredientScreen';
import TortasScreen from '../screens/TortasScreen';
import RecetaScreen from '../screens/RecetaScreen';
import VentaScreen from '../screens/VentaScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainDrawer = () => {
  const { logout, user } = useAuth();
  const theme = useTheme();
  const role = user?.role || 'Administrador';

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que querés cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const heroGradient = gradients.hero || ['#0f172a', '#1e293b'];

  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
        drawerActiveTintColor: brandColors.primary,
        drawerInactiveTintColor: theme?.colors?.onSurfaceVariant || brandColors.textMuted,
        drawerActiveBackgroundColor: 'rgba(14,165,233,0.12)',
        drawerLabelStyle: { fontSize: 15, fontFamily: 'Inter-SemiBold' },
        drawerItemStyle: { borderRadius: 14, marginHorizontal: 10, marginVertical: 4, paddingLeft: 4 },
        drawerStyle: {
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          overflow: 'hidden',
          backgroundColor: brandColors.surfaceMuted,
          paddingTop: 6,
        },
        sceneContainerStyle: { backgroundColor: theme?.colors?.background || '#f1f5f9' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff', fontWeight: '700', fontFamily: 'Montserrat-SemiBold' },
        headerBackground: () => (
          <LinearGradient colors={heroGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
        ),
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ paddingTop: 0, backgroundColor: brandColors.surfaceMuted }}
        >
          <View style={{ paddingHorizontal: 18, paddingBottom: 12, paddingTop: 24 }}>
            <Pressable
              onPress={() => props.navigation.navigate('Perfil')}
              style={{ borderRadius: 20, overflow: 'hidden' }}
            >
              <LinearGradient
                colors={heroGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}
              >
                <Image
                  source={require('../assets/logo.png')}
                  style={{ width: 46, height: 46, borderRadius: 12 }}
                  resizeMode="contain"
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Montserrat-SemiBold' }}>
                    {user?.nombre || 'CostoSmart'}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#e2e8f0' }}>{role}</Text>
                  <Text style={{ fontSize: 12, color: '#cbd5f5' }}>{user?.email || 'Sesión activa'}</Text>
                </View>
                <Avatar.Text
                  size={40}
                  label={(user?.nombre || 'CS').substring(0, 2).toUpperCase()}
                  style={{ backgroundColor: '#ffffff22' }}
                  color="#fff"
                />
              </LinearGradient>
            </Pressable>
          </View>

          <DrawerItemList {...props} />
          <DrawerItem
            label="Cerrar sesión"
            icon={() => (
              <View
                style={{
                  backgroundColor: 'rgba(220,38,38,0.12)',
                  borderRadius: 12,
                  padding: 6,
                  marginRight: 4,
                }}
              >
                <Ionicons name="log-out-outline" size={16} color={brandColors.danger} />
              </View>
            )}
            labelStyle={{ color: brandColors.danger, fontWeight: '600', marginLeft: -20 }}
            onPress={handleLogout}
            style={{ marginHorizontal: 16 }}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Inicio', drawerLabel: 'Inicio', drawerIcon: ({ color, size }) => (<Ionicons name="home-outline" size={size} color={color} />) }}
      />
      <Drawer.Screen
        name="Ingredientes"
        component={IngredientScreen}
        options={{ title: 'Ingredientes', drawerIcon: ({ color, size }) => (<Ionicons name="pricetags-outline" size={size} color={color} />) }}
      />
      <Drawer.Screen
        name="Tortas"
        component={TortasScreen}
        options={{ title: 'Tortas', drawerIcon: ({ color, size }) => (<Ionicons name="fast-food-outline" size={size} color={color} />) }}
      />
      <Drawer.Screen
        name="Recetas"
        component={RecetaScreen}
        options={{ title: 'Recetas', drawerIcon: ({ color, size }) => (<Ionicons name="book-outline" size={size} color={color} />) }}
      />
      <Drawer.Screen
        name="Ventas"
        component={VentaScreen}
        options={{ title: 'Ventas', drawerIcon: ({ color, size }) => (<Ionicons name="cart-outline" size={size} color={color} />) }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ title: 'Mi perfil', drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
};

const linking = {
  prefixes: [Linking.createURL('/'), 'costosmart://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
      Main: {
        screens: {
          HomeScreen: 'home',
          Ingredientes: 'ingredientes',
          Tortas: 'tortas',
          Recetas: 'recetas',
          Ventas: 'ventas',
          Perfil: 'perfil',
        },
      },
    },
  },
};

const Navigation = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainDrawer} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
