import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Contenedor general
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
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
    color: '#1a1a1a',
    marginBottom: 4,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },

  // Buscador
  searchInput: {
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
    
  },

  // Ingredientes Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
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
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPrimario: {
    backgroundColor: '#007bff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  botonSecundario: {
    backgroundColor: '#007bff',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  botonSecundarioTexto: {
    color: '#007bff',
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
    borderColor: '#ddd',
    borderRadius: 8,
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  // Colores específicos para botones del modal
  cancelButton: {
    backgroundColor: '#d3d3d3',
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
  },

  // Input Fields – estilo outlined simplificado
  input: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    color: '#007bff',
    marginBottom:4,
  },

  // Botón para agregar ingrediente
  botonAgregarIngrediente: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  botonAgregarTexto: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
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
    color: '#1a1a1a',
  },
  seccionLink: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#007bff10',
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
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: '#007bff',
    marginBottom: 4,
  },
  metricaLabel: {
    fontSize: 15,
    color: '#444',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  ingredienteNombre: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  cantidadInput: {
    width: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
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
  modalActionsEnd: {
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
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
  ingredientUnit: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  ingredientPrice: {
    fontSize: 14,
    color: '#555',
  },
  saveButton: {
    marginLeft: 8,
    backgroundColor: '#007bff',
  },
  deleteLabel: {
    color: '#dc3545',
    marginLeft: 4,
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
  labelGray: {
    color: '#666',
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
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  deleteLabel: {
    color: '#dc3545',
    marginLeft: 4,
  },
  viewRecipeButton: {
    marginRight: 8,
    backgroundColor: '#6c757d',
  },
  primaryButton: {
    backgroundColor: '#007bff',
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
  listThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  whiteText: {
    color: '#fff',
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

export { ingredientStyles, tortaStyles, homeStyles, ventaStyles };



export default styles;
