import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { Portal, Dialog, TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles, { ingredientStyles as ingStyles } from './styles';

const FieldLabel = ({ children }) => (
  <Text style={[styles.inputLabel, ingStyles.mb4]}>{children}</Text>
);

const CreateIngredientModal = React.memo(({ visible, onDismiss, onSave }) => {
  const [local, setLocal] = useState({
    nombre: '',
    unidad_Medida: '',
    tamano_Paquete: '',
    costo: '',
    CantidadStock: '',
  });

  useEffect(() => {
    if (visible) {
      setLocal({ nombre: '', unidad_Medida: '', tamano_Paquete: '', costo: '', CantidadStock: '' });
    }
  }, [visible]);

  const handleChange = useCallback((f, v) => {
    setLocal(p => ({ ...p, [f]: v }));
  }, []);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={ingStyles.dialog}
      >
        <View style={[styles.modalHeader, ingStyles.modalHeaderMargin]}>
          <Text style={styles.modalTitle}>Agregar Ingrediente</Text>
          <Pressable onPress={onDismiss} hitSlop={10}>
            <Ionicons name="close-circle" size={24} color="#666" />
          </Pressable>
        </View>
        <Dialog.Content>
          <FieldLabel>Nombre</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. Azúcar"
            value={local.nombre}
            onChangeText={t => handleChange('nombre', t)}
            style={[styles.input, ingStyles.mb12]}
          />

          <FieldLabel>Unidad de medida</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. Kilos"
            value={local.unidad_Medida}
            onChangeText={t => handleChange('unidad_Medida', t)}
            style={[styles.input, ingStyles.mb12]}
          />

          <FieldLabel>Tamaño paquete</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 200"
            keyboardType="numeric"
            value={local.tamano_Paquete}
            onChangeText={t => handleChange('tamano_Paquete', t)}
            style={[styles.input, ingStyles.mb12]}
          />

          <FieldLabel>Precio / paquete</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 120.00"
            keyboardType="numeric"
            value={local.costo}
            onChangeText={t => handleChange('costo', t)}
            style={[styles.input, ingStyles.mb12]}
          />

          <FieldLabel>Stock disponible</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 10"
            keyboardType="numeric"
            value={local.CantidadStock}
            onChangeText={t => handleChange('CantidadStock', t)}
            style={[styles.input, ingStyles.mb16]}
          />
        </Dialog.Content>

        <Dialog.Actions style={ingStyles.modalActionsEnd}>
          <Button mode="text" onPress={onDismiss} labelStyle={ingStyles.labelGray}>
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              if (
                !local.nombre.trim() ||
                !local.unidad_Medida.trim() ||
                !local.tamano_Paquete ||
                !local.costo ||
                !local.CantidadStock
              ) {
                Alert.alert('Error', 'Todos los campos son obligatorios');
                return;
              }
              onSave({
                nombre: local.nombre,
                unidad_Medida: local.unidad_Medida,
                tamano_Paquete: parseFloat(local.tamano_Paquete),
                costo: parseFloat(local.costo),
                CantidadStock: parseInt(local.CantidadStock, 10),
              });
            }}
            style={ingStyles.saveButton}
          >
            Guardar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default CreateIngredientModal;
