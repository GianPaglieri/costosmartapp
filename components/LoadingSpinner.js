import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const LoadingSpinner = ({ 
  visible = true, 
  message = 'Cargando...', 
  size = 'large',
  color = null 
}) => {
  const theme = useTheme();
  
  if (!visible) return null;

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    }}>
      <ActivityIndicator 
        size={size} 
        color={color || theme.colors.primary} 
      />
      <Text style={{
        marginTop: 10,
        fontSize: 16,
        color: theme.colors.onSurface,
      }}>
        {message}
      </Text>
    </View>
  );
};

export default LoadingSpinner; 