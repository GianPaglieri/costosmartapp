import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, View, ActivityIndicator, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import IngredientScreen from '../screens/IngredientScreen';
import TortasScreen from '../screens/TortasScreen';
import RecetaScreen from '../screens/RecetaScreen';
import VentaScreen from '../screens/VentaScreen';

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

  const handleLogout = (navigation) => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que querés cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          onPress: async () => {
            await logout();
          }
        }
      ]
    );
  };

  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
        drawerActiveTintColor: theme?.colors?.primary || '#1976d2',
        drawerInactiveTintColor: theme?.colors?.onSurfaceVariant || '#666',
        drawerActiveBackgroundColor: (theme?.colors?.primary || '#1976d2') + '10',
        drawerLabelStyle: { fontSize: 15 },
        drawerStyle: { borderTopRightRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden' },
        sceneContainerStyle: { backgroundColor: theme?.colors?.background || '#fafafa' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff', fontWeight: '700' },
        headerBackground: () => (
          <LinearGradient
            colors={["#1a73e8", "#2f55d4", "#6a1b9a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
          <View style={{ backgroundColor: (theme?.colors?.primary || '#1976d2') + '20', paddingVertical: 20, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Text size={44} label={(user?.nombre || 'US').substring(0,2).toUpperCase()} style={{ backgroundColor: theme?.colors?.primary || '#1976d2' }} color={'#fff'} />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: theme?.colors?.onSurface || '#111' }}>{user?.nombre || 'Usuario'}</Text>
              <Text style={{ fontSize: 12, color: theme?.colors?.onSurfaceVariant || '#666' }}>{user?.email || 'Sesión activa'}</Text>
            </View>
          </View>

          <DrawerItemList {...props} />
          <DrawerItem
            label="Cerrar sesión"
            icon={({ color, size }) => (<Ionicons name="log-out-outline" size={size} color={theme?.colors?.error || 'red'} />)}
            labelStyle={{ color: theme?.colors?.error || 'red', fontWeight: 'bold' }}
            onPress={() => handleLogout(props.navigation)}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Inicio', drawerLabel: 'Inicio', drawerIcon: ({ color, size }) => (<Ionicons name="home-outline" size={size} color={color} />) }} />
      <Drawer.Screen name="Ingredientes" component={IngredientScreen} options={{ title: 'Ingredientes', drawerIcon: ({ color, size }) => (<Ionicons name="leaf-outline" size={size} color={color} />) }} />
      <Drawer.Screen name="Tortas" component={TortasScreen} options={{ title: 'Tortas', drawerIcon: ({ color, size }) => (<Ionicons name="ice-cream-outline" size={size} color={color} />) }} />
      <Drawer.Screen name="Recetas" component={RecetaScreen} options={{ title: 'Recetas', drawerIcon: ({ color, size }) => (<Ionicons name="book-outline" size={size} color={color} />) }} />
      <Drawer.Screen name="Ventas" component={VentaScreen} options={{ title: 'Ventas', drawerIcon: ({ color, size }) => (<Ionicons name="cart-outline" size={size} color={color} />) }} />
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
