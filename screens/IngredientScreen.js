import React, { useState, useEffect, useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Card,
  Portal,
  Dialog,
  TextInput,
  Button,
  Chip,
  IconButton,
  useTheme,
  HelperText,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles, { ingredientStyles as ingStyles } from '../components/styles';
import {
  fetchIngredientes,
  agregarIngrediente,
  editarIngrediente,
  borrarIngrediente,
} from '../controllers/IngredientController';

const modalStyles = StyleSheet.create({
  dialog: { alignSelf: 'center', borderRadius: 12 },
  content: { paddingBottom: 0 },
});

const units = ['g', 'kg', 'ml', 'l', 'u'];
const PRIMARY_BLUE = '#007bff';

const IngredientForm = ({ local, setLocal, touched, setTouched }) => {
  const theme = useTheme();
  const handleQuickAdjust = (delta) => {
    setLocal((prev) => {
      const next = Math.max(0, (Number(prev.CantidadStock) || 0) + delta);
      return { ...prev, CantidadStock: String(next) };
    });
    setTouched((s) => ({ ...s, stock: true }));
  };
  return (
    <>
      <Text style={ingStyles.modalSectionLabel}>Actualizacion rapida</Text>
      <Text style={ingStyles.fieldLabel}>Precio / paquete</Text>
      <TextInput
        mode="outlined"
        placeholder="Ej. 120.00"
        keyboardType="decimal-pad"
        value={local.costo}
        onChangeText={(t) => setLocal((p) => ({ ...p, costo: t.replace(/[^0-9.,]/g, '').replace(',', '.') }))}
        onBlur={() => setTouched((s) => ({ ...s, costo: true }))}
        dense
        right={<TextInput.Affix text={local.costo ? ' ARS' : ''} />}
        style={[styles.input, ingStyles.mb12, { backgroundColor: '#fff', height: 44, textAlignVertical: 'center' }]}
        contentStyle={{ paddingVertical: 2, paddingLeft: 6, paddingRight: 6 }}
        outlineStyle={{ borderRadius: 10 }}
      />
      {touched.costo && (!local.costo || Number.isNaN(Number(local.costo))) ? (
        <HelperText type="error">Ingresa un precio valido</HelperText>
      ) : null}

      <Text style={ingStyles.fieldLabel}>Stock disponible</Text>
      <TextInput
        mode="outlined"
        placeholder="Ej. 10"
        keyboardType="numeric"
        value={local.CantidadStock}
        onChangeText={(t) => setLocal((p) => ({ ...p, CantidadStock: t.replace(/[^0-9]/g, '') }))}
        onBlur={() => setTouched((s) => ({ ...s, stock: true }))}
        dense
        right={<TextInput.Affix text={local.CantidadStock ? ' u' : ''} />}
        style={[styles.input, { backgroundColor: '#fff', height: 44, textAlignVertical: 'center' }]}
        contentStyle={{ paddingVertical: 2, paddingLeft: 6, paddingRight: 6 }}
        outlineStyle={{ borderRadius: 10 }}
      />
      {touched.stock && (!local.CantidadStock || Number.isNaN(Number(local.CantidadStock))) ? (
        <HelperText type="error">Ingresa una cantidad valida</HelperText>
      ) : null}

      <View style={ingStyles.quickAdjustRow}>
        {[1, 5, 10].map((value) => (
          <Pressable key={value} onPress={() => handleQuickAdjust(value)} style={ingStyles.quickAdjustButton}>
            <Text style={ingStyles.quickAdjustText}>+{value}</Text>
          </Pressable>
        ))}
        <Pressable
          onPress={() => handleQuickAdjust(-1)}
          style={[ingStyles.quickAdjustButton, { backgroundColor: 'rgba(239,68,68,0.15)' }]}
        >
          <Text style={[ingStyles.quickAdjustText, { color: '#b91c1c' }]}>-1</Text>
        </Pressable>
      </View>

      <Text style={ingStyles.modalSectionLabel}>Datos basicos</Text>
      <Text style={ingStyles.fieldLabel}>Nombre</Text>
      <TextInput
        mode="outlined"
        placeholder="Ej. Harina"
        value={local.nombre}
        onChangeText={(t) => setLocal((p) => ({ ...p, nombre: t }))}
        onBlur={() => setTouched((s) => ({ ...s, nombre: true }))}
        dense
        style={[styles.input, ingStyles.mb12, { backgroundColor: '#fff', height: 44, textAlignVertical: 'center' }]}
        contentStyle={{ paddingVertical: 2, paddingLeft: 6, paddingRight: 6 }}
        outlineStyle={{ borderRadius: 10 }}
      />
      {touched.nombre && !local.nombre.trim() ? (
        <HelperText type="error">El nombre es obligatorio</HelperText>
      ) : null}

      <Text style={ingStyles.fieldLabel}>Unidad</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: -4, marginBottom: 8 }}>
        {units.map((u) => (
          <Chip
            key={u}
            selected={(local.unidad_Medida || '').toLowerCase() === u}
            onPress={() => setLocal((p) => ({ ...p, unidad_Medida: u }))}
            style={{ marginRight: 6, marginBottom: 6 }}
          >
            {u}
          </Chip>
        ))}
      </View>
      {touched.unidad && !local.unidad_Medida.trim() ? (
        <HelperText type="error">La unidad es obligatoria</HelperText>
      ) : null}

      <Text style={ingStyles.fieldLabel}>Tamano del paquete</Text>
      <TextInput
        mode="outlined"
        placeholder="Ej. 500"
        keyboardType="numeric"
        value={local.tamano_Paquete}
        onChangeText={(t) =>
          setLocal((p) => ({ ...p, tamano_Paquete: t.replace(/[^0-9.,]/g, '').replace(',', '.') }))
        }
        onBlur={() => setTouched((s) => ({ ...s, tamano: true }))}
        dense
        right={<TextInput.Affix text={`${local.unidad_Medida ? ' ' + local.unidad_Medida : ''}`} />}
        style={[styles.input, ingStyles.mb12, { backgroundColor: '#fff', height: 44, textAlignVertical: 'center' }]}
        contentStyle={{ paddingVertical: 2, paddingLeft: 6, paddingRight: 6 }}
        outlineStyle={{ borderRadius: 10 }}
      />
      {touched.tamano && (!local.tamano_Paquete || Number.isNaN(Number(local.tamano_Paquete))) ? (
        <HelperText type="error">Ingresa un tamano valido</HelperText>
      ) : null}
    </>
  );
};

