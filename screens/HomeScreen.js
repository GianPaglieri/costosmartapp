// HomeScreen.js
import React, { useState, useCallback, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles, { homeStyles } from '../components/styles';
import {
  obtenerCantidadVentas,
  obtenerGanancias,
  obtenerCantidadVentasSemanales,
  obtenerPorcentajeVentas,
  registrarVenta,
  obtenerVentas
} from '../controllers/VentaController';
import { fetchIngredientesMenosStock } from '../controllers/IngredientController';
import TortaPickerModal from '../components/TortaPickerModal';

const DEFAULT_RANGE_LABEL = 'Ultimos 7 dias';
const parsePercentageValue = (value) => {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === 'string') {
    const cleaned = value.replace('%', '').replace(',', '.');
    const parsed = parseFloat(cleaned);
    return Number.isNaN(parsed) ? null : parsed;
  }
  if (typeof value === 'object') {
    if (value.porcentajeCambio !== undefined) {
      return parsePercentageValue(value.porcentajeCambio);
    }
    if (value.porcentaje !== undefined) {
      return parsePercentageValue(value.porcentaje);
    }
    if (value.valor !== undefined) {
      return parsePercentageValue(value.valor);
    }
  }
  return null;
};

const pluralize = (value, singular, plural) => {
  const amount = Number(value) || 0;
  return `${amount} ${Math.abs(amount) === 1 ? singular : plural}`;
};

const formatCurrencyValue = (value) => {
  const number = Number(value) || 0;
  try {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(number);
  } catch {
    return `$${Math.round(number).toLocaleString('es-AR')}`;
  }
};

