import { StyleSheet } from 'react-native';
import { colors, spacing, radii, shadows } from '../src/theme/tokens';

const styles = StyleSheet.create({
  // Contenedor general
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  scrollContainer: {
    padding: spacing.sm,
  },

  // Hero Section
  heroSection: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textMuted,
    fontFamily: 'Inter-Medium',
    marginBottom: spacing.lg,
  },

  // Buscador
  searchInput: {
    marginVertical: 10,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
  },

  // Ingredientes Card
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    shadowColor: 'rgba(15,23,42,0.1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: shadows.md.elevation,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.text,
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
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPrimario: {
    backgroundColor: colors.primary,
    elevation: shadows.md.elevation,
    shadowColor: 'rgba(15,23,42,0.35)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  botonSecundario: {
    backgroundColor: colors.secondary,
  },
  botonTexto: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  botonSecundarioTexto: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
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
    fontFamily: 'Inter-Medium',
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
    fontFamily: 'Inter-Medium',
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
    fontFamily: 'Inter-Medium',
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
    fontFamily: 'Inter-Medium',
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
    fontFamily: 'Inter-Bold',
  },

  // Secciones
  seccion: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg + 4,
    marginVertical: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: 'rgba(15,23,42,0.08)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  seccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seccionTitulo: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  seccionLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.sm,
    backgroundColor: `${colors.primary}18`,
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
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg + 4,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: 'rgba(15,23,42,0.08)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  metricaValor: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
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
    fontFamily: 'Inter-Bold',
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 12,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    margin: 0,
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
  unitChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -4,
    marginBottom: 8,
    gap: 8,
  },
  unitChip: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 999,
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  unitChipSelected: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  unitChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  unitChipSelectedText: {
    color: '#fff',
  },
  quickAdjustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  quickAdjustButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(15,23,42,0.06)',
  },
  quickAdjustText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
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
    flex: 1,
    borderRadius: 10,
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
  listCard: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
    marginHorizontal: 2,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  listMeta: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  listRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  separator: {
    height: 12,
  },
  modalInfoPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(15,23,42,0.05)',
    marginBottom: 12,
  },
  modalInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  modalInfoText: {
    flex: 1,
  },
  modalInfoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  modalInfoSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  modalInfoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  modalInfoBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0f172a',
  },
  modalSummarySection: {
    marginTop: 12,
    gap: 12,
  },
  modalSummaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  modalSummaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#edeff7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSummaryLabel: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalSummaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  modalSummaryMeta: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  modalSummaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5f5',
  },
  modalSummaryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0f172a',
  },
  modalQuickRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
    marginBottom: 8,
  },
  modalQuickCard: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  modalQuickLabel: {
    fontSize: 11,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalQuickValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 4,
  },
  modalQuickOk: {
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderColor: 'rgba(34,197,94,0.4)',
  },
  modalQuickDanger: {
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderColor: 'rgba(239,68,68,0.4)',
  },
  modalSectionLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
    marginTop: 8,
  },
  stockPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  stockPillOk: {
    backgroundColor: 'rgba(22,163,74,0.15)',
  },
  stockPillWarn: {
    backgroundColor: 'rgba(251,191,36,0.2)',
  },
  stockPillDanger: {
    backgroundColor: 'rgba(248,113,113,0.2)',
  },
  stockPillText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#0f172a',
  },
  editLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(15,23,42,0.04)',
  },
  editLinkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  actionsColumn: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 16,
    paddingHorizontal: 0,
  },
  footerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  destructiveButton: {
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  destructiveButtonContent: {
    justifyContent: 'center',
  },
  outlinedButton: {
    flex: 1,
    borderRadius: 10,
  },
});

const tortaStyles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    margin: 0,
  },
  addButton: {
    borderRadius: 999,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  screenSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  searchInput: {
    marginBottom: 12,
  },
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
    alignItems: 'stretch',
    marginBottom: 16,
  },
  previewImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  previewImageLarge: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: 'stretch',
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
  listCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 2,
    borderLeftWidth: 4,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  listMeta: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 8,
  },
  listStats: {
    gap: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  listValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  listRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  marginPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  marginPillOk: {
    backgroundColor: 'rgba(34,197,94,0.15)',
  },
  marginPillWarn: {
    backgroundColor: 'rgba(249,115,22,0.15)',
  },
  marginPillDanger: {
    backgroundColor: 'rgba(248,113,113,0.18)',
  },
  marginPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  separator: {
    height: 12,
  },
  modalSectionLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#475569',
    marginTop: 12,
    marginBottom: 8,
  },
  modalSummarySection: {
    gap: 12,
    marginBottom: 12,
  },
  modalSummaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#fff',
  },
  modalSummaryContent: {
    flex: 1,
  },
  modalSummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  modalSummaryMeta: {
    fontSize: 12,
    color: '#475569',
  },
  modalSummaryImage: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  summaryLink: {
    alignSelf: 'flex-start',
    marginTop: -4,
  },
  modalQuickRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 10,
  },
  modalQuickCard: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  modalQuickLabel: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalQuickValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 4,
  },
  modalQuickHighlight: {
    borderColor: 'rgba(14,165,233,0.4)',
    backgroundColor: 'rgba(14,165,233,0.08)',
  },
  quickAdjustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  quickAdjustButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(15,23,42,0.06)',
  },
  quickAdjustNegative: {
    backgroundColor: 'rgba(239,68,68,0.12)',
  },
  quickAdjustText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  modalHint: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
  },
  actionsColumn: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 16,
    paddingHorizontal: 0,
  },
  footerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  destructiveButton: {
    borderRadius: 10,
  },
  destructiveButtonContent: {
    justifyContent: 'center',
  },
  outlinedButton: {
    flex: 1,
    borderRadius: 10,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 10,
  },
});


