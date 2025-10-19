import React, { useState, useEffect, useMemo } from 'react';
import { Modal, View, Text, TextInput, ActivityIndicator, Pressable, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import styles, { ingredientStyles as ingStyles } from './styles';

const AddIngredienteModal = ({ visible, onCancel, ingredientes = [], onSubmit, onCreateIngrediente, loading }) => {
  const [selected, setSelected] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUnidad, setNewUnidad] = useState('u');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!visible) {
      setSelected(null);
      setCantidad('');
      setSearchQ('');
      setShowCreate(false);
      setNewName('');
      setNewUnidad('u');
    }
  }, [visible]);

  const ordenados = ingredientes.slice().sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));

  const filtered = useMemo(() => {
    if (!searchQ) return ordenados;
    const q = searchQ.trim().toLowerCase();
    const exact = [];
    const starts = [];
    const includes = [];
    ordenados.forEach(i => {
      const name = (i.nombre || '').toLowerCase();
      if (name === q) exact.push(i);
      else if (name.startsWith(q)) starts.push(i);
      else if (name.includes(q)) includes.push(i);
    });
    return [...exact, ...starts, ...includes];
  }, [searchQ, ordenados]);

  const handleAdd = () => {
    if (selected && cantidad) {
      onSubmit && onSubmit(selected, cantidad);
    }
  };

  const handleCreate = async () => {
    if (!newName) return;
    setCreating(true);
    try {
      if (typeof onCreateIngrediente === 'function') {
        await onCreateIngrediente({ nombre: newName.trim(), unidad: newUnidad?.trim() || 'u' });
      }
      setNewName('');
      setNewUnidad('u');
      setShowCreate(false);
      setSearchQ('');
    } catch (e) {
      // parent handles errors
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.35)' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ width: '100%', alignItems: 'center' }}>
          <View style={[styles.modalContenido, { width:'92%', backgroundColor:'#fff', borderRadius:12, overflow:'hidden' }]}>
            <View style={[styles.modalHeader, { position: 'relative', paddingTop: 14, paddingBottom: 8 }]}>
              <Text style={[styles.modalTitle, { flex: 1, textAlign: 'center', fontSize: 18 }]}>Agregar Ingrediente</Text>
              <Pressable onPress={onCancel} hitSlop={10} style={{ position: 'absolute', right: 12, top: 12 }}>
                <Text style={{ fontSize: 20, color: '#666' }}>✕</Text>
              </Pressable>
            </View>

            {/* Search + results (FlatList handles its own scroll) */}
            <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
              <Text style={ingStyles.fieldLabel}>Ingrediente</Text>
              <TextInput
                placeholder="Buscar ingrediente..."
                value={searchQ}
                onChangeText={text => { setSearchQ(text); setShowCreate(false); }}
                style={[styles.input, { backgroundColor: '#fff', height: 44, borderWidth: 1, borderColor: '#ececec', borderRadius: 8, paddingHorizontal: 10 }]}
                editable={!loading}
              />

              <View style={{ height: 8 }} />

              <FlatList
                data={filtered}
                keyExtractor={item => String(item.id)}
                keyboardShouldPersistTaps="handled"
                style={{ maxHeight: 220 }}
                ListEmptyComponent={() => (
                  <View style={{ paddingVertical: 12 }}>
                    <Text style={{ color: '#6b7280' }}>No se encontraron ingredientes.</Text>
                  </View>
                )}
                renderItem={({ item }) => {
                  const isSelected = selected?.id === item.id;
                  return (
                    <Pressable
                      onPress={() => setSelected(item)}
                      style={[styles.ingredienteItem, { backgroundColor: isSelected ? '#eef6ff' : '#fff' }]}
                    >
                      <Text style={styles.ingredienteNombre}>{item.nombre}</Text>
                      <Text style={{ color: '#6b7280' }}>{item.unidad || ''}</Text>
                    </Pressable>
                  );
                }}
              />

              {!selected && <Text style={{ color: '#dc3545', marginTop: 6 }}>Selecciona un ingrediente</Text>}
              {/* Cantidad + Agregar (sitio por encima de la sección de crear) */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 8 }}>
                <TextInput
                  placeholder="Cantidad"
                  value={cantidad}
                  onChangeText={setCantidad}
                  keyboardType="numeric"
                  style={[styles.input, { flex: 1, height: 44, borderWidth: 1, borderColor: '#ececec', borderRadius: 8, paddingHorizontal: 10 }]}
                />
                <Pressable
                  onPress={handleAdd}
                  disabled={!selected || !cantidad || loading}
                  style={[styles.boton, styles.botonPrimario, { paddingHorizontal: 12, paddingVertical: 10, opacity: (!selected || !cantidad || loading) ? 0.6 : 1 }]}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>Agregar</Text>}
                </Pressable>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <Pressable onPress={() => { setShowCreate(v => !v); setSearchQ(''); }} style={{ padding: 6 }}>
                  <Text style={styles.seccionLink}>{showCreate ? 'Cancelar crear' : 'Crear nuevo ingrediente'}</Text>
                </Pressable>
                <Pressable onPress={() => { setSearchQ(''); setSelected(null); setCantidad(''); }} style={{ padding: 6 }}>
                  <Text style={{ color: '#6b7280' }}>Limpiar</Text>
                </Pressable>
              </View>
            </View>

            {/* Footer actions */}
            <View style={{ padding: 12, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fafafa' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Pressable style={[styles.boton, { marginHorizontal:8 }]} onPress={onCancel} accessibilityLabel="Cancelar">
                  <Text style={styles.botonTexto}>Cancelar</Text>
                </Pressable>
              </View>

              {/* Quick-create placed below footer as requested */}
              {showCreate && (
                <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderColor: '#eee' }}>
                  <Text style={ingStyles.fieldLabel}>Nombre</Text>
                  <TextInput
                    placeholder="Nombre del ingrediente"
                    value={newName}
                    onChangeText={setNewName}
                    style={[styles.input, { backgroundColor: '#fff', height: 44, borderWidth: 1, borderColor: '#ececec', borderRadius: 8, paddingHorizontal: 10 }]}
                  />
                  <Text style={[ingStyles.fieldLabel, { marginTop: 8 }]}>Unidad</Text>
                  <TextInput
                    placeholder="e.g. kg, g, u"
                    value={newUnidad}
                    onChangeText={setNewUnidad}
                    style={[styles.input, { backgroundColor: '#fff', height: 44, borderWidth: 1, borderColor: '#ececec', borderRadius: 8, paddingHorizontal: 10 }]}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                    <Pressable onPress={() => { setShowCreate(false); setNewName(''); setNewUnidad('u'); }} style={[styles.boton, { marginRight: 8 }]}>
                      <Text style={styles.botonTexto}>Cancelar</Text>
                    </Pressable>
                    <Pressable onPress={handleCreate} style={[styles.boton, styles.botonPrimario]}>
                      {creating ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>Crear</Text>}
                    </Pressable>
                  </View>
                </View>
              )}

            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddIngredienteModal;
