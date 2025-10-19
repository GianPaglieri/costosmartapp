import React from 'react';
import { View, Text } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const EmptyState = ({
  icon = 'information-circle-outline',
  title = 'Sin datos disponibles',
  message = 'Todavía no hay información para mostrar.',
  actionLabel,
  onAction,
}) => {
  const theme = useTheme();
  return (
    <View style={{
      paddingVertical: 20,
      paddingHorizontal: 12,
      alignItems: 'center',
    }}>
      <Ionicons name={icon} size={36} color={theme.colors.onSurfaceDisabled || '#999'} />
      <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '600', color: theme.colors.onSurface }}>
        {title}
      </Text>
      <Text style={{ marginTop: 4, fontSize: 13, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
        {message}
      </Text>
      {actionLabel && onAction ? (
        <Button mode="outlined" style={{ marginTop: 12 }} onPress={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
};

export default EmptyState;

