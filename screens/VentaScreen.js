// SalesByCakeScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Divider } from 'react-native-paper';
import styles, { ventaStyles } from '../components/styles';
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
      <Card style={ventaStyles.card}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => toggle(item.name)}>
          <View style={ventaStyles.headerRow}>
            <View style={ventaStyles.badgeCount}>
              <Text style={ventaStyles.badgeText}>{item.count}</Text>
            </View>
            <View style={ventaStyles.info}>
              <Text style={ventaStyles.name} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={ventaStyles.subtitle}>
                Ingresos: <Text style={ventaStyles.sum}>${item.sum}</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {isOpen && (
          <View style={ventaStyles.detailContainer}>
            <ScrollView
              style={ventaStyles.detailScroll}
              showsVerticalScrollIndicator
              nestedScrollEnabled
            >
              {item.items.map((v, idx) => (
                <View key={idx}>
                  <View style={ventaStyles.detailRow}>
                    <Text style={ventaStyles.detailDate} numberOfLines={1} ellipsizeMode="tail">
                      {new Date(v.fecha_venta).toLocaleDateString()}
                    </Text>
                    <Text style={ventaStyles.detailPrice}>
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

