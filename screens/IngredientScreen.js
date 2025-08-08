import React, { useState, useEffect, useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert
} from 'react-native';
import { Card, Portal, Dialog, TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles, { ingredientStyles as ingStyles } from '../components/styles';
import CreateIngredientModal from '../components/CreateIngredientModal';
import {
  fetchIngredientes,
  agregarIngrediente,
  editarIngrediente,
  borrarIngrediente
} from '../controllers/IngredientController';

const FieldLabel = ({ children }) => (
  <Text style={[styles.inputLabel, ingStyles.mb4]}>{children}</Text>
);

const EditIngredienteModal = React.memo(({ visible, onDismiss, ingrediente, onSave, onDelete }) => {
  const [local, setLocal] = useState({
    id: null,
    nombre: '',
    unidad_Medida: '',
    tamano_Paquete: '',
    costo: '',
    CantidadStock: '',
  });

  useEffect(() => {
    if (visible && ingrediente) {
      setLocal({
        id: ingrediente.id,
        nombre: ingrediente.nombre,
        unidad_Medida: ingrediente.unidad_Medida,
        tamano_Paquete: ingrediente.tamano_Paquete.toString(),
        costo: ingrediente.costo.toString(),
        CantidadStock: ingrediente.CantidadStock.toString(),
      });
    }
  }, [visible, ingrediente]);

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
          <Text style={styles.modalTitle}>Editar Ingrediente</Text>
          <Pressable onPress={onDismiss} hitSlop={10}>
            <Ionicons name="close-circle" size={24} color="#666" />
          </Pressable>
        </View>
        <Dialog.Content>
          <FieldLabel>Nombre</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. Harina"
            value={local.nombre}
            onChangeText={t => handleChange('nombre', t)}
            style={[styles.input, ingStyles.mb12]}
          />

          <FieldLabel>Unidad de medida</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. Gramos"
            value={local.unidad_Medida}
            onChangeText={t => handleChange('unidad_Medida', t)}
            style={[styles.input, ingStyles.mb12]}
          />

          <FieldLabel>Tamaño paquete</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 500"
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

        <Dialog.Actions style={ingStyles.modalActionsBetween}>
          {/* Botón Eliminar */}
          <TouchableOpacity onPress={() => onDelete(local.id)} style={ingStyles.rowCenter}>
            <Ionicons name="trash-outline" size={20} color="#dc3545" />
            <Text style={ingStyles.deleteLabel}>Eliminar</Text>
          </TouchableOpacity>

          {/* Cancelar / Guardar */}
          <View style={ingStyles.row}>
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
                  id: local.id,
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
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default function IngredientScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [ingredientes, setIngredientes] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await fetchIngredientes();
      setIngredientes(data);
    } catch {
      Alert.alert('Error', 'No se pudieron cargar ingredientes');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Si navega desde Recetas con el flag openAdd, mostrar el modal al abrir
  useEffect(() => {
    if (route.params?.openAdd) {
      setCreateVisible(true);
      navigation.setParams({ openAdd: false });
    }
  }, [route.params]);

  const filtered = ingredientes.filter(i =>
    i.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async data => {
    await agregarIngrediente(data);
    setCreateVisible(false);
    load();
  };

  const handleEdit = async data => {
    await editarIngrediente(data);
    setEditVisible(false);
    load();
  };

  const handleDelete = async id => {
    await borrarIngrediente(id);
    setEditVisible(false);
    load();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heroTitle}>Gestión de Ingredientes</Text>

      <TextInput
        placeholder="Buscar Ingrediente"
        value={search}
        onChangeText={setSearch}
        mode="outlined"
        left={<TextInput.Icon name="magnify" />}
        style={[styles.searchInput, ingStyles.mb16]}
      />

 <TouchableOpacity
        style={[styles.botonAgregarIngrediente, ingStyles.mb12]}
        onPress={() => setCreateVisible(true)}
      >
       
        <Text style={styles.botonAgregarTexto}>Agregar Ingrediente</Text>
      </TouchableOpacity>
      <FlatList
  data={filtered}
  keyExtractor={i => i.id.toString()}
  renderItem={({ item }) => (
    <Card style={[styles.card, ingStyles.cardPadding]}>
      <View style={ingStyles.cardRow}>
        {/* Datos */}
        <View style={ingStyles.cardInfo}>
          {/* Nombre */}
          <Text style={ingStyles.ingredientName}>
            {item.nombre}
          </Text>
          {/* Unidad + Tamaño */}
          <Text style={ingStyles.ingredientUnit}>
            <Ionicons name="cube-outline" size={14} color="#555" />{' '}
            {item.tamano_Paquete} {item.unidad_Medida}
          </Text>
          {/* Precio + Stock */}
          <Text style={ingStyles.ingredientPrice}>
            <Ionicons name="pricetag-outline" size={14} color="#555" />{' '}
            ${parseFloat(item.costo).toFixed(2)}{'   '}
            <Ionicons name="layers-outline" size={14} color="#555" />{' '}
            Stock: {item.CantidadStock}
          </Text>
        </View>
        {/* Botón Editar */}
        <TouchableOpacity
          onPress={() => { setSelected(item); setEditVisible(true); }}
          style={styles.editButton}
        >
          <Text style={styles.seccionLink}>Editar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  )}
  ItemSeparatorComponent={() => <View style={ingStyles.separator} />}
  contentContainerStyle={{ paddingBottom: 32 }}
/>

      <CreateIngredientModal
        visible={createVisible}
        onDismiss={() => setCreateVisible(false)}
        onSave={handleCreate}
      />
      <EditIngredienteModal
        visible={editVisible}
        onDismiss={() => setEditVisible(false)}
        ingrediente={selected}
        onSave={handleEdit}
        onDelete={handleDelete}
      />
    </View>
  );
}
