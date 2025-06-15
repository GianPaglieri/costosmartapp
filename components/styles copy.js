import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({


//LOGIN
containerLogin: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  paddingHorizontal: 20,
},
titleLogin: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
inputLogin: {
  width: '100%',
  height: 50,
  borderWidth: 1,
  borderColor: '#cccccc',
  borderRadius: 5,
  paddingHorizontal: 15,
  marginBottom: 20,
},
loginButton: {
  width: '100%',
  height: 50,
  backgroundColor: '#007bff',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
},
buttonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
},
registerButton: {
  marginTop: 20,
},
registerText: {
  color: '#007bff',
  fontSize: 14,
},

  //RECETAS
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 4,
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative', // Para poder colocar el botón "Volver" en una posición fija
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  ingredientsScrollView: {
    maxHeight: 220,
    width: '100%',
    marginTop: 10,
  },
  ingredientItem: {
    fontSize: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ingredientText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
  },
  ingredientActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  deleteButton: {
    marginLeft: 8,
    borderRadius: 5,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 10,
    width: 60,
    textAlign: 'center',
  },
  
  checkIcon: {
    marginLeft: 10,
  },
  newIngredientInput: {
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  closeButton: {
    marginTop: 16,
  },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonLabel: {
    marginLeft: 8,
    fontSize: 16,
  },

  //INGREDIENTES
  container: {
    padding: 16,
  },
  searchbar: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff', // Color azul
    borderRadius: 0,
    margin: 5,
  },
  addButton: {
    backgroundColor: '#007bff', // Azul
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 0,
    marginBottom: 16,
    color: 'white'
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },

  ingredientModalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonText: {
    color: '#007BFF',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  buttonContainer: {
    backgroundColor: '#007bff', // Color primario igual al de la web
    borderRadius: 3,
 
    alignItems: 'center', // Alinea el texto al centro
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#000000',
  },
  dataTableContainer: {
    marginTop: 16,
  },
  tableHeaderContainer: {
    backgroundColor: '#007BFF',
  },
  tableHeaderText: {
    color: '#FFFFFF',
  },
  tableRowText: {
    color: '#000000',
  },
  // VENTAS
  salesOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  salesInfo: {
    alignItems: 'center',
  },
  salesValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  salesLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    marginRight: 15,
  },
  salesIncrease: {
    color: '#00CC00', // Verde para aumento
  },
  salesDecrease: {
    color: '#CC0000', // Rojo para disminución
  },
  // HomeScreen
  homeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  homeCard: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    
  },
  homeCardContent: {
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  homeText: {
    fontSize: 18,
    marginBottom: 8,
  },
  homeDropdownContainer: {
    alignItems: 'right',
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
  },
  homeDropdownText: {
    fontSize: 16,
    color: '#000',
  },
  homeDataTableContainer: {
    marginTop: 16,
  },
  homeTableHeaderContainer: {
    backgroundColor: '#007BFF',
  },
  homeTableHeaderText: {
    color: '#FFFFFF',
  },
  homeTableRowText: {
    color: '#000',
  },
});

export default styles;