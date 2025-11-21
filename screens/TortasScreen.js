import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Card, Portal, Dialog, TextInput, Button, IconButton, Chip, FAB, useTheme, HelperText, Divider } from 'react-native-paper';
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
import { API_URL } from '../src/services/api';
const PRIMARY_BLUE = '#007bff';

const modalStyles = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
    borderRadius: 12,
  },
  content: {
    paddingBottom: 0,
  },
});

const FieldLabel = ({ children }) => (
  <Text style={[styles.inputLabel, tStyles.fieldLabel]}>{children}</Text>
);

const sanitizePercentInput = (value = '') => value.replace(/[^0-9.,]/g, '');

const parsePercentValue = (value) => {
  if (value === undefined || value === null || value === '') {
    return 0;
  }
  const normalized = String(value).replace(',', '.');
  const parsed = parseFloat(normalized);
  return Number.isNaN(parsed) ? NaN : parsed;
};

const formatCurrency = (value) => {
  if (value === undefined || value === null) {
    return '$ 0';
  }
  const number = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
  if (Number.isNaN(number)) {
    return '$ 0';
  }
  try {
    return `$ ${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(number))}`;
  } catch (error) {
    return `$ ${Math.round(number).toFixed(0)}`;
  }
};

const EditTortaModal = React.memo(({ visible, onDismiss, torta, onSave, onDelete }) => {
  const [local, setLocal] = useState({
    ID_TORTA: null,
    nombre_torta: '',
    descripcion_torta: '',
    porcentaje_ganancia: '0',
    imagen: '',
  });
  const [touched, setTouched] = useState({ nombre: false, desc: false, margen: false });
  const navigation = useNavigation();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    if (visible && torta) {
      setLocal({
        ID_TORTA: torta.ID_TORTA,
        nombre_torta: torta.nombre_torta || '',
        descripcion_torta: torta.descripcion_torta || '',
        porcentaje_ganancia:
          torta.porcentaje_ganancia !== undefined && torta.porcentaje_ganancia !== null
            ? String(torta.porcentaje_ganancia)
            : '0',
        imagen: torta.imagen ? `${API_URL}/${torta.imagen}` : '',
      });
      setTouched({ nombre: false, desc: false, margen: false });
    }
  }, [visible, torta]);

  const handleChange = useCallback((field, value) => {
    setLocal(prev => ({
      ...prev,
      [field]: field === 'porcentaje_ganancia' ? sanitizePercentInput(value) : value,
    }));
  }, []);

  const pickImage = useCallback(async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Permiso denegado', 'Necesitas permiso para la galeria.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
    if (!res.canceled && res.assets?.length) {
      setLocal(prev => ({ ...prev, imagen: res.assets[0].uri }));
    }
  }, []);

  const removeImage = useCallback(() => setLocal(prev => ({ ...prev, imagen: '' })), []);

  const handleVerReceta = () => {
    onDismiss();
    setTimeout(() => {
      navigation.navigate('Recetas', { recetaTortaId: torta.ID_TORTA });
    }, 300);
  };

  const marginValue = parsePercentValue(local.porcentaje_ganancia);
  const marginError = Number.isNaN(marginValue) || marginValue < 0;
  const canSave = local.nombre_torta.trim() && local.descripcion_torta.trim() && !marginError;

  const costoTotal = torta?.costo_total ?? null;
  const precioActual = torta?.precio_lista ?? torta?.precio ?? null;
  // only show preview price if the user actually edited the percentage
  const originalMarginRaw = torta?.porcentaje_ganancia !== undefined && torta?.porcentaje_ganancia !== null ? String(torta.porcentaje_ganancia) : '0';
  const userEditedMargin = String(local.porcentaje_ganancia) !== originalMarginRaw;
  const previewPrecio = !marginError && costoTotal !== null && userEditedMargin ? costoTotal * (1 + marginValue / 100) : null;

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[tStyles.dialog, modalStyles.dialog, { width: Math.min(screenWidth * 0.92, 520) }]}
      >
        <View style={[styles.modalHeader, tStyles.modalHeaderMargin, { position: 'relative' }] }>
          <Text style={[styles.modalTitle, { flex: 1, textAlign: 'center', fontSize: 18 }]}>Editar Torta</Text>
          <Pressable onPress={onDismiss} hitSlop={10} style={{ position: 'absolute', right: 12, top: 12 }}>
            <Ionicons name="close" size={20} color="#666" />
          </Pressable>
        </View>

        <Dialog.Content style={modalStyles.content}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={{ maxHeight: Math.min(screenHeight * 0.7, 520) }}>
              <ScrollView contentContainerStyle={{ paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
                <FieldLabel>Nombre</FieldLabel>
                <TextInput
                  mode="outlined"
                  placeholder="Ej. Deliciosa y humeda"
                  value={local.nombre_torta}
                  onChangeText={value => handleChange('nombre_torta', value)}
                  onBlur={() => setTouched(prev => ({ ...prev, nombre: true }))}
                  style={[styles.input, tStyles.mb12, { backgroundColor: '#fff' }]}
                  error={touched?.nombre && !local.nombre_torta.trim()}
                />
                {touched?.nombre && !local.nombre_torta.trim() ? (
                  <HelperText type="error">El nombre es obligatorio</HelperText>
                ) : null}

                <FieldLabel>Descripcion</FieldLabel>
                <TextInput
                  mode="outlined"
                  placeholder="Ej. Deliciosa y humeda"
                  multiline
                  value={local.descripcion_torta}
                  onChangeText={value => handleChange('descripcion_torta', value)}
                  onBlur={() => setTouched(prev => ({ ...prev, desc: true }))}
                  style={[styles.input, { minHeight: 80, backgroundColor: '#fff' }, tStyles.mb12]}
                  error={touched?.desc && !local.descripcion_torta.trim()}
                />
                {touched?.desc && !local.descripcion_torta.trim() ? (
                  <HelperText type="error">La descripcion es obligatoria</HelperText>
                ) : null}

                <FieldLabel>Porcentaje de ganancia (%)</FieldLabel>
                <TextInput
                  mode="outlined"
                  placeholder="Ej. 30"
                  keyboardType="decimal-pad"
                  value={local.porcentaje_ganancia}
                  onChangeText={value => handleChange('porcentaje_ganancia', value)}
                  onBlur={() => setTouched(prev => ({ ...prev, margen: true }))}
                  style={[styles.input, { backgroundColor: '#fff' }, tStyles.mb12]}
                  error={touched?.margen && marginError}
                />
                {touched?.margen && marginError ? (
                  <HelperText type="error">Ingresa un porcentaje valido</HelperText>
                ) : null}

                {costoTotal !== null ? (
                  <View style={{ backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, marginBottom: 12 }}>
                    <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Resumen de precios</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text style={{ color: '#475569' }}>Costo total</Text>
                      <Text style={{ fontWeight: '600' }}>{formatCurrency(costoTotal)}</Text>
                    </View>
                    {precioActual !== null ? (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text style={{ color: '#475569' }}>Precio lista actual</Text>
                        <Text style={{ fontWeight: '600' }}>{formatCurrency(precioActual)}</Text>
                      </View>
                    ) : null}
                    {previewPrecio !== null ? (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#475569' }}>Nuevo precio (previo)</Text>
                        <Text style={{ fontWeight: '700' }}>{formatCurrency(previewPrecio)}</Text>
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <Text style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>
                    El precio se calculara automaticamente cuando la receta tenga ingredientes.
                  </Text>
                )}

                <Divider style={{ marginVertical: 8 }} />
                <FieldLabel>Imagen</FieldLabel>
                <View style={tStyles.imageContainer}>
                  {local.imagen ? (
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        source={{ uri: local.imagen }}
                        style={[tStyles.previewImage, { maxHeight: 160, borderRadius: 8 }]}
                      />
                      <Button mode="text" textColor="#dc3545" onPress={removeImage}>
                        Quitar imagen
                      </Button>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={pickImage} style={tStyles.actionButton}>
                      <Ionicons name="image-outline" size={32} color={PRIMARY_BLUE} />
                      <Text style={tStyles.uploadText}>Subir imagen</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Dialog.Content>

        <Dialog.Actions style={[tStyles.modalActionsBetween, tStyles.actionsAlign]}>
          <Button
            mode="text"
            icon="trash-can-outline"
            textColor="#dc3545"
            compact
            onPress={() => onDelete(local.ID_TORTA)}
          >
            Eliminar
          </Button>
          <View style={tStyles.actionsRight}>
            <Button
              mode="outlined"
              icon="book-open-variant"
              onPress={handleVerReceta}
              style={tStyles.viewRecipeButton}
              textColor="#495057"
              compact
              contentStyle={tStyles.buttonContent}
            >
              Ver receta
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                const trimmedNombre = local.nombre_torta.trim();
                const trimmedDesc = local.descripcion_torta.trim();
                if (!trimmedNombre || !trimmedDesc) {
                  setTouched({ nombre: true, desc: true, margen: true });
                  Alert.alert('Error', 'Nombre y descripcion son obligatorios');
                  return;
                }
                if (marginError) {
                  setTouched(prev => ({ ...prev, margen: true }));
                  Alert.alert('Error', 'Ingresa un porcentaje de ganancia valido');
                  return;
                }
                onSave({ ...local, porcentaje_ganancia: marginValue });
              }}
              style={tStyles.primaryButton}
              buttonColor={PRIMARY_BLUE}
              compact
              contentStyle={tStyles.buttonContent}
              disabled={!canSave}
            >
              Guardar
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

// Modal para Agregar Torta con diseno coherente a Editar
// Modal para Agregar Torta con diseno coherente a Editar
const AddTortaModal = React.memo(({ visible, onDismiss, onSave }) => {
  const [local, setLocal] = useState({ nombre_torta: '', descripcion_torta: '', porcentaje_ganancia: '0', imagen: '' });
  const [touched, setTouched] = useState({ nombre: false, desc: false, margen: false });
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    if (visible) {
      setLocal({ nombre_torta: '', descripcion_torta: '', porcentaje_ganancia: '0', imagen: '' });
      setTouched({ nombre: false, desc: false, margen: false });
    }
  }, [visible]);

  const handleChange = useCallback((field, value) => {
    setLocal(prev => ({
      ...prev,
      [field]: field === 'porcentaje_ganancia' ? sanitizePercentInput(value) : value,
    }));
  }, []);

  const marginValue = parsePercentValue(local.porcentaje_ganancia);
  const marginError = Number.isNaN(marginValue) || marginValue < 0;
  const canSave = local.nombre_torta.trim() && local.descripcion_torta.trim() && !marginError;

  const pickImage = useCallback(async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Permiso denegado', 'Necesitas permiso para la galeria.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
    if (!res.canceled && res.assets?.length) {
      setLocal(prev => ({ ...prev, imagen: res.assets[0].uri }));
    }
  }, []);

  const removeImage = useCallback(() => setLocal(prev => ({ ...prev, imagen: '' })), []);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[tStyles.dialog, modalStyles.dialog, { width: Math.min(screenWidth * 0.92, 520) }] }
      >
        <View style={[styles.modalHeader, tStyles.modalHeaderMargin]}>
          <Text style={styles.modalTitle}>Agregar Torta</Text>
          <Pressable onPress={onDismiss} hitSlop={10}>
            <Ionicons name="close-circle" size={24} color="#666" />
          </Pressable>
        </View>
        <Dialog.Content style={modalStyles.content}>
          <View style={{ maxHeight: Math.min(screenHeight * 0.7, 520) }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
              <FieldLabel>Nombre</FieldLabel>
              <TextInput
                mode="outlined"
                placeholder="Ej. Deliciosa y humeda"
                value={local.nombre_torta}
                onChangeText={value => handleChange('nombre_torta', value)}
                onBlur={() => setTouched(prev => ({ ...prev, nombre: true }))}
                style={[styles.input, tStyles.mb12, { backgroundColor: '#fff' }]}
                error={touched?.nombre && !local.nombre_torta.trim()}
              />
              {touched?.nombre && !local.nombre_torta.trim() ? (
                <HelperText type="error">El nombre es obligatorio</HelperText>
              ) : null}

              <FieldLabel>Descripcion</FieldLabel>
              <TextInput
                mode="outlined"
                placeholder="Ej. Deliciosa y humeda"
                multiline
                value={local.descripcion_torta}
                onChangeText={value => handleChange('descripcion_torta', value)}
                onBlur={() => setTouched(prev => ({ ...prev, desc: true }))}
                style={[styles.input, { minHeight: 80, backgroundColor: '#fff' }, tStyles.mb12]}
                error={touched?.desc && !local.descripcion_torta.trim()}
              />
              {touched?.desc && !local.descripcion_torta.trim() ? (
                <HelperText type="error">La descripcion es obligatoria</HelperText>
              ) : null}

              <FieldLabel>Porcentaje de ganancia (%)</FieldLabel>
              <TextInput
                mode="outlined"
                placeholder="Ej. 30"
                keyboardType="decimal-pad"
                value={local.porcentaje_ganancia}
                onChangeText={value => handleChange('porcentaje_ganancia', value)}
                onBlur={() => setTouched(prev => ({ ...prev, margen: true }))}
                style={[styles.input, { backgroundColor: '#fff' }, tStyles.mb12]}
                error={touched?.margen && marginError}
              />
              {touched?.margen && marginError ? (
                <HelperText type="error">Ingresa un porcentaje valido</HelperText>
              ) : null}

              <Text style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>
                El costo y el precio final se calcularan automaticamente al guardar la torta.
              </Text>

              <Divider style={{ marginVertical: 8 }} />
              <FieldLabel>Imagen</FieldLabel>
              <View style={tStyles.imageContainer}>
                {local.imagen ? (
                  <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: local.imagen }} style={[tStyles.previewImage, { maxHeight: 160, borderRadius: 8 }]} />
                    <Button mode="text" textColor="#dc3545" onPress={removeImage}>
                      Quitar imagen
                    </Button>
                  </View>
                ) : (
                  <TouchableOpacity onPress={pickImage} style={tStyles.actionButton}>
                    <Ionicons name="image-outline" size={32} color={PRIMARY_BLUE} />
                    <Text style={tStyles.uploadText}>Subir imagen</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </Dialog.Content>
        <Dialog.Actions style={[tStyles.modalActionsBetween, tStyles.actionsAlign]}>
          <View style={tStyles.actionsRight}>
            <Button
              mode="text"
              onPress={onDismiss}
              textColor="#6b7280"
              compact
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              disabled={!canSave}
              onPress={() => {
                if (!local.nombre_torta.trim() || !local.descripcion_torta.trim()) {
                  setTouched({ nombre: true, desc: true, margen: true });
                  Alert.alert('Revisa los datos', 'Completa los campos obligatorios');
                  return;
                }
                if (marginError) {
                  setTouched(prev => ({ ...prev, margen: true }));
                  Alert.alert('Error', 'Ingresa un porcentaje de ganancia valido');
                  return;
                }
                onSave({ ...local, porcentaje_ganancia: marginValue });
              }}
              style={tStyles.primaryButton}
              buttonColor={PRIMARY_BLUE}
              compact
              contentStyle={tStyles.buttonContent}
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
  const [searchRaw, setSearchRaw] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const load = useCallback(async () => {
    const data = await fetchTortas();
    setTortas(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const term = (searchRaw || '').toLowerCase().trim();
    if (!term) {
      setFiltered([...tortas].sort((a, b) => String(a.nombre_torta).localeCompare(String(b.nombre_torta))));
      return;
    }

    const mapped = tortas
      .map((t) => {
        const name = (t.nombre_torta || '').toLowerCase();
        if (name === term) return { item: t, score: 0 };
        if (name.startsWith(term)) return { item: t, score: 1 };
        if (name.includes(term)) return { item: t, score: 2 };
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => (a.score - b.score) || String(a.item.nombre_torta).localeCompare(String(b.item.nombre_torta)));

    setFiltered(mapped.map(m => m.item));
  }, [tortas, searchRaw]);

  useEffect(() => {
    if (route.params?.editTortaId && tortas.length > 0) {
      const t = tortas.find(t => t.ID_TORTA === route.params.editTortaId);
      if (t) {
        setCurrent(t);
        setEditVisible(true);
      }
    }
  }, [route.params, tortas]);

  useEffect(() => {
    if (route.params?.openAdd) {
      setAddVisible(true);
      if (navigation.setParams) {
        navigation.setParams({ openAdd: false });
      }
    }
  }, [route.params, navigation]);

  const handleAdd = async d => {
    const nombre = (d.nombre_torta || '').trim();
    const descripcion = (d.descripcion_torta || '').trim();
    if (!nombre || !descripcion) {
      Alert.alert('Error', 'Nombre y descripcion son obligatorios');
      return;
    }

    const marginValue = parsePercentValue(d.porcentaje_ganancia);
    const safeMargin = Number.isNaN(marginValue) || marginValue < 0 ? 0 : marginValue;

    const f = new FormData();
    f.append('nombre_torta', nombre);
    f.append('descripcion_torta', descripcion);
    f.append('porcentaje_ganancia', safeMargin.toString());
    if (d.imagen) {
      const name = d.imagen.split('/').pop();
      const type = name.split('.').pop();
      f.append('imagen', { uri: d.imagen, name, type: `image/${type}` });
    }

    const response = await agregarTorta(f);
    if (!response?.success) {
      Alert.alert('Error', response?.error || 'No se pudo agregar la torta');
      return;
    }

    setAddVisible(false);
    load();
  };

  const handleEdit = async d => {
    const marginValue = parsePercentValue(d.porcentaje_ganancia);
    const safeMargin = Number.isNaN(marginValue) || marginValue < 0 ? 0 : marginValue;

    const f = new FormData();
    f.append('ID_TORTA', d.ID_TORTA);
    f.append('nombre_torta', d.nombre_torta);
    f.append('descripcion_torta', d.descripcion_torta);
    f.append('porcentaje_ganancia', safeMargin.toString());
    if (d.imagen && !d.imagen.startsWith(API_URL)) {
      const name = d.imagen.split('/').pop();
      const type = name.split('.').pop();
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#111', flex: 1 }}>Tortas</Text>
        <Chip mode="outlined" style={{ marginRight: 4 }}>{tortas.length} total</Chip>
        <IconButton icon="plus" onPress={() => { setCurrent({ ID_TORTA: null, nombre_torta: '', descripcion_torta: '', imagen: '' }); setAddVisible(true); }} accessibilityLabel="Agregar torta" />
        <IconButton
          icon={searchOpen ? 'close' : 'magnify'}
          onPress={() => {
            if (searchOpen) {
              setSearchRaw('');
              setSearchOpen(false);
            } else {
              setSearchOpen(true);
            }
          }}
          accessibilityLabel="Buscar"
        />
      </View>
      {searchOpen && (
        <TextInput
          placeholder="Buscar torta..."
          value={searchRaw}
          onChangeText={setSearchRaw}
          mode="outlined"
          left={<TextInput.Icon name="magnify" />}
          right={searchRaw ? <TextInput.Icon name="close" onPress={() => { setSearchRaw(''); }} /> : null}
          style={[tStyles.mb12]}
        />
      )}
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
          renderItem={({ item }) => {
            const costo = parseFloat(String(item.costo_total ?? item.precio ?? 0)) || 0;
            const precioLista = parseFloat(String(item.precio_lista ?? item.precio ?? item.costo_total ?? 0)) || costo;
            const margenValor = parsePercentValue(item.porcentaje_ganancia);
            const margenDisplay = Number.isNaN(margenValor) ? 0 : margenValor;

            return (
              <Card style={[styles.card, tStyles.cardMargin]}>
                <Card.Content>
                  <View style={tStyles.cardRow}>
                    <View style={tStyles.flex1}>
                      <Text style={styles.cardTitle}>{item.nombre_torta}</Text>
                      {item.descripcion_torta ? (
                        <Text style={styles.cardText}>{item.descripcion_torta}</Text>
                      ) : null}
                      <View style={{ marginTop: 8 }}>
                        <Text style={{ color: '#475569', fontSize: 13 }}>Margen: {margenDisplay}%</Text>
                        <Text style={{ color: '#475569', fontSize: 13, marginTop: 2 }}>Costo: {formatCurrency(costo)}</Text>
                        <Text style={{ color: '#1f2937', fontSize: 14, fontWeight: '600', marginTop: 2 }}>Precio lista: {formatCurrency(precioLista)}</Text>
                      </View>
                    </View>
                    <Pressable onPress={() => { setCurrent(item); setEditVisible(true); }}>
                      <Text style={styles.seccionLink}>Editar</Text>
                    </Pressable>
                  </View>
                </Card.Content>
              </Card>
            );
          }}
        />
      )}

      <AddTortaModal
        visible={addVisible}
        onDismiss={() => setAddVisible(false)}
        onSave={handleAdd}
      />

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