const homeStyles = StyleSheet.create({
  heroIntro: {
    fontSize: 15,
    color: colors.textSubtle,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  heroHint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#f4f8ff',
    borderRadius: 28,
    paddingVertical: spacing.lg + 6,
    paddingHorizontal: spacing.lg,
    shadowColor: 'rgba(15,23,42,0.15)',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 8,
    borderWidth: 0,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#0f172a',
  },
  summarySubtitle: {
    fontSize: 13,
    color: '#0f172a',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(14,165,233,0.15)',
    fontFamily: 'Inter-SemiBold',
  },
  summaryValue: {
    fontSize: 34,
    fontFamily: 'Inter-Black',
    color: '#0f172a',
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  summaryCaptionSecondary: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#475569',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    alignSelf: 'center',
    borderRadius: radii.pill,
    backgroundColor: 'rgba(59,130,246,0.15)',
  },
  summaryChipRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  summaryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    maxWidth: '100%',
    alignSelf: 'flex-start',
  },
  summaryChipText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  summaryMuted: {
    fontSize: 12,
    color: '#475569',
  },
  summaryMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  summaryMetaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  summaryMetaPillText: {
    fontSize: 12,
    color: '#0f172a',
  },
  heroSaleCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 28,
    borderWidth: 0,
    padding: spacing.lg,
    shadowColor: 'rgba(15,23,42,0.12)',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 7,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionGroup: {
    width: '100%',
  },
  quickActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    width: '100%',
  },
  boardGrid: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
  boardCard: {
    width: '100%',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boardRowHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    width: '100%',
  },
  boardRowAction: {
    alignSelf: 'flex-start',
  },
  boardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  boardLink: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: 'Inter-SemiBold',
  },
  boardRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  boardRowTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  boardRowMeta: {
    fontSize: 12,
    color: colors.textSubtle,
  },
  stockChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: 999,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  stockChipText: {
    fontSize: 11,
    color: '#b45309',
    fontFamily: 'Inter-Medium',
  },
  stockMeterTrack: {
    width: '100%',
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.border,
    marginTop: spacing.xs,
    overflow: 'hidden',
  },
  stockMeterFill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: '#f97316',
  },
  boardEmpty: {
    fontSize: 13,
    color: colors.textSubtle,
  },
  sectionBlock: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionHint: {
    fontSize: 12,
    color: colors.textSubtle,
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: 'rgba(15,23,42,0.06)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  actionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  actionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  saleCard: {
    width: '100%',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saleHeader: {
    marginBottom: spacing.sm,
  },
  saleTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  saleSubtitle: {
    fontSize: 14,
    color: colors.textSubtle,
    marginTop: 4,
  },
  saleMetaRow: {
    flexDirection: 'column',
    marginTop: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  saleMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  saleMetaText: {
    fontSize: 13,
    color: colors.text,
  },
  saleButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  saleButtonPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 4,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    shadowColor: 'rgba(15,23,42,0.25)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
    gap: spacing.xs,
  },
  saleButtonSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    gap: spacing.xs,
  },
  saleButtonSecondaryText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Inter-Medium',
  },
  saleButtonDisabled: {
    opacity: 0.5,
  },
  saleButtonText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
  },
  saleHint: {
    marginTop: spacing.sm,
    fontSize: 13,
    color: colors.textSubtle,
  },
  tortaDetailCard: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceMuted,
  },
  tortaDetailName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.text,
  },
  tortaDetailDesc: {
    fontSize: 13,
    color: colors.textSubtle,
    marginTop: 2,
  },
  tortaDetailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  tortaDetailItem: {
    width: '48%',
    marginBottom: spacing.sm,
  },
  tortaDetailLabel: {
    fontSize: 11,
    color: colors.textSubtle,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  tortaDetailValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  saleResetButton: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  saleResetText: {
    fontSize: 13,
    color: colors.text,
    textDecorationLine: 'underline',
  },
  stockList: {
    gap: spacing.sm,
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  stockName: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: colors.text,
  },
  stockMeta: {
    fontSize: 12,
    color: colors.textSubtle,
    marginTop: 2,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251,191,36,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    gap: 4,
  },
  stockBadgeText: {
    color: '#b45309',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  rankBadgeText: {
    fontWeight: '700',
    color: colors.primary,
  },
  rankContent: {
    flex: 1,
  },
  rankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  rankChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(99,102,241,0.15)',
  },
  rankChipText: {
    fontSize: 12,
    color: '#312e81',
    fontFamily: 'Inter-SemiBold',
  },
  name: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Inter-SemiBold',
  },
  rankValue: {
    fontSize: 12,
    color: colors.textSubtle,
  },
  rankBarTrack: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  rankBarFill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.secondary,
  },
  rankPercent: {
    fontSize: 12,
    color: colors.textSubtle,
    marginTop: 4,
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
