import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { Portal, Dialog, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles, { tortaStyles as tStyles } from './styles';
import { fetchTortas } from '../controllers/TortaController';

const formatCurrency = (value) => {
  const number = typeof value === 'number' ? value : parseFloat(String(value || '0').replace(',', '.'));
  const numeric = Number.isNaN(number) ? 0 : Math.round(number);
  try {
    return `$ ${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(numeric)}`;
  } catch (error) {
    return `$ ${numeric.toFixed(0)}`;
  }
};

export default function TortaPickerModal({ visible, onDismiss, onSelect, placeholder = 'Buscar torta...' }) {
  const [tortas, setTortas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchRaw, setSearchRaw] = useState('');

  useEffect(() => {
    if (!visible) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchTortas();
        if (!mounted) return;
        setTortas(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!mounted) return;
        setTortas([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [visible]);

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

  const handleSelect = (item) => {
    onSelect && onSelect(item);
    onDismiss && onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={[tStyles.dialog, { width: '92%', alignSelf: 'center' }]}>
        <View style={[styles.modalHeader, tStyles.modalHeaderMargin, { position: 'relative' }]}>
          <Text style={[styles.modalTitle, { flex: 1, textAlign: 'center', fontSize: 18 }]}>Seleccionar torta</Text>
          <Pressable onPress={onDismiss} hitSlop={10} style={{ position: 'absolute', right: 12, top: 12 }}>
            <Ionicons name="close" size={20} color="#666" />
          </Pressable>
        </View>

        <Dialog.Content>
          <TextInput
            placeholder={placeholder}
            value={searchRaw}
            onChangeText={setSearchRaw}
            mode="outlined"
            left={<TextInput.Icon name="magnify" />}
            right={searchRaw ? <TextInput.Icon name="close" onPress={() => setSearchRaw('')} /> : null}
            style={{ marginBottom: 8, backgroundColor: '#fff' }}
          />

          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={item => String(item.ID_TORTA || item.id || item.ID || item.nombre_torta)}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)} style={[tStyles.ingredienteItem, { paddingVertical: 12, paddingHorizontal: 8 }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.cardTitle, { fontSize: 15 }]} numberOfLines={1}>{item.nombre_torta}</Text>
                      {item.descripcion_torta ? <Text style={styles.cardText} numberOfLines={1}>{item.descripcion_torta}</Text> : null}
                    </View>
                    <Text style={{ marginLeft: 8, color: '#475569', fontWeight: '600' }}>{formatCurrency(item.precio_lista ?? item.precio ?? item.costo_total)}</Text>
                  </View>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 380 }}
              ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#f1f5f9', marginVertical: 4 }} />}
            />
          )}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
