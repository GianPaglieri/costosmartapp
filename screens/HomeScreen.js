// HomeScreen.js
import React, { useState, useCallback, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Alert,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles, { homeStyles } from '../components/styles';
import {
  obtenerCantidadVentas,
  obtenerGanancias,
  registrarVenta,
  obtenerVentas
} from '../controllers/VentaController';
import { fetchIngredientesMenosStock } from '../controllers/IngredientController';
import TortaPickerModal from '../components/TortaPickerModal';

export default function HomeScreen({ navigation }) {
  const [ventasCnt, setVentasCnt] = useState(null);
  const [ganancias, setGanancias] = useState(null);
  const [gananciasRange, setGananciasRange] = useState(null);
  const [ingredientesStock, setIngredientesStock] = useState([]);
  const [loadingVentas, setLoadingVentas] = useState(true);
  const [loadingGanancias, setLoadingGanancias] = useState(true);
  const [loadingStock, setLoadingStock] = useState(true);

  const [top3, setTop3] = useState([]);

  const [pickerVisible, setPickerVisible] = useState(false);
  const [registrandoVenta, setRegistrandoVenta] = useState(false);

  const loadAllData = useCallback(async () => {
    setLoadingVentas(true);
    setLoadingGanancias(true);
    setLoadingStock(true);
    try {
      const [cnt, gananciasInfo, stock, ventas] = await Promise.all([
        obtenerCantidadVentas(),
        obtenerGanancias(),
        fetchIngredientesMenosStock(),
        obtenerVentas()
      ]);
      setVentasCnt(cnt);
      setGanancias(gananciasInfo?.total ?? 0);
      setGananciasRange(gananciasInfo?.rango ?? null);
      setIngredientesStock(stock);

      // Top 3 tortas más vendidas
      const counts = ventas.reduce((acc, v) => {
        const name = v.Torta.nombre_torta;
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});
      const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
      const sorted = Object.entries(counts)
        .map(([name, count]) => ({
          name,
          count,
          percent: ((count / total) * 100).toFixed(1)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
      setTop3(sorted);
    } catch {
      Alert.alert('Error', 'No se pudieron cargar datos');
    } finally {
      setLoadingVentas(false);
      setLoadingGanancias(false);
      setLoadingStock(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      async function fetchData() {
        if (!isActive) return;
        await loadAllData();
      }
      fetchData();
      return () => {
        isActive = false;
      };
    }, [loadAllData])
  );

  const abrirVenta = () => {
    if (registrandoVenta) {
      return;
    }
    setPickerVisible(true);
  };

  const confirmarVenta = async (tortaId) => {
    setRegistrandoVenta(true);
    try {
      await registrarVenta(tortaId);
      Alert.alert('Éxito', 'Venta registrada');
      await loadAllData();
    } catch {
      Alert.alert('Error', 'No se pudo registrar la venta');
    } finally {
      setRegistrandoVenta(false);
    }
  };

  const manejarSeleccionTorta = (torta) => {
    setPickerVisible(false);
    if (!torta || !torta.ID_TORTA) {
      return;
    }

    Alert.alert(
      'Confirmar venta',
      `Registrar la venta de "${torta.nombre_torta}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => confirmarVenta(torta.ID_TORTA) }
      ]
    );
  };

  const formatCurrency = useCallback((value) => {
    const number = Number(value) || 0;
    try {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
      }).format(number);
    } catch {
      return `$${Math.round(number).toLocaleString('es-AR')}`;
    }
  }, []);

  const gananciasPeriodoLabel = useMemo(() => {
    if (!gananciasRange?.inicio || !gananciasRange?.fin) {
      return 'Últimos 7 días';
    }
    try {
      const format = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit' });
      const start = format.format(new Date(gananciasRange.inicio));
      const end = format.format(new Date(gananciasRange.fin));
      return `${start} - ${end}`;
    } catch {
      return 'Últimos 7 días';
    }
  }, [gananciasRange]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 32 }]}>
        {/* MÉTRICAS */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Panel de Control</Text>
          <View style={styles.metricasContainer}>
            <View style={styles.metricaCard}>
              <Text style={styles.metricaValor}>
                {loadingGanancias ? '...' : formatCurrency(ganancias)}
              </Text>
              <Text style={styles.metricaLabel}>Ganancias</Text>
              <Text style={styles.metricasPeriodo}>{gananciasPeriodoLabel}</Text>
            </View>
            <View style={styles.metricaCard}>
              <Text style={styles.metricaValor}>
                {loadingVentas ? '...' : ventasCnt}
              </Text>
              <Text style={styles.metricaLabel}>Ventas</Text>
              <Text style={styles.metricasPeriodo}>Últimos 7 días</Text>
            </View>
          </View>
        </View>

        {/* BOTÓN NUEVA VENTA */}
        <Pressable
          style={({ pressed }) => [
            styles.boton,
            styles.botonPrimario,
            {
              marginVertical: 12,
              transform: [{ scale: pressed ? 0.98 : 1 }],
              opacity: registrandoVenta ? 0.7 : 1
            }
          ]}
          onPress={abrirVenta}
          disabled={registrandoVenta}
        >
          {registrandoVenta ? (
            <View style={homeStyles.buttonContent}>
              <ActivityIndicator color="#fff" size="small" style={{ marginRight: 8 }} />
              <Text style={styles.botonTexto}>Registrando venta...</Text>
            </View>
          ) : (
            <View style={homeStyles.buttonContent}>
              <Ionicons name="cart-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.botonTexto}>Generar Nueva Venta</Text>
            </View>
          )}
        </Pressable>

        {/* STOCK CRÍTICO */}
        <View style={styles.seccion}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionTitulo}>Stock Crítico</Text>
            <Pressable onPress={() => navigation.navigate('Ingredientes')}>
              <Text style={styles.seccionLink}>Ver detalle →</Text>
            </Pressable>
          </View>
          {loadingStock ? (
            <Text>Cargando stock...</Text>
          ) : (
            <FlatList
              data={ingredientesStock.slice(0, 3)}
              scrollEnabled={false}
              keyExtractor={item => item.ID_INGREDIENTE?.toString() || item.nombre}
              renderItem={({ item }) => (
                <View style={styles.itemStock}>
                  <Text style={styles.itemStockTexto}>{item.nombre}</Text>
                  <Text style={styles.itemStockCantidad}>{item.CantidadStock}u.</Text>
                </View>
              )}
            />
          )}
        </View>

        {/* TOP 3 TORTAS MÁS VENDIDAS */}
        <View style={styles.seccion}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionTitulo}>Top 3 Tortas</Text>
            <Pressable onPress={() => {}}>
              <Text style={styles.seccionLink}>Ver detalle →</Text>
            </Pressable>
          </View>
          {top3.length > 0 ? (
            top3.map((t, i) => (
              <View key={i} style={homeStyles.row}>
                <View style={homeStyles.circle}>
                  <Text style={homeStyles.circleText}>{i + 1}</Text>
                </View>
                <Text style={homeStyles.name} numberOfLines={1} ellipsizeMode="tail">
                  {t.name}
                </Text>
                <Text style={homeStyles.info}>
                  {t.count} ventas ({t.percent}%)
                </Text>
              </View>
            ))
          ) : (
            <Text>No hay ventas aún</Text>
          )}
        </View>

      </ScrollView>
      <TortaPickerModal
        visible={pickerVisible}
        onDismiss={() => setPickerVisible(false)}
        onSelect={manejarSeleccionTorta}
        placeholder="Buscar torta..."
      />
    </View>
  );
}

