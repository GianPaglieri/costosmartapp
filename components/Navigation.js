import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Alert } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import IngredientScreen from '../screens/IngredientScreen';
import TortasScreen from '../screens/TortasScreen';
import RecetaScreen from '../screens/RecetaScreen';
import VentaScreen from '../screens/VentaScreen';

const Drawer = createDrawerNavigator();

const Navigation = () => {

  // Función de logout directo
  const handleLogout = (navigation) => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que querés cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Cerrar sesión"
              labelStyle={{ color: 'red', fontWeight: 'bold' }}
              onPress={() => handleLogout(props.navigation)}
            />
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="Ingredientes" component={IngredientScreen} />
        <Drawer.Screen name="Tortas" component={TortasScreen} />
        <Drawer.Screen name="Recetas" component={RecetaScreen} />
        <Drawer.Screen name="Ventas" component={VentaScreen} />
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEnabled: false,
          }}
        />
        <Drawer.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEnabled: false,
          }}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
