import React from 'react';
import { View, Text } from 'react-native';
import { Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const compact = (n) => {
  const num = typeof n === 'number' ? n : parseFloat(n || 0);
  if (!isFinite(num)) return '0';
  if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  try { return new Intl.NumberFormat('es-AR').format(num); } catch { return String(num); }
};

const MetricCard = ({ icon, value, label, subtitle, color, loading, currency = false, delta = null, deltaUnit = '%' }) => {
  const theme = useTheme();
  const accent = color || theme.colors.primary;

  return (
    <Card mode="elevated" style={{ flex: 1 }}>
      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          {icon ? (
            <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: `${accent}22`, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
              {icon}
            </View>
          ) : null}
          <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>{label}</Text>
        </View>
        <View style={{ minHeight: 28, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {loading ? (
            <ActivityIndicator size={16} />
          ) : (
            <Text
              style={{ fontSize: 22, fontWeight: '700', color: theme.colors.onSurface }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {currency ? `$ ${compact(value)}` : compact(value)}
            </Text>
          )}
        </View>
        {!loading && delta !== null && delta !== undefined && (
          <View style={{ marginTop: 6, flexDirection: 'row', alignItems: 'center' }}>
            {(() => {
              const d = typeof delta === 'string' ? parseFloat(delta) : delta;
              const up = d > 0;
              const same = d === 0 || !isFinite(d);
              const color = same ? theme.colors.onSurfaceVariant : (up ? '#2e7d32' : '#c62828');
              const bg = same ? '#00000014' : (up ? '#2e7d3214' : '#c6282814');
              const sign = up ? '+' : '';
              const text = isNaN(d) ? '-' : `${sign}${Math.round(d)}${deltaUnit}`;
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: bg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 }}>
                  {!same && (<Ionicons name={up ? 'trending-up' : 'trending-down'} size={14} color={color} style={{ marginRight: 4 }} />)}
                  <Text style={{ fontSize: 12, color }}>{text}</Text>
                  {!same && (
                    <Text style={{ fontSize: 12, color, marginLeft: 4 }}>vs semana</Text>
                  )}
                </View>
              );
            })()}
          </View>
        )}
        {subtitle ? (
          <Text style={{ marginTop: 6, fontSize: 12, color: theme.colors.onSurfaceVariant }}>{subtitle}</Text>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default MetricCard;
