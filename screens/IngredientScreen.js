import React, { useState, useEffect, useCallback } from 'react';
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
import styles from '../components/styles';
import {
  fetchIngredientes,
  agregarIngrediente,
  editarIngrediente,
  borrarIngrediente
} from '../controllers/IngredientController';

const FieldLabel = ({ children }) => (
  <Text style={[styles.inputLabel, { marginBottom: 4 }]}>{children}</Text>
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
        style={{ marginHorizontal: 16, borderRadius: 8, backgroundColor: '#fff' }}
      >
        <View style={[styles.modalHeader, { marginBottom: 12 }]}>
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
            style={[styles.input, { marginBottom: 12 }]}
          />

          <FieldLabel>Unidad de medida</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. Gramos"
            value={local.unidad_Medida}
            onChangeText={t => handleChange('unidad_Medida', t)}
            style={[styles.input, { marginBottom: 12 }]}
          />

          <FieldLabel>Tamaño paquete</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 500"
            keyboardType="numeric"
            value={local.tamano_Paquete}
            onChangeText={t => handleChange('tamano_Paquete', t)}
            style={[styles.input, { marginBottom: 12 }]}
          />

          <FieldLabel>Precio / paquete</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 120.00"
            keyboardType="numeric"
            value={local.costo}
            onChangeText={t => handleChange('costo', t)}
            style={[styles.input, { marginBottom: 12 }]}
          />

          <FieldLabel>Stock disponible</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 10"
            keyboardType="numeric"
            value={local.CantidadStock}
            onChangeText={t => handleChange('CantidadStock', t)}
            style={[styles.input, { marginBottom: 16 }]}
          />
        </Dialog.Content>

        <Dialog.Actions style={{ justifyContent: 'space-between', paddingHorizontal: 8 }}>
          {/* Botón Eliminar */}
          <TouchableOpacity onPress={() => onDelete(local.id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="trash-outline" size={20} color="#dc3545" />
            <Text style={{ color: '#dc3545', marginLeft: 4 }}>Eliminar</Text>
          </TouchableOpacity>

          {/* Cancelar / Guardar */}
          <View style={{ flexDirection: 'row' }}>
            <Button mode="text" onPress={onDismiss} labelStyle={{ color: '#666' }}>
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={() => onSave({
                id: local.id,
                nombre: local.nombre,
                unidad_Medida: local.unidad_Medida,
                tamano_Paquete: parseFloat(local.tamano_Paquete),
                costo: parseFloat(local.costo),
                CantidadStock: parseInt(local.CantidadStock, 10),
              })}
              style={{ marginLeft: 8, backgroundColor: '#007bff' }}
            >
              Guardar
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

const AddIngredienteModal = React.memo(({ visible, onDismiss, onSave }) => {
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
        style={{ marginHorizontal: 16, borderRadius: 8, backgroundColor: '#fff' }}
      >
        <View style={[styles.modalHeader, { marginBottom: 12 }]}>
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
            style={[styles.input, { marginBottom: 12 }]}
          />

          <FieldLabel>Unidad de medida</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. Kilos"
            value={local.unidad_Medida}
            onChangeText={t => handleChange('unidad_Medida', t)}
            style={[styles.input, { marginBottom: 12 }]}
          />

          <FieldLabel>Tamaño paquete</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 200"
            keyboardType="numeric"
            value={local.tamano_Paquete}
            onChangeText={t => handleChange('tamano_Paquete', t)}
            style={[styles.input, { marginBottom: 12 }]}
          />

          <FieldLabel>Precio / paquete</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 120.00"
            keyboardType="numeric"
            value={local.costo}
            onChangeText={t => handleChange('costo', t)}
            style={[styles.input, { marginBottom: 12 }]}
          />

          <FieldLabel>Stock disponible</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. 10"
            keyboardType="numeric"
            value={local.CantidadStock}
            onChangeText={t => handleChange('CantidadStock', t)}
            style={[styles.input, { marginBottom: 16 }]}
          />
        </Dialog.Content>

        <Dialog.Actions style={{ justifyContent: 'flex-end', paddingHorizontal: 8 }}>
          <Button mode="text" onPress={onDismiss} labelStyle={{ color: '#666' }}>
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={() => onSave({
              nombre: local.nombre,
              unidad_Medida: local.unidad_Medida,
              tamano_Paquete: parseFloat(local.tamano_Paquete),
              costo: parseFloat(local.costo),
              CantidadStock: parseInt(local.CantidadStock, 10),
            })}
            style={{ marginLeft: 8, backgroundColor: '#007bff' }}
          >
            Guardar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default function IngredientScreen() {
  const [ingredientes, setIngredientes] = useState([]);
  const [addVisible, setAddVisible] = useState(false);
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

  const filtered = ingredientes.filter(i =>
    i.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async data => {
    await agregarIngrediente(data);
    setAddVisible(false);
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
        style={[styles.searchInput, { marginBottom: 16 }]}
      />

 <TouchableOpacity
        style={[styles.botonAgregarIngrediente, { marginBottom: 12 }]}
        onPress={() => setAddVisible(true)}
      >
       
        <Text style={styles.botonAgregarTexto}>Agregar Ingrediente</Text>
      </TouchableOpacity>
      <FlatList
  data={filtered}
  keyExtractor={i => i.id.toString()}
  renderItem={({ item }) => (
    <Card style={[styles.card, { padding: 16 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Datos */}
        <View style={{ flex: 1, marginRight: 12 }}>
          {/* Nombre */}
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 4 }}>
            {item.nombre}
          </Text>
          {/* Unidad + Tamaño */}
          <Text style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
            <Ionicons name="cube-outline" size={14} color="#555" />{' '}
            {item.tamano_Paquete} {item.unidad_Medida}
          </Text>
          {/* Precio + Stock */}
          <Text style={{ fontSize: 14, color: '#555' }}>
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
  ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
  contentContainerStyle={{ paddingBottom: 32 }}
/>

      <AddIngredienteModal
        visible={addVisible}
        onDismiss={() => setAddVisible(false)}
        onSave={handleAdd}
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
