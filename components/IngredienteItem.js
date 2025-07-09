import React from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const IngredienteItem = ({ item, ingredientes, loading, originalValue, onChangeCantidad, onConfirmUpdate, onDelete }) => {
  const ingredienteInfo = ingredientes.find(i => i.id === item.ID_INGREDIENTE);
  const showCheck =
    item.total_cantidad.trim() !== '' && item.total_cantidad !== originalValue;

  return (
    <View style={styles.ingredienteItem}>
      <Text style={styles.ingredienteNombre}>
        {ingredienteInfo?.nombre || 'Ingrediente no disponible'}
      </Text>
      <TextInput
        style={styles.cantidadInput}
        value={item.total_cantidad}
        onChangeText={text => onChangeCantidad(item.ID_INGREDIENTE, text)}
        keyboardType="numeric"
        placeholder="Cant."
        editable={!loading}
      />
      {showCheck && (
        <Pressable onPress={() => onConfirmUpdate(item)}>
          <Ionicons name="checkmark-circle" size={24} color="#28a745" style={{ marginLeft: 8 }} />
        </Pressable>
      )}
      <TouchableOpacity
        onPress={() => onDelete(item.ID_INGREDIENTE)}
        disabled={loading}
        style={{ marginLeft: 10 }}
      >
        <Ionicons name="trash-outline" size={20} color="#dc3545" />
      </TouchableOpacity>
    </View>
  );
};

export default IngredienteItem;
