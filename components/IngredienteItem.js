import React from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const formatCurrency = (value) => {
  if (value === undefined || value === null) {
    return '$ 0';
  }
  const number = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
  if (Number.isNaN(number)) {
    return '$ 0';
  }
  try {
    return `$ ${new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(number))}`;
  } catch (error) {
    return `$ ${Math.round(number).toFixed(0)}`;
  }
};

const IngredienteItem = ({
  item,
  ingredientes,
  loading,
  originalValue,
  onChangeCantidad,
  onConfirmUpdate,
  onDelete,
}) => {
  const ingredienteInfo = ingredientes.find(i => i.id === item.ID_INGREDIENTE);
  const showCheck =
    item.total_cantidad.trim() !== '' && item.total_cantidad !== originalValue;

  const cantidadNumero = parseFloat(item.total_cantidad) || 0;
  const unitCost = Number(item.unit_cost ?? item.unitCost ?? 0);
  const subtotal = Number(item.subtotal_cost ?? item.subtotalCost ?? unitCost * cantidadNumero);

  return (
    <View style={styles.ingredienteItem}>
      <View style={styles.ingredienteHeaderRow}>
        <Text style={styles.ingredienteNombre}>
          {ingredienteInfo?.nombre || item.Nombre || 'Ingrediente no disponible'}
        </Text>
        <TouchableOpacity onPress={() => onDelete(item.ID_INGREDIENTE)} disabled={loading}>
          <Ionicons name="trash-outline" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>

      <View style={styles.ingredienteMetaRow}>
        <View style={styles.ingredienteCantidadWrapper}>
          <TextInput
            style={styles.cantidadInput}
            value={item.total_cantidad}
            onChangeText={(text) => onChangeCantidad(item.ID_INGREDIENTE, text)}
            keyboardType="numeric"
            placeholder="Cant."
            editable={!loading}
          />
          {showCheck && (
            <Pressable onPress={() => onConfirmUpdate(item)} style={{ marginLeft: 8 }}>
              <Ionicons name="checkmark-circle" size={24} color="#28a745" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.ingredienteCostosRow}>
        <Text style={styles.ingredienteCostoLabel}>
          Costo unitario:{' '}
          <Text style={styles.ingredienteCostoValor}>{formatCurrency(unitCost)}</Text>
        </Text>
        <Text style={styles.ingredienteCostoLabel}>
          Subtotal:{' '}
          <Text style={styles.ingredienteCostoSubtotal}>{formatCurrency(subtotal)}</Text>
        </Text>
      </View>
    </View>
  );
};

export default IngredienteItem;