export default function HomeScreen({ navigation }) {
  const [ventasCnt, setVentasCnt] = useState(null);
  const [ventasRange, setVentasRange] = useState(null);
  const [ganancias, setGanancias] = useState(null);
  const [gananciasRange, setGananciasRange] = useState(null);
  const [ingredientesStock, setIngredientesStock] = useState([]);
  const [loadingVentas, setLoadingVentas] = useState(true);
  const [loadingGanancias, setLoadingGanancias] = useState(true);
  const [loadingStock, setLoadingStock] = useState(true);

  const [top3, setTop3] = useState([]);
  const [ventasDistribucion, setVentasDistribucion] = useState([]);
  const [ventasSemana, setVentasSemana] = useState(null);
  const [ventasDelta, setVentasDelta] = useState(null);
  const [selectedTorta, setSelectedTorta] = useState(null);

  const [pickerVisible, setPickerVisible] = useState(false);
  const [registrandoVenta, setRegistrandoVenta] = useState(false);

  const topTorta = useMemo(() => (top3.length > 0 ? top3[0] : null), [top3]);

  const stockSummary = useMemo(() => {
    if (!Array.isArray(ingredientesStock) || ingredientesStock.length === 0) {
      return 'Sin alertas de stock';
    }
    return pluralize(ingredientesStock.length, 'ingrediente en alerta', 'ingredientes en alerta');
  }, [ingredientesStock]);

  const heroSubtitle = stockSummary;

  const deltaNumber = useMemo(() => {
    if (ventasDelta === null || ventasDelta === undefined) return null;
    if (typeof ventasDelta === 'number') {
      return Number.isFinite(ventasDelta) ? Math.round(ventasDelta) : null;
    }
    const parsed = parseFloat(String(ventasDelta).replace('%', '').replace(',', '.'));
    return Number.isNaN(parsed) ? null : Math.round(parsed);
  }, [ventasDelta]);

  const ventasSemanaTexto = useMemo(() => {
    if (ventasSemana === null || ventasSemana === undefined) {
      return 'Sin datos';
    }
    return pluralize(ventasSemana, 'venta', 'ventas');
  }, [ventasSemana]);

  const formatCurrency = useCallback((value) => formatCurrencyValue(value), []);
  const ventasSemanaActual = useMemo(() => {
    const parsed = Number(ventasSemana);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [ventasSemana]);
  const lowStockCount = Array.isArray(ingredientesStock) ? ingredientesStock.length : 0;

  const resumenVentas = useMemo(
    () => ({
      ingresos: formatCurrency(ganancias ?? 0),
      periodo: ventasPeriodoLabel || DEFAULT_RANGE_LABEL,
      totalVentas: ventasCnt ?? 0,
      delta: deltaNumber,
      semana: ventasSemanaTexto,
    }),
    [ganancias, ventasPeriodoLabel, ventasCnt, deltaNumber, ventasSemanaTexto, formatCurrency]
  );

  const resumenDeltaPalette = useMemo(() => {
    if (resumenVentas.delta === null) {
      return {
        icon: 'remove-outline',
        backgroundColor: 'rgba(15,23,42,0.08)',
        color: '#475569',
        label: 'Sin datos',
      };
    }
    if (resumenVentas.delta > 0) {
      return {
        icon: 'trending-up',
        backgroundColor: 'rgba(22,163,74,0.15)',
        color: '#15803d',
        label: `+${resumenVentas.delta}% vs semana anterior`,
      };
    }
    return {
      icon: 'trending-down',
      backgroundColor: 'rgba(220,38,38,0.15)',
      color: '#b91c1c',
      label: `${resumenVentas.delta}% vs semana anterior`,
    };
  }, [resumenVentas]);

  const ventasChip = useMemo(() => {
    if (resumenVentas.delta === null) {
      return { icon: 'remove-outline', label: 'Sin datos recientes', color: '#475569' };
    }
    if (resumenVentas.delta > 0) {
      return { icon: 'arrow-up-outline', label: `+${resumenVentas.delta}% vs semana anterior`, color: '#15803d' };
    }
    if (resumenVentas.delta < 0) {
      return { icon: 'arrow-down-outline', label: `${resumenVentas.delta}% vs semana anterior`, color: '#b91c1c' };
    }
    return { icon: 'remove-outline', label: 'Sin cambios', color: '#475569' };
  }, [resumenVentas.delta]);


  const loadAllData = useCallback(async () => {
    setLoadingVentas(true);
    setLoadingGanancias(true);
    setLoadingStock(true);
    try {
      const [
        ventasInfo,
        gananciasInfo,
        stock,
        ventas,
        ventasSemanaInfo,
        porcentajeInfo
      ] = await Promise.all([
        obtenerCantidadVentas(),
        obtenerGanancias(),
        fetchIngredientesMenosStock(),
        obtenerVentas(),
        obtenerCantidadVentasSemanales().catch(() => null),
        obtenerPorcentajeVentas().catch(() => null)
      ]);
      setVentasCnt(ventasInfo?.total ?? ventasInfo?.cantidad ?? ventasInfo?.cantidadVentas ?? 0);
      setVentasRange(ventasInfo?.rango ?? null);
      setGanancias(gananciasInfo?.total ?? 0);
      setGananciasRange(gananciasInfo?.rango ?? null);
      setIngredientesStock(Array.isArray(stock) ? stock : []);

      if (ventasSemanaInfo === null || ventasSemanaInfo === undefined) {
        setVentasSemana(null);
      } else {
        const semanalValor = Number(ventasSemanaInfo);
        setVentasSemana(Number.isFinite(semanalValor) ? semanalValor : 0);
      }
      setVentasDelta(parsePercentageValue(porcentajeInfo));

      const ventasSeguras = Array.isArray(ventas) ? ventas : [];

      // Top 3 tortas mas vendidas
      const counts = ventasSeguras.reduce((acc, v) => {
        const name = v?.Torta?.nombre_torta;
        if (!name) {
          return acc;
        }
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});
      const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
      const distribution = Object.entries(counts)
        .map(([name, count]) => {
          const percent = ((count / total) * 100).toFixed(1);
          return {
            name,
            count,
            percent,
            percentNumber: Math.min(Math.max(parseFloat(percent) || 0, 0), 100),
          };
        })
        .sort((a, b) => b.count - a.count);
      setVentasDistribucion(distribution);
      setTop3(distribution.slice(0, 3));
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
      Alert.alert('Exito', 'Venta registrada');
      await loadAllData();
      setSelectedTorta(null);
    } catch (error) {
      mostrarErrorVenta(error);
    } finally {
      setRegistrandoVenta(false);
    }
  };

  const manejarSeleccionTorta = (torta) => {
    setPickerVisible(false);
    if (!torta || !torta.ID_TORTA) {
      return;
    }
    setSelectedTorta(torta);
  };

  const formatRangeLabel = useCallback((range) => {
    if (!range?.inicio || !range?.fin) {
      return DEFAULT_RANGE_LABEL;
    }
    try {
      const format = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit' });
      const start = format.format(new Date(range.inicio));
      const end = format.format(new Date(range.fin));
      return `${start} - ${end}`;
    } catch {
      return DEFAULT_RANGE_LABEL;
    }
  }, []);

  const gananciasPeriodoLabel = useMemo(
    () => formatRangeLabel(gananciasRange),
    [gananciasRange, formatRangeLabel]
  );

  const ventasPeriodoLabel = useMemo(
    () => formatRangeLabel(ventasRange),
    [ventasRange, formatRangeLabel]
  );
  const heroFootnote = useMemo(() => {
    if (!ventasPeriodoLabel) return 'Últimos 7 días';
    const parts = ventasPeriodoLabel.split(' - ');
    if (parts.length === 2) {
      return `Del ${parts[0]} al ${parts[1]}`;
    }
    return ventasPeriodoLabel;
  }, [ventasPeriodoLabel]);
  const quickActions = useMemo(
    () => [
      {
        label: 'Nueva torta',
        icon: 'ice-cream-outline',
        tint: 'rgba(124,58,237,0.12)',
        color: '#7c3aed',
        onPress: () => navigation.navigate('Tortas', { openAdd: true }),
      },
      {
        label: 'Nuevo ingrediente',
        icon: 'leaf-outline',
        tint: 'rgba(34,197,94,0.15)',
        color: '#16a34a',
        onPress: () => navigation.navigate('Ingredientes', { openAdd: true }),
      },
      {
        label: 'Recetas',
        icon: 'book-outline',
        tint: 'rgba(14,165,233,0.15)',
        color: '#0ea5e9',
        onPress: () => navigation.navigate('Recetas'),
      },
      {
        label: 'Ventas',
        icon: 'cart-outline',
        tint: 'rgba(249,115,22,0.15)',
        color: '#f97316',
        onPress: () => navigation.navigate('Ventas'),
      },
    ],
    [navigation]
  );
  const lowStockList = useMemo(
    () => (Array.isArray(ingredientesStock) ? ingredientesStock.slice(0, 5) : []),
    [ingredientesStock]
  );
  const topTortasList = useMemo(() => ventasDistribucion.slice(0, 5), [ventasDistribucion]);

  const selectedTortaDetail = useMemo(() => {
    if (!selectedTorta) return null;
    const precio = Number(selectedTorta.precio_lista ?? selectedTorta.precio ?? 0);
    const costo = Number(selectedTorta.costo_total ?? selectedTorta.costo ?? 0);
    const margen =
      precio > 0 && Number.isFinite(precio) && Number.isFinite(costo)
        ? Math.round(((precio - costo) / precio) * 100)
        : 0;
    return {
      nombre: selectedTorta.nombre_torta || selectedTorta.nombre || 'Torta seleccionada',
      descripcion: selectedTorta.descripcion_torta || selectedTorta.descripcion || '',
      precio: formatCurrency(precio),
      costo: formatCurrency(costo),
      margen,
    };
  }, [selectedTorta, formatCurrency]);

  const mostrarErrorVenta = useCallback((error) => {
    const detalles = Array.isArray(error?.details) ? error.details : [];
    if (detalles.length > 0) {
      const detalleTexto = detalles
        .map((item) => {
          const nombre = item?.nombre || 'Ingrediente';
          const disponible = Number(item?.disponible ?? 0);
          const requerido = Number(item?.requerido ?? 0);
          const faltante = Number(item?.faltante ?? Math.max(requerido - disponible, 0));
          const unidad = item?.unidad ? ` ${item.unidad}` : '';
          return [
            `- ${nombre}`,
            `   Disponible: ${disponible}${unidad}`,
            `   Necesario: ${requerido}${unidad}`,
            `   Falta: ${faltante}${unidad}`
          ].join('\n');
        })
        .join('\n\n');
      Alert.alert(
        'Stock insuficiente',
        `${error?.message || 'No se pudo registrar la venta'}\n\n${detalleTexto}`
      );
      return;
    }

    Alert.alert('Error', error?.message || 'No se pudo registrar la venta');
  }, []);

  const handleRegistrarVenta = () => {
    if (!selectedTorta || registrandoVenta) {
      if (!selectedTorta) {
        Alert.alert('Selecciona una torta', 'Primero elige una torta para registrar la venta.');
      }
      return;
    }
    Alert.alert(
      'Confirmar venta',
      `Registrar la venta de "${selectedTorta.nombre_torta}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () =>
            confirmarVenta(
              selectedTorta.ID_TORTA || selectedTorta.id_torta || selectedTorta.id || selectedTorta.ID
            ),
        },
      ]
    );
  };

  const limpiarSeleccionTorta = () => setSelectedTorta(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 32 }]}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Panel de control</Text>
          
          <View style={homeStyles.summaryCard}>
            <Text style={homeStyles.summaryTitle}>Ventas Totales</Text>
            <Text style={homeStyles.summarySubtitle}>{heroFootnote}</Text>
            <View style={homeStyles.summaryValueRow}>
              <Text style={homeStyles.summaryValue}>{resumenVentas.ingresos}</Text>
              <Text style={homeStyles.summaryCaptionSecondary}>Ingresos netos</Text>
            </View>
            <View style={homeStyles.summaryChipRow}>
              <View style={[homeStyles.summaryChip, { borderColor: ventasChip.color }]}>
                <Ionicons name={ventasChip.icon} size={14} color={ventasChip.color} />
                <Text style={[homeStyles.summaryChipText, { color: ventasChip.color }]}>
                  {ventasChip.label}
                </Text>
              </View>
              <Text style={homeStyles.summaryMuted}>{ventasSemanaActual} ventas esta semana</Text>
            </View>
          </View>

          <View style={[homeStyles.saleCard, homeStyles.heroSaleCard]}>
            <Text style={homeStyles.saleTitle}>Registrar venta</Text>
            <Text style={homeStyles.saleSubtitle}>
              Busca una torta y deja que el sistema actualice stock y ganancias.
            </Text>
            <View style={homeStyles.saleButtonRow}>
              <Pressable
                style={({ pressed }) => [
                  homeStyles.saleButtonSecondary,
                  pressed && { opacity: 0.85 },
                ]}
                onPress={abrirVenta}
              >
                <Ionicons name="search-outline" size={16} color="#0f172a" />
                <Text style={homeStyles.saleButtonSecondaryText}>Elegir torta</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  homeStyles.saleButtonPrimary,
                  (!selectedTorta || registrandoVenta) && homeStyles.saleButtonDisabled,
                  pressed && { opacity: 0.85 },
                ]}
                onPress={handleRegistrarVenta}
                disabled={!selectedTorta || registrandoVenta}
              >
                {registrandoVenta ? (
                  <>
                    <ActivityIndicator color="#fff" size="small" style={{ marginRight: 8 }} />
                    <Text style={homeStyles.saleButtonText}>Registrando...</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="cart-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={homeStyles.saleButtonText}>Registrar venta</Text>
                  </>
                )}
              </Pressable>
            </View>
            {selectedTortaDetail ? (
              <View style={homeStyles.tortaDetailCard}>
                <Text style={homeStyles.tortaDetailName}>{selectedTortaDetail.nombre}</Text>
                {selectedTortaDetail.descripcion ? (
                  <Text style={homeStyles.tortaDetailDesc}>{selectedTortaDetail.descripcion}</Text>
                ) : null}
                <View style={homeStyles.tortaDetailGrid}>
                  <View style={homeStyles.tortaDetailItem}>
                    <Text style={homeStyles.tortaDetailLabel}>Precio lista</Text>
                    <Text style={homeStyles.tortaDetailValue}>{selectedTortaDetail.precio}</Text>
                  </View>
                  <View style={homeStyles.tortaDetailItem}>
                    <Text style={homeStyles.tortaDetailLabel}>Costo</Text>
                    <Text style={homeStyles.tortaDetailValue}>{selectedTortaDetail.costo}</Text>
                  </View>
                  <View style={homeStyles.tortaDetailItem}>
                    <Text style={homeStyles.tortaDetailLabel}>Margen</Text>
                    <Text style={homeStyles.tortaDetailValue}>{selectedTortaDetail.margen}%</Text>
                  </View>
                </View>
                <Pressable onPress={limpiarSeleccionTorta} style={homeStyles.saleResetButton}>
                  <Ionicons name="refresh-outline" size={14} color="#0f172a" />
                  <Text style={homeStyles.saleResetText}>Cambiar torta</Text>
                </Pressable>
              </View>
            ) : (
              <Text style={homeStyles.saleHint}>Selecciona una torta para ver su detalle.</Text>
            )}
          </View>
        </View>



        <View style={homeStyles.sectionBlock}>
          <View style={homeStyles.sectionHeaderRow}>
            <Text style={homeStyles.sectionLabel}>Acciones rapidas</Text>
            <Text style={homeStyles.sectionHint}>Accede directo a tus modulos</Text>
          </View>
          <View style={homeStyles.quickActionsRow}>
            {quickActions.map((action) => (
              <Pressable
                key={action.label}
                onPress={action.onPress}
                style={({ pressed }) => [
                  homeStyles.actionCard,
                  pressed && { transform: [{ scale: 0.98 }] },
                ]}
              >
                <View style={[homeStyles.actionIconWrap, { backgroundColor: action.tint }]}>
                  <Ionicons name={action.icon} size={18} color={action.color} />
                </View>
                <Text style={homeStyles.actionLabel}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={homeStyles.boardGrid}>
          <View style={homeStyles.boardCard}>
            <View style={homeStyles.boardHeader}>
              <Text style={homeStyles.boardTitle}>Ingredientes con menos stock</Text>
            </View>
          {lowStockList.length > 0 ? (
            lowStockList.map((item) => {
              const stock = item?.CantidadStock ?? 0;
              const unidad = item?.unidad ? ` ${item.unidad}` : '';
              const isCritical = stock <= 0;
              const handleLowStockPress = () => {
                const ingredientId =
                  item?.id ??
                  item?.ID ??
                  item?.ID_Ingrediente ??
                  item?.ID_INGREDIENTE ??
                  item?.id_ingrediente ??
                  null;
                if (ingredientId) {
                  navigation.navigate('Ingredientes', { editId: ingredientId });
                } else {
                  navigation.navigate('Ingredientes');
                }
              };
              return (
                <View key={item?.id || item?.nombre} style={homeStyles.boardRow}>
                  <View style={homeStyles.boardRowHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={homeStyles.boardRowTitle}>{item?.nombre || 'Ingrediente'}</Text>
                      <Text style={homeStyles.boardRowMeta}>Stock actual: {stock}{unidad}</Text>
                      <View
                        style={[
                          homeStyles.stockChip,
                          { backgroundColor: isCritical ? 'rgba(248,113,113,0.15)' : 'rgba(251,191,36,0.2)' },
                        ]}
                      >
                        <Ionicons
                          name={isCritical ? 'alert-circle-outline' : 'alert-outline'}
                          size={12}
                          color="#b45309"
                        />
                        <Text style={homeStyles.stockChipText}>{isCritical ? 'Sin stock' : 'Bajo stock'}</Text>
                      </View>
                    </View>
                    <Pressable onPress={handleLowStockPress} hitSlop={8} style={homeStyles.boardRowAction}>
                      <Text style={[homeStyles.boardRowMeta, { color: '#b45309', fontFamily: 'Inter-SemiBold' }]}>
                        {isCritical ? 'Reponer urgente' : 'Reponer pronto'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={homeStyles.boardEmpty}>Sin alertas activas</Text>
          )}
          </View>

          <View style={homeStyles.boardCard}>
            <View style={homeStyles.boardHeader}>
              <Text style={homeStyles.boardTitle}>Top tortas</Text>
              <Pressable onPress={() => navigation.navigate('Tortas')}>
                <Text style={homeStyles.boardLink}>Ver catálogo</Text>
              </Pressable>
            </View>
            {topTortasList.length > 0 ? (
              topTortasList.map((t, i) => {
                const percent = t.percentNumber ?? Math.min(parseFloat(t.percent) || 0, 100);
                return (
                  <View key={t.name} style={homeStyles.rankRow}>
                    <View style={homeStyles.rankBadge}>
                      <Text style={homeStyles.rankBadgeText}>{i + 1}</Text>
                    </View>
                    <View style={homeStyles.rankContent}>
                      <View style={homeStyles.rankHeader}>
                        <Text style={homeStyles.name} numberOfLines={1}>
                          {t.name}
                        </Text>
                        <View style={homeStyles.rankChip}>
                          <Ionicons name="pie-chart-outline" size={12} color="#0f172a" />
                          <Text style={homeStyles.rankChipText}>{percent}%</Text>
                        </View>
                      </View>
                      <Text style={homeStyles.rankPercent}>{t.count} ventas registradas</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={homeStyles.boardEmpty}>Todavía no registraste ventas.</Text>
            )}
          </View>
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



