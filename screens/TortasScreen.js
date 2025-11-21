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
import { Card, Portal, Dialog, TextInput, Button, IconButton, useTheme, HelperText, Divider } from 'react-native-paper';
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

const resolveImageUri = (value) => {
  if (!value) return null;
  const uri = String(value);
  if (uri.startsWith('http') || uri.startsWith('file://')) return uri;
  return `${API_URL}/${uri.replace(/^\/+/, '')}`;
};

const EditTortaModal = React.memo(({ visible, onDismiss, torta, onSave, onDelete }) => {
  const [local, setLocal] = useState({
    ID_TORTA: null,
    nombre_torta: '',
    descripcion_torta: '',
    porcentaje_ganancia: '0',
    imagen: '',
    removedImage: false,
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
        imagen: resolveImageUri(torta.imagen) || '',
        removedImage: false,
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
      setLocal(prev => ({ ...prev, imagen: res.assets[0].uri, removedImage: false }));
    }
  }, []);

  const removeImage = useCallback(() => setLocal(prev => ({ ...prev, imagen: '', removedImage: true })), []);

  const handleVerReceta = () => {
    onDismiss();
    setTimeout(() => {
      navigation.navigate('Recetas', { recetaTortaId: torta.ID_TORTA });
    }, 300);
  };

  const handleMarginAdjust = (delta) => {
    setLocal((prev) => {
      const current = parsePercentValue(prev.porcentaje_ganancia);
      const base = Number.isNaN(current) ? 0 : current;
      const next = Math.max(0, base + delta);
      return { ...prev, porcentaje_ganancia: String(next) };
    });
    setTouched((prev) => ({ ...prev, margen: true }));
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
  const hasLocalImage = Boolean(local.imagen);
  const resolvedImage = hasLocalImage
    ? resolveImageUri(local.imagen)
    : local.removedImage
      ? null
      : resolveImageUri(torta?.imagen);

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
                <View style={tStyles.modalSummarySection}>
                  <Text style={tStyles.modalSectionLabel}>Resumen</Text>
                  <View style={tStyles.modalSummaryCard}>
                    <View style={tStyles.modalSummaryContent}>
                      <Text style={tStyles.modalSummaryTitle}>{local.nombre_torta || 'Torta sin nombre'}</Text>
                      <Text style={tStyles.modalSummaryMeta}>ID {local.ID_TORTA ?? '--'}</Text>
                      <Text style={tStyles.modalSummaryMeta}>Margen actual: {local.porcentaje_ganancia || '0'}%</Text>
                    </View>
                    {resolvedImage ? (
                      <Image source={{ uri: resolvedImage }} style={tStyles.modalSummaryImage} />
                    ) : null}
                  </View>
                  <View style={tStyles.modalQuickRow}>
                    <View style={tStyles.modalQuickCard}>
                      <Text style={tStyles.modalQuickLabel}>Costo total</Text>
                      <Text style={tStyles.modalQuickValue}>
                        {costoTotal !== null ? formatCurrency(costoTotal) : '--'}
                      </Text>
                    </View>
                    <View style={tStyles.modalQuickCard}>
                      <Text style={tStyles.modalQuickLabel}>Precio lista</Text>
                      <Text style={tStyles.modalQuickValue}>
                        {precioActual !== null ? formatCurrency(precioActual) : '--'}
                      </Text>
                    </View>
                  </View>
                  {previewPrecio !== null ? (
                    <View style={[tStyles.modalQuickCard, tStyles.modalQuickHighlight]}>
                      <Text style={tStyles.modalQuickLabel}>Nuevo precio estimado</Text>
                      <Text style={tStyles.modalQuickValue}>{formatCurrency(previewPrecio)}</Text>
                    </View>
                  ) : null}
                  <Button
                    mode="text"
                    icon="book-open-variant"
                    textColor="#0f172a"
                    onPress={handleVerReceta}
                    style={tStyles.summaryLink}
                  >
                    Ver receta vinculada
                  </Button>
                </View>

                <Text style={tStyles.modalSectionLabel}>Actualizaciones rapidas</Text>
                <View style={tStyles.quickAdjustRow}>
                  {[5, 10].map((value) => (
                    <Pressable
                      key={`inc-${value}`}
                      onPress={() => handleMarginAdjust(value)}
                      style={tStyles.quickAdjustButton}
                    >
                      <Text style={tStyles.quickAdjustText}>+{value}%</Text>
                    </Pressable>
                  ))}
                  <Pressable
                    key="dec-5"
                    onPress={() => handleMarginAdjust(-5)}
                    style={[tStyles.quickAdjustButton, tStyles.quickAdjustNegative]}
                  >
                    <Text style={[tStyles.quickAdjustText, { color: '#b91c1c' }]}>-5%</Text>
                  </Pressable>
                </View>

                <Text style={tStyles.modalSectionLabel}>Datos básicos</Text>
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

                <Text style={tStyles.modalSectionLabel}>Margen y precios</Text>
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
                ) : (
                  <Text style={tStyles.modalHint}>
                    El precio final se recalcula automaticamente con el margen indicado.
                  </Text>
                )}

                <Divider style={{ marginVertical: 12 }} />
                <Text style={tStyles.modalSectionLabel}>Imagen</Text>
                <View style={tStyles.imageContainer}>
                  {resolvedImage ? (
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        source={{ uri: resolvedImage }}
                        style={tStyles.previewImageLarge}
                        resizeMode="cover"
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

        <Dialog.Actions style={tStyles.actionsColumn}>
          <Button
            mode="text"
            icon="trash-can-outline"
            textColor="#dc2626"
            onPress={() => onDelete(local.ID_TORTA)}
            contentStyle={tStyles.destructiveButtonContent}
            style={tStyles.destructiveButton}
          >
            Eliminar torta
          </Button>
          <View style={tStyles.footerActions}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              textColor="#0f172a"
              style={tStyles.outlinedButton}
            >
              Cancelar
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
  const resolvedImage = resolveImageUri(local.imagen);

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
                {resolvedImage ? (
                  <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: resolvedImage }} style={tStyles.previewImageLarge} resizeMode="cover" />
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
      <View style={tStyles.topBar}>
        <View style={{ flex: 1 }}>
          <Text style={tStyles.screenTitle}>Tortas</Text>
          <Text style={tStyles.screenSubtitle}>{tortas.length} registradas</Text>
        </View>
        <View style={tStyles.topActions}>
          <IconButton
            icon={searchOpen ? 'close' : 'magnify'}
            size={20}
            style={tStyles.iconButton}
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
          <Button
            icon="plus"
            mode="contained"
            onPress={() => {
              setCurrent({ ID_TORTA: null, nombre_torta: '', descripcion_torta: '', imagen: '' });
              setAddVisible(true);
            }}
            contentStyle={{ flexDirection: 'row-reverse' }}
            style={tStyles.addButton}
          >
            Nueva
          </Button>
        </View>
      </View>
      {searchOpen && (
        <TextInput
          placeholder="Buscar torta..."
          value={searchRaw}
          onChangeText={setSearchRaw}
          mode="outlined"
          left={<TextInput.Icon name="magnify" />}
          right={searchRaw ? <TextInput.Icon name="close" onPress={() => { setSearchRaw(''); }} /> : null}
          style={tStyles.searchInput}
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
          ItemSeparatorComponent={() => <View style={tStyles.separator} />}
          renderItem={({ item }) => {
            const costo = parseFloat(String(item.costo_total ?? item.precio ?? 0)) || 0;
            const precioLista = parseFloat(String(item.precio_lista ?? item.precio ?? item.costo_total ?? 0)) || costo;
            const margenValor = parsePercentValue(item.porcentaje_ganancia);
            const margenDisplay = Number.isNaN(margenValor) ? 0 : margenValor;
            const diff = precioLista - costo;
            const severity = margenDisplay >= 30 ? 'ok' : margenDisplay >= 15 ? 'warn' : 'danger';
            const borderColor =
              severity === 'ok' ? '#22c55e' : severity === 'warn' ? '#f59e0b' : '#ef4444';

            return (
              <Card style={[tStyles.listCard, { borderLeftColor: borderColor }]}>
                <View style={tStyles.listRow}>
                  <View style={tStyles.listInfo}>
                    <Text style={tStyles.listName}>{item.nombre_torta}</Text>
                    <Text style={tStyles.listMeta}>
                      {formatCurrency(costo)} costo • {formatCurrency(precioLista)} lista
                    </Text>
                  </View>
                  <View style={tStyles.listRight}>
                    <View
                      style={[
                        tStyles.marginPill,
                        severity === 'ok'
                          ? tStyles.marginPillOk
                          : severity === 'warn'
                            ? tStyles.marginPillWarn
                            : tStyles.marginPillDanger,
                      ]}
                    >
                      <Ionicons
                        name={
                          severity === 'ok'
                            ? 'trending-up-outline'
                            : severity === 'warn'
                              ? 'remove-outline'
                              : 'warning-outline'
                        }
                        size={13}
                        color={
                          severity === 'ok'
                            ? '#166534'
                            : severity === 'warn'
                              ? '#92400e'
                              : '#b91c1c'
                        }
                      />
                      <Text style={tStyles.marginPillText}>{margenDisplay}%</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrent(item);
                        setEditVisible(true);
                      }}
                      style={tStyles.editLink}
                    >
                      <Ionicons name="create-outline" size={14} color="#0f172a" />
                      <Text style={tStyles.editLinkText}>Editar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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






