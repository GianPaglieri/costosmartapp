// SalesByCakeScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Divider } from 'react-native-paper';
import styles from '../components/styles';
import { obtenerVentas } from '../controllers/VentaController';

export default function SalesByCakeScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const ventas = await obtenerVentas();
      const groups = ventas.reduce((acc, v) => {
        const name = v.Torta?.nombre_torta || '—';
        if (!acc[name]) acc[name] = { count: 0, sum: 0, items: [] };
        acc[name].count++;
        acc[name].sum += parseFloat(v.precio_torta) || 0;
        acc[name].items.push(v);
        return acc;
      }, {});
      const arr = Object.entries(groups)
        .map(([name, { count, sum, items }]) => ({
          name,
          count,
          sum: sum.toFixed(2),
          items,
        }))
        .sort((a, b) => b.count - a.count);
      setData(arr);
    } catch {
      Alert.alert('Error', 'No pudimos cargar las ventas');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [loadData])
  );

  const toggle = name => {
    setExpanded(prev => (prev === name ? null : name));
  };

  const renderItem = ({ item }) => {
    const isOpen = expanded === item.name;
    return (
      <Card style={local.card}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => toggle(item.name)}>
          <View style={local.headerRow}>
            <View style={local.badgeCount}>
              <Text style={local.badgeText}>{item.count}</Text>
            </View>
            <View style={local.info}>
              <Text style={local.name} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={local.subtitle}>
                Ingresos: <Text style={local.sum}>${item.sum}</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {isOpen && (
          <View style={local.detailContainer}>
            <ScrollView
              style={local.detailScroll}
              showsVerticalScrollIndicator
              nestedScrollEnabled
            >
              {item.items.map((v, idx) => (
                <View key={idx}>
                  <View style={local.detailRow}>
                    <Text style={local.detailDate} numberOfLines={1} ellipsizeMode="tail">
                      {new Date(v.fecha_venta).toLocaleDateString()}
                    </Text>
                    <Text style={local.detailPrice}>
                      ${parseFloat(v.precio_torta).toFixed(2)}
                    </Text>
                  </View>
                  {idx < item.items.length - 1 && <Divider />}
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </Card>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heroTitle}>Ventas por Torta</Text>
      <FlatList
        data={data}
        keyExtractor={i => i.name}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 16 }}
      />
    </View>
  );
}

const local = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  badgeCount: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007bff10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  badgeText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  sum: {
    color: '#28a745',
    fontWeight: '700',
  },
  detailContainer: {
    maxHeight: 200,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  detailScroll: {
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detailDate: {
    fontSize: 12,
    color: '#555',
  },
  detailPrice: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: '500',
  },
});