const EditIngredienteModal = React.memo(({ visible, onDismiss, ingrediente, onSave, onDelete }) => {
  const [local, setLocal] = useState({
    id: null,
    nombre: '',
    unidad_Medida: '',
    tamano_Paquete: '',
    costo: '',
    CantidadStock: '',
  });
  const [touched, setTouched] = useState({ nombre: false, unidad: false, tamano: false, costo: false, stock: false });
  const theme = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    if (visible && ingrediente) {
      setLocal({
        id: ingrediente.id,
        nombre: ingrediente.nombre ?? '',
        unidad_Medida: ingrediente.unidad_Medida ?? '',
        tamano_Paquete: String(ingrediente.tamano_Paquete ?? ''),
        costo: String(ingrediente.costo ?? ''),
        CantidadStock: String(ingrediente.CantidadStock ?? ''),
      });
      setTouched({ nombre: false, unidad: false, tamano: false, costo: false, stock: false });
    }
  }, [visible, ingrediente]);

  const invalid = {
    nombre: !local.nombre.trim(),
    unidad: !local.unidad_Medida.trim(),
    tamano: !local.tamano_Paquete || Number.isNaN(Number(local.tamano_Paquete)),
    costo: !local.costo || Number.isNaN(Number(local.costo)),
    stock: !local.CantidadStock || Number.isNaN(Number(local.CantidadStock)),
  };
  const formInvalid = Object.values(invalid).some(Boolean);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={[ingStyles.dialog, modalStyles.dialog, { width: Math.min(screenWidth * 0.92, 520) }]}>
        <View style={[styles.modalHeader, ingStyles.modalHeaderMargin, { position: 'relative' }] }>
          <Text style={[styles.modalTitle, { flex: 1, textAlign: 'center', fontSize: 18 }]}>Editar ingrediente</Text>
          <Pressable onPress={onDismiss} hitSlop={10} style={{ position: 'absolute', right: 12, top: 12 }}>
            <Ionicons name="close" size={20} color="#666" />
          </Pressable>
        </View>
        <Dialog.Content style={modalStyles.content}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={{ maxHeight: Math.min(screenHeight * 0.7, 520) }}>
              <ScrollView contentContainerStyle={{ paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
                <View style={ingStyles.modalInfoPreview}>
                  <View style={ingStyles.modalInfoIcon}>
                    <Ionicons name="leaf-outline" size={18} color="#0f172a" />
                  </View>
                  <View style={ingStyles.modalInfoText}>
                    <Text style={ingStyles.modalInfoTitle}>{local.nombre || 'Ingrediente'}</Text>
                    <Text style={ingStyles.modalInfoSubtitle}>
                      Unidad base: {local.unidad_Medida || 'N/A'}
                    </Text>
                  </View>
                  <View style={ingStyles.modalInfoBadge}>
                    <Ionicons name="pricetag-outline" size={12} color="#0f172a" />
                    <Text style={ingStyles.modalInfoBadgeText}>ID {local.id ?? '—'}</Text>
                  </View>
                </View>
                <View style={ingStyles.modalQuickRow}>
                  <View style={ingStyles.modalQuickCard}>
                    <Text style={ingStyles.modalQuickLabel}>Costo unitario</Text>
                    <Text style={ingStyles.modalQuickValue}>${local.costo || '0'}</Text>
                  </View>
                  <View
                    style={[
                      ingStyles.modalQuickCard,
                      Number(local.CantidadStock || 0) <= 0 ? ingStyles.modalQuickDanger : ingStyles.modalQuickOk,
                    ]}
                  >
                    <Text style={ingStyles.modalQuickLabel}>Stock disponible</Text>
                    <Text style={ingStyles.modalQuickValue}>
                      {local.CantidadStock || '0'} {local.unidad_Medida || 'u'}
                    </Text>
                  </View>
                </View>
                <IngredientForm local={local} setLocal={setLocal} touched={touched} setTouched={setTouched} />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Dialog.Content>
        <Dialog.Actions style={[ingStyles.modalActionsBetween, ingStyles.actionsAlign]}>
          <Button
            mode="text"
            icon="trash-can-outline"
            textColor="#dc3545"
            compact
            onPress={() => onDelete(local.id)}
          >
            Eliminar
          </Button>
          <View style={ingStyles.actionsRight}>
            <Button
              mode="text"
              onPress={onDismiss}
              labelStyle={ingStyles.labelGray}
              compact
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              disabled={formInvalid}
              onPress={() => {
                if (formInvalid) {
                  setTouched({ nombre: true, unidad: true, tamano: true, costo: true, stock: true });
                  Alert.alert('Revisa los datos', 'Completa los campos obligatorios');
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
              style={ingStyles.primaryButton}
              buttonColor={PRIMARY_BLUE}
              compact
              contentStyle={ingStyles.buttonContent}
            >
              Guardar
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

const AddIngredienteModal = React.memo(({ visible, onDismiss, onSave, initialName = '' }) => {
  const [local, setLocal] = useState({ nombre: '', unidad_Medida: '', tamano_Paquete: '', costo: '', CantidadStock: '' });
  const [touched, setTouched] = useState({ nombre: false, unidad: false, tamano: false, costo: false, stock: false });
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const theme = useTheme();

  useEffect(() => {
    if (visible) {
      setLocal({ nombre: initialName || '', unidad_Medida: '', tamano_Paquete: '', costo: '', CantidadStock: '' });
      setTouched({ nombre: false, unidad: false, tamano: false, costo: false, stock: false });
    }
  }, [visible, initialName]);

  const invalid = {
    nombre: !local.nombre.trim(),
    unidad: !local.unidad_Medida.trim(),
    tamano: !local.tamano_Paquete || Number.isNaN(Number(local.tamano_Paquete)),
    costo: !local.costo || Number.isNaN(Number(local.costo)),
    stock: !local.CantidadStock || Number.isNaN(Number(local.CantidadStock)),
  };
  const formInvalid = Object.values(invalid).some(Boolean);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={[ingStyles.dialog, modalStyles.dialog, { width: Math.min(screenWidth * 0.92, 520) }]}>
        <View style={[styles.modalHeader, ingStyles.modalHeaderMargin, { position: 'relative' }] }>
          <Text style={[styles.modalTitle, { flex: 1, textAlign: 'center', fontSize: 18 }]}>Agregar ingrediente</Text>
          <Pressable onPress={onDismiss} hitSlop={10} style={{ position: 'absolute', right: 12, top: 12 }}>
            <Ionicons name="close" size={20} color="#666" />
          </Pressable>
        </View>
        <Dialog.Content style={modalStyles.content}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={{ maxHeight: Math.min(screenHeight * 0.7, 520) }}>
              <ScrollView contentContainerStyle={{ paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
                <IngredientForm local={local} setLocal={setLocal} touched={touched} setTouched={setTouched} />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Dialog.Content>
        <Dialog.Actions style={[ingStyles.modalActionsBetween, ingStyles.actionsAlign]}>
          <View style={ingStyles.actionsRight}>
            <Button
              mode="text"
              onPress={onDismiss}
              labelStyle={ingStyles.labelGray}
              compact
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              disabled={formInvalid}
              onPress={() => {
                if (formInvalid) {
                  setTouched({ nombre: true, unidad: true, tamano: true, costo: true, stock: true });
                  Alert.alert('Revisa los datos', 'Completa los campos obligatorios');
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
              style={ingStyles.primaryButton}
              buttonColor={PRIMARY_BLUE}
              compact
              contentStyle={ingStyles.buttonContent}
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
  const theme = useTheme();
  const [ingredientes, setIngredientes] = useState([]);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [searchRaw, setSearchRaw] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [initialAddName, setInitialAddName] = useState('');

  useEffect(() => {
    const h = setTimeout(() => setSearch(searchRaw.trim()), 200);
    return () => clearTimeout(h);
  }, [searchRaw]);

  const formatMoney = (n) => {
    const num = parseFloat(n || 0);
    try {
      return new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
    } catch {
      return Number.isFinite(num) ? num.toFixed(2) : '0.00';
    }
  };

  const load = useCallback(async () => {
    try {
      const data = await fetchIngredientes();
      setIngredientes(data);
    } catch {
      Alert.alert('Error', 'No se pudieron cargar ingredientes');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (route.params?.openAdd) {
      setAddVisible(true);
      navigation.setParams({ openAdd: false });
    }
  }, [route.params]);

  const filtered = (() => {
    const q = (search || '').toLowerCase().trim();
    if (!q) return [...ingredientes].sort((a, b) => String(a.nombre).localeCompare(String(b.nombre)));

    const mapped = ingredientes
      .map((i) => {
        const name = String(i.nombre || '').toLowerCase();
        const unit = String(i.unidad_Medida || '').toLowerCase();
        const pack = String(i.tamano_Paquete || '').toLowerCase();

        if (name === q || unit === q || pack === q) return { item: i, score: 0 };
        if (name.startsWith(q) || unit.startsWith(q) || pack.startsWith(q)) return { item: i, score: 1 };
        if (name.includes(q) || unit.includes(q) || pack.includes(q)) return { item: i, score: 2 };
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => (a.score - b.score) || String(a.item.nombre).localeCompare(String(b.item.nombre)));

    return mapped.map((m) => m.item);
  })();

  const handleAdd = async (data) => {
    await agregarIngrediente(data);
    setAddVisible(false);
    load();
  };

  const handleEdit = async (data) => {
    await editarIngrediente(data);
    setEditVisible(false);
    load();
  };

  const handleDelete = async (id) => {
    await borrarIngrediente(id);
    setEditVisible(false);
    load();
  };

  return (
    <View style={styles.container}>
      <View style={ingStyles.topBar}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.onSurface }}>Ingredientes</Text>
          <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>{ingredientes.length} registrados</Text>
        </View>
        <View style={ingStyles.topActions}>
          <IconButton
            icon={searchOpen ? 'close' : 'magnify'}
            size={20}
            style={ingStyles.iconButton}
            onPress={() => {
              if (searchOpen) {
                setSearchRaw('');
                setSearch('');
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
              setInitialAddName('');
              setAddVisible(true);
            }}
            contentStyle={{ flexDirection: 'row-reverse' }}
            style={{ borderRadius: 999 }}
          >
            Nuevo
          </Button>
        </View>
      </View>

      {searchOpen && (
        <TextInput
          placeholder="Buscar ingrediente..."
          value={searchRaw}
          onChangeText={setSearchRaw}
          mode="outlined"
          left={<TextInput.Icon name="magnify" />}
          right={
            searchRaw ? (
              <TextInput.Icon
                name="close"
                onPress={() => {
                  setSearchRaw('');
                  setSearch('');
                }}
              />
            ) : null
          }
          style={{ marginBottom: 10 }}
        />
      )}

      <FlatList
        data={filtered}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => {
          const n = Number(item.CantidadStock) || 0;
          const severity = n <= 0 ? 'danger' : n <= 2 ? 'warn' : 'ok';
          return (
            <Card
              style={[
                ingStyles.listCard,
                {
                  borderLeftWidth: 3,
                  borderLeftColor:
                    severity === 'ok' ? '#e2e8f0' : severity === 'warn' ? '#f59e0b' : '#ef4444',
                },
              ]}
            >
              <View style={ingStyles.listRow}>
                <View style={ingStyles.listInfo}>
                  <Text style={ingStyles.listName}>{item.nombre}</Text>
                  <Text style={ingStyles.listMeta}>
                    {item.tamano_Paquete} {item.unidad_Medida} - ${formatMoney(item.costo)}
                  </Text>
                </View>
                <View style={ingStyles.listRight}>
                  <View
                    style={[
                      ingStyles.stockPill,
                      severity === 'ok'
                        ? ingStyles.stockPillOk
                        : severity === 'warn'
                          ? ingStyles.stockPillWarn
                          : ingStyles.stockPillDanger,
                    ]}
                  >
                    <Ionicons
                      name={
                        severity === 'ok'
                          ? 'checkmark-circle-outline'
                          : severity === 'warn'
                            ? 'alert-circle-outline'
                            : 'close-circle-outline'
                      }
                      size={13}
                      color={severity === 'ok' ? '#166534' : severity === 'warn' ? '#b45309' : '#b91c1c'}
                    />
                    <Text style={ingStyles.stockPillText}>
                      {n} {item.unidad_Medida || 'u'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setSelected(item);
                      setEditVisible(true);
                    }}
                    style={ingStyles.editLink}
                  >
                    <Ionicons name="create-outline" size={14} color="#0f172a" />
                    <Text style={ingStyles.editLinkText}>Editar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          );
        }}
        ItemSeparatorComponent={() => <View style={ingStyles?.separator || { height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 96 }}
      />

      {filtered.length === 0 && search ? (
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>No se encontraron ingredientes</Text>
          <Button mode="contained" onPress={() => { setInitialAddName(search); setAddVisible(true); }}>Crear "{search}"</Button>
        </View>
      ) : null}

      <AddIngredienteModal
        visible={addVisible}
        onDismiss={() => setAddVisible(false)}
        onSave={(data) => { handleAdd(data); setInitialAddName(''); }}
        initialName={initialAddName}
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






