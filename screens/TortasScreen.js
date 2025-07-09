import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Pressable, Alert, Image
} from 'react-native';
import { Card, Portal, Dialog, TextInput, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import styles, { tortaStyles as tStyles } from '../components/styles';
import {
  fetchTortas,
  agregarTorta,
  editarTorta,
  borrarTorta
} from '../controllers/TortaController';

const BASE_URL = 'http://149.50.131.253/api';
const PRIMARY_BLUE = '#007bff';

const FieldLabel = ({ children }) => (
  <Text style={[styles.inputLabel, tStyles.fieldLabel]}>{children}</Text>
);

const EditTortaModal = React.memo(({ visible, onDismiss, torta, onSave, onDelete }) => {
  const [local, setLocal] = useState({ ID_TORTA: null, nombre_torta: '', descripcion_torta: '', imagen: '' });
  const navigation = useNavigation();

  useEffect(() => {
    if (visible && torta) {
      setLocal({
        ID_TORTA: torta.ID_TORTA,
        nombre_torta: torta.nombre_torta,
        descripcion_torta: torta.descripcion_torta,
        imagen: torta.imagen ? `${BASE_URL}/${torta.imagen}` : '',
      });
    }
  }, [visible, torta]);

  const handleChange = useCallback((f, v) => setLocal(p => ({ ...p, [f]: v })), []);

  const pickImage = useCallback(async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Permiso denegado', 'Necesitas permiso para la galería.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
    if (!res.canceled && res.assets?.length) {
      setLocal(p => ({ ...p, imagen: res.assets[0].uri }));
    }
  }, []);

  const removeImage = useCallback(() => setLocal(p => ({ ...p, imagen: '' })), []);

  const handleVerReceta = () => {
    onDismiss();
    setTimeout(() => {
      navigation.navigate('Recetas', { recetaTortaId: torta.ID_TORTA });
    }, 300);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={tStyles.dialog}
      >
        <View style={[styles.modalHeader, tStyles.modalHeaderMargin]}>
          <Text style={styles.modalTitle}>Editar Torta</Text>
          <Pressable onPress={onDismiss} hitSlop={10}>
            <Ionicons name="close-circle" size={24} color="#666" />
          </Pressable>
        </View>

        <Dialog.Content>
          <FieldLabel>Nombre</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. Torta de chocolate"
            value={local.nombre_torta}
            onChangeText={t => handleChange('nombre_torta', t)}
            style={[styles.input, tStyles.mb12, { backgroundColor: '#fff' }]}
          />
          <FieldLabel>Descripción</FieldLabel>
          <TextInput
            mode="outlined"
            placeholder="Ej. Deliciosa y húmeda"
            multiline
            value={local.descripcion_torta}
            onChangeText={t => handleChange('descripcion_torta', t)}
            style={[styles.input, { minHeight: 80, backgroundColor: '#fff' }, tStyles.mb12]}
          />
          <FieldLabel>Imagen</FieldLabel>
          <View style={tStyles.imageContainer}>
            {local.imagen ? (
              <>
                <Image
                  source={{ uri: local.imagen }}
                  style={tStyles.previewImage}
                />
                <View style={tStyles.imageActions}>
                  <TouchableOpacity onPress={pickImage} style={tStyles.actionButton}>
                    <Ionicons name="image-outline" size={24} color={PRIMARY_BLUE} />
                    <Text style={tStyles.actionTextBlue}>Cambiar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={removeImage} style={tStyles.actionButton}>
                    <Ionicons name="trash-outline" size={24} color="#dc3545" />
                    <Text style={tStyles.actionTextDelete}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <TouchableOpacity onPress={pickImage} style={tStyles.actionButton}>
                <Ionicons name="image-outline" size={32} color={PRIMARY_BLUE} />
                <Text style={tStyles.uploadText}>Subir imagen</Text>
              </TouchableOpacity>
            )}
          </View>
        </Dialog.Content>

        <Dialog.Actions style={tStyles.modalActionsBetween}>
          <TouchableOpacity onPress={() => onDelete(local.ID_TORTA)} style={tStyles.rowCenter}>
            <Ionicons name="trash-outline" size={20} color="#dc3545" />
            <Text style={tStyles.deleteLabel}>Eliminar</Text>
          </TouchableOpacity>
          <View style={tStyles.row}>
            <Button onPress={handleVerReceta} style={tStyles.viewRecipeButton}>
              <Text style={tStyles.whiteText}>Ver Receta</Text>
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                if (!local.nombre_torta.trim() || !local.descripcion_torta.trim()) {
                  Alert.alert('Error', 'Nombre y descripción son obligatorios');
                  return;
                }
                onSave(local);
              }}
              style={tStyles.primaryButton}
              labelStyle={{ color: '#fff' }}
            >
              Guardar
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default function TortaScreen() {
  const [tortas, setTortas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const load = useCallback(async () => {
    const data = await fetchTortas();
    setTortas(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    setFiltered(tortas.filter(t => t.nombre_torta.toLowerCase().includes(search.toLowerCase())));
  }, [tortas, search]);

  useEffect(() => {
    if (route.params?.editTortaId && tortas.length > 0) {
      const t = tortas.find(t => t.ID_TORTA === route.params.editTortaId);
      if (t) {
        setCurrent(t);
        setEditVisible(true);
      }
    }
  }, [route.params, tortas]);

  const handleAdd = async d => {
    if (!d.nombre_torta.trim() || !d.descripcion_torta.trim()) {
      Alert.alert('Error', 'Nombre y descripción son obligatorios');
      return;
    }
    const f = new FormData();
    f.append('nombre_torta', d.nombre_torta);
    f.append('descripcion_torta', d.descripcion_torta);
    if (d.imagen) {
      const name = d.imagen.split('/').pop(), type = name.split('.').pop();
      f.append('imagen', { uri: d.imagen, name, type: `image/${type}` });
    }
    await agregarTorta(f);
    setAddVisible(false);
    load();
  };

  const handleEdit = async d => {
    const f = new FormData();
    f.append('ID_TORTA', d.ID_TORTA);
    f.append('nombre_torta', d.nombre_torta);
    f.append('descripcion_torta', d.descripcion_torta);
    if (d.imagen && !d.imagen.startsWith(BASE_URL)) {
      const name = d.imagen.split('/').pop(), type = name.split('.').pop();
      f.append('imagen', { uri: d.imagen, name, type: `image/${type}` });
    }
    await editarTorta(d.ID_TORTA, f);
    setEditVisible(false);
    load();
  };

  const handleDelete = async id => {
    await borrarTorta(id);
    setEditVisible(false);
    load();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heroTitle}>Gestión de Tortas</Text>
      <TextInput
        label="Buscar Torta"
        value={search}
        onChangeText={setSearch}
        mode="outlined"
        style={[styles.searchInput, tStyles.mb12]}
      />
      <TouchableOpacity
        style={[styles.botonAgregarIngrediente, tStyles.mb12]}
        onPress={() => setAddVisible(true)}
      >
        <Text style={styles.botonAgregarTexto}>Agregar Torta</Text>
      </TouchableOpacity>

      {filtered.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="pizza-outline" size={72} color="#ccc" style={{ marginBottom: 16 }} />
          <Text style={styles.heroSubtitle}>No hay tortas registradas</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.ID_TORTA.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <Card style={[styles.card, tStyles.cardMargin]}>
              <Card.Content>
                <View style={tStyles.cardRow}>
                  <View style={tStyles.flex1}>
                    <Text style={styles.cardTitle}>{item.nombre_torta}</Text>
                    <Text style={styles.cardText}>{item.descripcion_torta}</Text>
                  </View>
                  <Pressable onPress={() => { setCurrent(item); setEditVisible(true); }}>
                    <Text style={styles.seccionLink}>Editar</Text>
                  </Pressable>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      )}

      <EditTortaModal
        visible={editVisible}
        onDismiss={() => setEditVisible(false)}
        torta={current}
        onSave={handleEdit}
        onDelete={handleDelete}
      />
    </View>
  );
}
