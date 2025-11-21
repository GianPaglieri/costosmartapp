import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import { Avatar, Card, Title, Paragraph, TextInput, Button, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import UserController from '../controllers/UserController';

const InfoRow = ({ label, value }) => {
  const theme = useTheme();
  if (!value) {
    return null;
  }
  return (
    <View style={styles.infoRow}>
      <Paragraph style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>{label}</Paragraph>
      <Paragraph style={styles.infoValue}>{value}</Paragraph>
    </View>
  );
};

const ProfileScreen = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const initials = (user?.nombre || user?.name || user?.email || 'US').slice(0, 2).toUpperCase();
  const accountDetails = [{ label: 'Correo electrónico', value: user?.email }].filter((item) => item.value);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Campos incompletos', 'Completá todos los campos.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'La nueva contraseña y su confirmación deben coincidir.');
      return;
    }

    setLoading(true);
    try {
      await UserController.changePassword({ currentPassword, newPassword });
      Alert.alert('Listo', 'Contraseña actualizada correctamente.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      const userMessage = error?.message || error?.userMessage || 'No se pudo actualizar la contraseña.';
      Alert.alert('Error', userMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <View style={styles.identityRow}>
            <Avatar.Text size={56} label={initials} style={{ backgroundColor: theme.colors.primary }} color="#fff" />
            <View style={styles.identityInfo}>
              <Title style={[styles.title, { marginBottom: 4 }]}>{user?.nombre || user?.name || 'Usuario'}</Title>
              <Paragraph style={[styles.identityDetail, { color: theme.colors.onSurfaceVariant }]}>
                {user?.email || 'Cuenta activa'}
              </Paragraph>
            </View>
          </View>

          <View style={styles.tagRow}>
            <View style={styles.roleChip}>
              <Ionicons name="shield-checkmark-outline" size={14} color="#fff" />
              <Text style={styles.roleChipText}>{user?.role || 'Administrador'}</Text>
            </View>
            <View style={styles.statusChip}>
              <Ionicons name="checkmark-circle-outline" size={14} color="#15803d" />
              <Text style={styles.statusChipText}>Cuenta activa</Text>
            </View>
          </View>

          {accountDetails.length > 0 ? (
            <>
              <View style={styles.sectionDivider} />
              <Title style={styles.sectionTitle}>Datos de contacto</Title>
              {accountDetails.map((item) => (
                <InfoRow key={item.label} label={item.label} value={item.value} />
              ))}
            </>
          ) : null}
        </Card.Content>
      </Card>

      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Cambiar contraseña</Title>
          <Paragraph style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            Ingresá tu contraseña actual y la nueva para actualizarla desde la app.
          </Paragraph>
          <TextInput
            mode="outlined"
            label="Contraseña actual"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={{ marginBottom: 12 }}
          />
          <TextInput
            mode="outlined"
            label="Nueva contraseña"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={{ marginBottom: 12 }}
          />
          <TextInput
            mode="outlined"
            label="Confirmar nueva contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={{ marginBottom: 16 }}
          />
          <Button mode="contained" onPress={handleChangePassword} loading={loading} disabled={loading}>
            Actualizar contraseña
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 16,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  identityInfo: {
    marginLeft: 12,
    flex: 1,
  },
  identityDetail: {
    fontSize: 13,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  roleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#0f172a',
  },
  roleChipText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(22,163,74,0.15)',
  },
  statusChipText: {
    color: '#15803d',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  sectionDivider: {
    height: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
