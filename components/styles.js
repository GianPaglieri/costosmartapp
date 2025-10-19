import { StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../src/theme/tokens';

const styles = StyleSheet.create({
  // Contenedor general
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  scrollContainer: {
    padding: 5,
  },

  // Hero Section
  heroSection: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 20,
  },

  // Buscador
  searchInput: {
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
    
  },

  // Ingredientes Card
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginBottom: spacing.lg,
    elevation: 2,
    padding: spacing.lg,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  cardImage: {
    height: 200,
    width: '100%',
    backgroundColor: '#f8f9fa',
  },

  // Botones generales
  boton: {
    borderRadius: 10,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPrimario: {
    backgroundColor: colors.primary,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  botonSecundario: {
    backgroundColor: colors.secondary,
  },
  botonTexto: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  botonSecundarioTexto: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },

  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  fixedHeight: {
    height: 45,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    overflow: 'hidden',
  },
  modalContentScroll: {
    maxHeight: '80%',
  },

  // Modals
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Aumentamos el ancho máximo para que el modal sea más amplio
  modalContenido: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.lg,
    width: '90%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  modalTitulo: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    marginBottom: 12,
    textAlign: 'center',
  },
  // Contenedor de acciones sin wrapping (quedarán en una sola línea)
  modalActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',           // permite envolver si faltara espacio
    justifyContent: 'space-between',
    marginTop: 12,
  },
  // Botones del modal con menor minWidth y padding
  modalButton: {
    flex: 1,                    // reparte el ancho equitativamente
    margin: 1,                  // separación entre ellos
    minWidth: 80,               // evita que sean demasiado pequeños
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Estilo para el label de los botones del modal
  modalButtonLabel: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  botonCompacto: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Colores específicos para botones del modal
  cancelButton: {
    backgroundColor: '#d3d3d3',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
  },

  // Input Fields – estilo outlined simplificado
  input: {
  paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    color: colors.primary,
    marginBottom:4,
  },

  // Botón para agregar ingrediente
  agregarIngredienteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    marginTop: 4,
  },
  agregarIngredienteBoton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#e0f2fe',
  },
  agregarIngredienteTexto: {
    marginLeft: 6,
    fontSize: 14,
    color: '#1d4ed8',
    fontWeight: '600',
  },
  agregarIngredienteHint: {
    flexShrink: 1,
    fontSize: 12,
    color: '#64748b',
  },
  botonVerTorta: {
    backgroundColor: '#6c757d',
  },
  botonVerTortaTexto: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  encabezadoIngredientes: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },

  // Stock Items
  itemStock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  itemStockTexto: {
    fontSize: 15,
    color: '#333',
  },
  itemStockCantidad: {
    fontSize: 15,
    color: '#dc3545',
    fontFamily: 'Roboto-Bold',
  },

  // Secciones
  seccion: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg + 4,
    marginVertical: spacing.sm + 2,
    elevation: 1,
  },
  seccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seccionTitulo: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: colors.text,
  },
  seccionLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.sm,
    backgroundColor: '#1976d220',
  },

  // Searchbar
  searchbar: {
    marginBottom: 16,
  },

  // Card Actions
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },

  // Métricas Cards
  metricasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  metricaCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  metricaValor: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: colors.primary,
    marginBottom: 4,
    lineHeight: 20,
  },
  metricaLabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 2,
  },
  metricasPeriodo: {
    fontSize: 12,
    color: '#999',
  },

  // Item Stock Modal
  itemStockModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  itemStockModalTexto: {
    fontSize: 16,
    color: '#333',
  },
  itemStockModalCantidad: {
    fontSize: 16,
    color: '#dc3545',
    fontFamily: 'Roboto-Bold',
  },

  // Otras secciones de stock y listas
  ingredientesContainer: {
    maxHeight: 200,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
  },
  ingredienteItem: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  ingredienteHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredienteMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ingredienteCostosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ingredienteCostoLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  ingredienteCostoValor: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  ingredienteCostoSubtotal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0369a1',
  },
  ingredienteCantidadWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredienteNombre: {
    fontSize: 15,
    flex: 1,
    marginRight: 10,
    color: '#111827',
    fontWeight: '600',
  },
  cantidadInput: {
    width: 90,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  resumenCostosWrapper: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resumenCostosFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  resumenEtiqueta: {
    fontSize: 13,
    color: '#64748b',
  },
  resumenValor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  resumenValorSecundario: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  resumenValorDiferencia: {
    fontSize: 15,
    fontWeight: '700',
  },
  costoAumento: {
    color: '#dc2626',
  },
  costoReduccion: {
    color: '#059669',
  },
  costoNeutro: {
    color: '#475569',
  },
  ingredientesScrollContent: {
    paddingTop: 4,
    paddingBottom: 12,
  },
  ingredienteItemWrapper: {
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  addButtonText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

const ingredientStyles = StyleSheet.create({
  dialog: {
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  modalHeaderMargin: {
    marginBottom: 12,
  },
  modalActionsBetween: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  actionsAlign: {
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  ingredientUnit: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  ingredientPrice: {
    fontSize: 14,
    color: '#555',
  },
  primaryButton: {
    marginLeft: 8,
  },
  labelGray: {
    color: '#6b7280',
  },
  buttonContent: {
    paddingHorizontal: 12,
  },
  mb12: {
    marginBottom: 12,
  },
  mb16: {
    marginBottom: 16,
  },
  mb4: {
    marginBottom: 4,
  },
  cardPadding: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
});

const tortaStyles = StyleSheet.create({
  dialog: {
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  modalHeaderMargin: {
    marginBottom: 12,
  },
  mb12: {
    marginBottom: 12,
  },
  imageContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageActions: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionTextBlue: {
    color: '#007bff',
    fontSize: 12,
  },
  actionTextDelete: {
    color: '#dc3545',
    fontSize: 12,
  },
  uploadText: {
    color: '#007bff',
    marginTop: 4,
  },
  modalActionsBetween: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  actionsAlign: {
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  viewRecipeButton: {
    marginLeft: 8,
  },
  primaryButton: {
    marginLeft: 8,
  },
  labelGray: {
    color: '#6b7280',
  },
  buttonContent: {
    paddingHorizontal: 12,
  },
  cardMargin: {
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
});


const homeStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  info: {
    fontSize: 12,
    color: '#007bff',
    marginLeft: 8,
  },
});

const ventaStyles = StyleSheet.create({
  listContent: {
    paddingBottom: 56,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  titleBlock: {
    marginBottom: 18,
  },
  rangeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  rangeChip: {
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  rangeChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  rangeChipText: {
    color: '#1f2937',
  },
  rangeChipTextActive: {
    color: '#fff',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  summaryCardPrimary: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
    shadowOpacity: 0.12,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.6,
  },
  summaryLabelOnPrimary: {
    color: '#e0e7ff',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  summaryValuePrimary: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  summaryCaption: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
  },
  summaryCaptionOnPrimary: {
    color: '#dbeafe',
  },
  chartContainer: {
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  chartHint: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  recentContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentHint: {
    fontSize: 12,
    color: '#6b7280',
  },
  recentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eef1f5',
  },
  recentRowLast: {
    borderBottomWidth: 0,
  },
  recentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  recentMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  recentAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#16a34a',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 28,
    marginBottom: 12,
  },
  emptyLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 16,
  },
  emptyHint: {
    marginTop: 8,
    color: '#6b7280',
    textAlign: 'center',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressable: {
  paddingHorizontal: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    paddingRight: 14,
  },
  badgeCount: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  badgeText: {
    color: '#1d4ed8',
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  sum: {
    color: '#16a34a',
    fontWeight: '700',
  },
  pill: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1d4ed8',
  },
  detailContainer: {
    maxHeight: 200,
    borderTopWidth: 1,
    borderColor: '#eef1f5',
    backgroundColor: '#f9fafb',
  },
  detailScroll: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  detailPrice: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#eef1f5',
  },
});

export { ingredientStyles, tortaStyles, homeStyles, ventaStyles };



export default styles;
