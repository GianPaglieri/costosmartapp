// HomeScreen.js
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import styles, { homeStyles } from '../components/styles';
import {
  obtenerCantidadVentas,
  obtenerGanancias,
  registrarVenta,
  obtenerVentas
} from '../controllers/VentaController';
import { fetchTortas } from '../controllers/TortaController';
import { fetchIngredientesMenosStock } from '../controllers/IngredientController';

export default function HomeScreen({ navigation }) {
  const [ventasCnt, setVentasCnt] = useState(null);
  const [ganancias, setGanancias] = useState(null);
  const [ingredientesStock, setIngredientesStock] = useState([]);
  const [loadingVentas, setLoadingVentas] = useState(true);
  const [loadingGanancias, setLoadingGanancias] = useState(true);
  const [loadingStock, setLoadingStock] = useState(true);

  const [top3, setTop3] = useState([]);

  const [modalVentaVisible, setModalVentaVisible] = useState(false);
  const [tortas, setTortas] = useState([]);
  const [loadingTortas, setLoadingTortas] = useState(false);
  const [tortaSel, setTortaSel] = useState('');
  const [registrandoVenta, setRegistrandoVenta] = useState(false);

  const loadAllData = useCallback(async () => {
    setLoadingVentas(true);
    setLoadingGanancias(true);
    setLoadingStock(true);
    try {
      const [cnt, sum, stock, ventas] = await Promise.all([
        obtenerCantidadVentas(),
        obtenerGanancias(),
        fetchIngredientesMenosStock(),
        obtenerVentas()
      ]);
      setVentasCnt(cnt);
      setGanancias(sum);
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

  const abrirVenta = async () => {
    setModalVentaVisible(true);
    setLoadingTortas(true);
    try {
      setTortas(await fetchTortas());
    } finally {
      setLoadingTortas(false);
    }
  };

  const confirmarVenta = async () => {
    if (!tortaSel) {
      Alert.alert('Error', 'Seleccione una torta');
      return;
    }
    setRegistrandoVenta(true);
    try {
      await registrarVenta(tortaSel);
      Alert.alert('Éxito', 'Venta registrada');
      await loadAllData();
    } catch {
      Alert.alert('Error', 'No se pudo registrar la venta');
    } finally {
      setRegistrandoVenta(false);
      setModalVentaVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 32 }]}>
        {/* MÉTRICAS */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Panel de Control</Text>
          <View style={styles.metricasContainer}>
            <View style={styles.metricaCard}>
              <Text style={styles.metricaValor}>
                {loadingGanancias ? '...' : `$${ganancias}`}
              </Text>
              <Text style={styles.metricaLabel}>Ganancias</Text>
              <Text style={styles.metricasPeriodo}>Últimos 7 días</Text>
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
            { marginVertical: 12, transform: [{ scale: pressed ? 0.98 : 1 }] }
          ]}
          onPress={abrirVenta}
        >
          <Text style={styles.botonTexto}>Generar Nueva Venta</Text>
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

        {/* VENTAS POR TORTA (placeholder) */}
        <View style={styles.seccion}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionTitulo}>Ventas por Torta</Text>
            <Pressable onPress={() => {}}>
              <Text style={styles.seccionLink}>Ver detalle →</Text>
            </Pressable>
          </View>
          {/* espacio en blanco para futuro gráfico */}
        </View>

        {/* MODAL NUEVA VENTA */}
        <Modal
          visible={modalVentaVisible}
          transparent
          onRequestClose={() => setModalVentaVisible(false)}
        >
          <Pressable style={styles.modalFondo} onPress={() => setModalVentaVisible(false)}>
            <View style={styles.modalContenido}>
              <Text style={styles.modalTitulo}>Registrar Venta</Text>
              {loadingTortas ? (
                <Text>Cargando tortas...</Text>
              ) : (
                <Picker
                  selectedValue={tortaSel}
                  onValueChange={setTortaSel}
                  style={styles.picker}
                  dropdownIconColor="#007bff"
                >
                  <Picker.Item label="Seleccione…" value="" />
                  {tortas.map(t => (
                    <Picker.Item key={t.ID_TORTA} label={t.nombre_torta} value={t.ID_TORTA} />
                  ))}
                </Picker>
              )}
              <Pressable
                style={[styles.boton, styles.botonPrimario, { marginTop: 16 }]}
                onPress={confirmarVenta}
                disabled={registrandoVenta}
              >
                <Text style={styles.botonTexto}>
                  {registrandoVenta ? 'Registrando...' : 'Confirmar'}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

      </ScrollView>
    </View>
  );
}

