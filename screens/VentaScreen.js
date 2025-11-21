import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Divider, Chip } from 'react-native-paper';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import styles, { ventaStyles } from '../components/styles';
import TortaPickerModal from '../components/TortaPickerModal';
import { obtenerVentas, registrarVenta } from '../controllers/VentaController';

const RANGE_OPTIONS = [
  { key: '7', label: 'Ultimos 7 dias', days: 7 },
  { key: '30', label: 'Ultimos 30 dias', days: 30 },
  { key: 'all', label: 'Todo' },
];

const CHART_HEIGHT = 220;
const CHART_INSET_X = 24;
const CHART_INSET_Y = 26;

const formatCurrency = value => {
  const numeric = Math.round(Number(value) || 0);
  try {
    return `$${numeric.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  } catch (error) {
    return `$${numeric.toFixed(0)}`;
  }
};

const formatDay = value => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
};

export default function SalesByCakeScreen() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [range, setRange] = useState('7');

  const chartWidth = useMemo(() => Math.max(Dimensions.get('window').width - 64, 260), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await obtenerVentas();
      const enriched = (raw || []).map(v => {
        const price = parseFloat(v?.precio_torta) || 0;
        const parsedDate = v?.fecha_venta ? new Date(v.fecha_venta) : null;
        return {
          ...v,
          parsedDate,
          price,
          tortaNombre: v?.Torta?.nombre_torta || 'Sin nombre',
        };
      });
      setVentas(enriched);
    } catch (error) {
      Alert.alert('Error', 'No pudimos cargar las ventas');
    } finally {
      setLoading(false);
    }
  }, []);

  const [pickerOpen, setPickerOpen] = React.useState(false);
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
            `• ${nombre}`,
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

  const handleRegisterSale = async (torta) => {
    if (!torta) return;
    try {
      await registrarVenta(torta.ID_TORTA || torta.id || torta.ID);
      // refresh
      await loadData();
    } catch (error) {
      mostrarErrorVenta(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const filtered = useMemo(() => {
    const option = RANGE_OPTIONS.find(r => r.key === range);
    if (!option || option.key === 'all') {
      return ventas;
    }
    const now = Date.now();
    const limitMs = option.days * 24 * 60 * 60 * 1000;
    return ventas.filter(v => v.parsedDate && now - v.parsedDate.getTime() <= limitMs);
  }, [ventas, range]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach(v => {
      const key = v.tortaNombre;
      if (!map.has(key)) {
        map.set(key, { name: key, count: 0, sum: 0, items: [] });
      }
      const bucket = map.get(key);
      bucket.count += 1;
      bucket.sum += v.price;
      bucket.items.push(v);
    });
    return Array.from(map.values())
      .map(item => ({
        ...item,
        average: item.count ? item.sum / item.count : 0,
        items: item.items.sort((a, b) => (b.parsedDate && a.parsedDate ? b.parsedDate - a.parsedDate : 0)),
      }))
      .sort((a, b) => b.count - a.count);
  }, [filtered]);

  const totals = useMemo(() => {
    const totalRevenue = filtered.reduce((acc, sale) => acc + sale.price, 0);
    const totalCount = filtered.length;
    const avgTicket = totalCount ? totalRevenue / totalCount : 0;
    const top = grouped[0];
    return {
      totalRevenue,
      totalCount,
      avgTicket,
      topName: top?.name || 'Sin datos',
      topCount: top?.count || 0,
      uniqueCakes: grouped.length,
    };
  }, [filtered, grouped]);

  const recentSales = useMemo(() => (
    [...filtered]
      .sort((a, b) => (b.parsedDate && a.parsedDate ? b.parsedDate - a.parsedDate : 0))
      .slice(0, 5)
  ), [filtered]);

  const timelineSeries = useMemo(() => {
    const buckets = new Map();
    filtered.forEach(sale => {
      if (!sale.parsedDate) return;
      const day = new Date(sale.parsedDate.getFullYear(), sale.parsedDate.getMonth(), sale.parsedDate.getDate());
      const key = day.getTime();
      if (!buckets.has(key)) {
        buckets.set(key, { x: day, y: 0, label: formatDay(day) });
      }
      const bucket = buckets.get(key);
      bucket.y += sale.price;
    });
    return Array.from(buckets.values()).sort((a, b) => a.x - b.x);
  }, [filtered]);

  const timelineGeometry = useMemo(() => {
    if (timelineSeries.length === 0) {
      return null;
    }
    const minX = timelineSeries[0].x.getTime();
    const maxX = timelineSeries[timelineSeries.length - 1].x.getTime();
    const maxY = Math.max(...timelineSeries.map(item => item.y), 0) || 1;
    const spanX = maxX - minX || 1;
    const availWidth = Math.max(chartWidth - CHART_INSET_X * 2, 1);
    const availHeight = Math.max(CHART_HEIGHT - CHART_INSET_Y * 2, 1);

    const points = timelineSeries.map(item => {
      const ratioX = spanX === 0 ? 0.5 : (item.x.getTime() - minX) / spanX;
      const ratioY = Math.min(1, item.y / maxY);
      const xPos = CHART_INSET_X + ratioX * availWidth;
      const yPos = CHART_HEIGHT - CHART_INSET_Y - ratioY * availHeight;
      return { ...item, xPos, yPos, ratioX };
    });

    const strokePath = points.reduce((acc, point, index) => {
      const command = `${point.xPos.toFixed(2)} ${point.yPos.toFixed(2)}`;
      return index === 0 ? `M ${command}` : `${acc} L ${command}`;
    }, '');

    const baselineY = (CHART_HEIGHT - CHART_INSET_Y).toFixed(2);
    const firstX = points[0] ? points[0].xPos.toFixed(2) : CHART_INSET_X.toFixed(2);
    const lastX = points[points.length - 1] ? points[points.length - 1].xPos.toFixed(2) : firstX;
    const fillPath = `${strokePath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;

    const tickCount = Math.min(points.length, 4);
    const tickIndices = tickCount > 1
      ? Array.from({ length: tickCount }, (_, idx) => Math.round(idx * (points.length - 1) / (tickCount - 1)))
      : [0];

    const ticks = tickIndices.map(idx => ({
      label: points[idx].label,
      ratioX: points[idx].ratioX,
    }));

    return {
      points,
      strokePath,
      fillPath,
      ticks,
      maxY,
    };
  }, [timelineSeries, chartWidth]);

  const toggle = name => {
    setExpanded(prev => (prev === name ? null : name));
  };

  const renderChart = () => {
    if (!timelineGeometry) {
      return null;
    }

    const { points, strokePath, fillPath, ticks } = timelineGeometry;

    return (
      <View style={ventaStyles.chartContainer}>
        <View style={ventaStyles.chartCard}>
          <Text style={ventaStyles.chartTitle}>Tendencia diaria</Text>
          <Text style={ventaStyles.chartHint}>
            Evolucion del ingreso diario dentro del rango seleccionado.
          </Text>

          <Svg width={chartWidth} height={CHART_HEIGHT}>
            <Defs>
              <LinearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <Stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Path d={fillPath} fill="url(#salesGradient)" stroke="none" />
            <Path d={strokePath} stroke="#2563eb" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {points.map((point, idx) => (
              <Circle key={`point-${idx}`} cx={point.xPos} cy={point.yPos} r={4} fill="#1d4ed8" />
            ))}
          </Svg>

          <View style={[ventaStyles.chartAxisRow, { width: chartWidth }]}>
            {ticks.map((tick, idx) => {
              const left = CHART_INSET_X + tick.ratioX * Math.max(chartWidth - CHART_INSET_X * 2, 1) - 18;
              return (
                <View key={`tick-${idx}`} style={[ventaStyles.chartTickMarker, { left }]}> 
                  <Text style={ventaStyles.chartTickLabel}>{tick.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={ventaStyles.headerContainer}>
      <View style={ventaStyles.titleBlock}>
        <Text style={styles.heroTitle}>Panel de ventas</Text>
        <Text style={styles.heroSubtitle}>Monitoreo de comportamiento por torta</Text>
      </View>

      <View style={ventaStyles.rangeRow}>
        {RANGE_OPTIONS.map(option => (
          <Chip
            key={option.key}
            selected={range === option.key}
            onPress={() => setRange(option.key)}
            style={[
              ventaStyles.rangeChip,
              range === option.key && ventaStyles.rangeChipActive,
            ]}
            textStyle={range === option.key ? ventaStyles.rangeChipTextActive : ventaStyles.rangeChipText}
            mode={range === option.key ? 'contained' : 'outlined'}
            compact
          >
            {option.label}
          </Chip>
        ))}
      </View>

      <View style={ventaStyles.summaryGrid}>
        <View style={[ventaStyles.summaryCard, ventaStyles.summaryCardPrimary]}>
          <Text style={[ventaStyles.summaryLabel, ventaStyles.summaryLabelOnPrimary]}>Ingresos</Text>
          <Text style={ventaStyles.summaryValuePrimary}>{formatCurrency(totals.totalRevenue)}</Text>
          <Text style={[ventaStyles.summaryCaption, ventaStyles.summaryCaptionOnPrimary]}>
            {totals.totalCount} ventas en este rango
          </Text>
        </View>
        <View style={ventaStyles.summaryCard}>
          <Text style={ventaStyles.summaryLabel}>Ticket promedio</Text>
          <Text style={ventaStyles.summaryValue}>{formatCurrency(totals.avgTicket)}</Text>
          <Text style={ventaStyles.summaryCaption}>Basado en {totals.totalCount || 0} operaciones</Text>
        </View>
        <View style={ventaStyles.summaryCard}>
          <Text style={ventaStyles.summaryLabel}>Tortas activas</Text>
          <Text style={ventaStyles.summaryValue}>{totals.uniqueCakes}</Text>
          <Text style={ventaStyles.summaryCaption}>Variedades vendidas</Text>
        </View>
        <View style={ventaStyles.summaryCard}>
          <Text style={ventaStyles.summaryLabel}>Mas vendida</Text>
          <Text style={ventaStyles.summaryValue}>{totals.topName}</Text>
          <Text style={ventaStyles.summaryCaption}>{totals.topCount} ventas</Text>
        </View>
      </View>

      {renderChart()}

      {recentSales.length > 0 && (
        <View style={ventaStyles.recentContainer}>
          <View style={ventaStyles.recentHeader}>
            <Text style={ventaStyles.sectionTitle}>Ventas recientes</Text>
            <Text style={ventaStyles.recentHint}>{recentSales.length} movimientos</Text>
          </View>
          {recentSales.map((sale, idx) => (
            <View
              key={`${sale.id || idx}-recent`}
              style={[ventaStyles.recentRow, idx === recentSales.length - 1 && ventaStyles.recentRowLast]}
            >
              <View>
                <Text style={ventaStyles.recentName}>{sale.tortaNombre}</Text>
                <Text style={ventaStyles.recentMeta}>
                  {sale.parsedDate ? sale.parsedDate.toLocaleDateString() : 'Sin fecha'}
                </Text>
              </View>
              <Text style={ventaStyles.recentAmount}>{formatCurrency(sale.price)}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={ventaStyles.sectionTitle}>Ventas por torta</Text>
      {filtered.length === 0 && (
        <Text style={ventaStyles.emptyLabel}>No se registran ventas en este rango.</Text>
      )}
    </View>
  );

  const renderItem = ({ item }) => {
    const isOpen = expanded === item.name;
    const chevron = isOpen ? 'chevron-up' : 'chevron-down';

    return (
      <Card style={ventaStyles.card}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => toggle(item.name)}
          style={ventaStyles.cardPressable}
        >
          <View style={ventaStyles.headerRow}>
            <View style={ventaStyles.badgeCount}>
              <Text style={ventaStyles.badgeText}>{item.count}</Text>
            </View>
            <View style={ventaStyles.info}>
              <Text style={ventaStyles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={ventaStyles.metaRow}>
                <Text style={ventaStyles.subtitle}>
                  Ingresos: <Text style={ventaStyles.sum}>{formatCurrency(item.sum)}</Text>
                </Text>
                <View style={ventaStyles.pill}>
                  <Text style={ventaStyles.pillText}>{formatCurrency(item.average)} ticket</Text>
                </View>
              </View>
            </View>
            <Ionicons name={chevron} size={18} color="#475569" />
          </View>
        </TouchableOpacity>

        {isOpen && (
          <View style={ventaStyles.detailContainer}>
            <ScrollView
              style={ventaStyles.detailScroll}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              {item.items.map((v, idx) => (
                <View key={`${v.id || idx}-detail`}>
                  <View style={ventaStyles.detailRow}>
                    <Text style={ventaStyles.detailDate} numberOfLines={1}>
                      {v.parsedDate ? v.parsedDate.toLocaleDateString() : 'Sin fecha'}
                    </Text>
                    <Text style={ventaStyles.detailPrice}>{formatCurrency(v.price)}</Text>
                  </View>
                  {idx < item.items.length - 1 && <Divider style={ventaStyles.detailDivider} />}
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </Card>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />;
  }

  if (ventas.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="cart-outline" size={72} color="#cbd5f5" style={{ marginBottom: 16 }} />
        <Text style={styles.heroSubtitle}>Todavia no hay ventas registradas</Text>
        <Text style={ventaStyles.emptyHint}>
          Registra una venta desde el inicio para comenzar a ver datos.
        </Text>
        <TortaPickerModal visible={pickerOpen} onDismiss={() => setPickerOpen(false)} onSelect={handleRegisterSale} />
        <Ionicons.Button name="add" backgroundColor="#2563eb" onPress={() => setPickerOpen(true)} style={{ marginTop: 12 }}>Registrar venta</Ionicons.Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={grouped}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={ventaStyles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <TortaPickerModal visible={pickerOpen} onDismiss={() => setPickerOpen(false)} onSelect={handleRegisterSale} />
      <Ionicons.Button name="add" backgroundColor="#2563eb" onPress={() => setPickerOpen(true)} style={{ position: 'absolute', right: 16, bottom: 20 }}>Registrar venta</Ionicons.Button>
    </View>
  );
}


