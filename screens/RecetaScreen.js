import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  Modal,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions,
  FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import styles from '../components/styles';
import { API_URL } from '../config';
import AddIngredienteModal from '../components/AddIngredienteModal';
import IngredienteItem from '../components/IngredienteItem';
import useRecetas from '../hooks/useRecetas';
import {
  borrarReceta,
  agregarReceta,
  editarCantidadIngrediente,
  eliminarIngrediente,
  agregarIngrediente
} from '../controllers/RecetaController';

const RecetasScreen = ({ navigation }) => {
   const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [ingredienteModalVisible, setIngredienteModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    ID_TORTA: null,
    nombre_torta: '',
    descripcion: '',
    imagen: '',
    ingredientes: [],
    ingredientesOriginales: []
  });
  const [loading, setLoading] = useState(false);

  // Usamos el 75% de la pantalla para el modal
  const modalMaxHeight = Dimensions.get('window').height * 0.75;

  const { recetas, ingredientes, precios, cargarDatos } = useRecetas();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarDatos);
    return unsubscribe;
  }, [navigation]);
  // ---> Si venís desde TortaScreen con recetaTortaId, abrí el modal
  useEffect(() => {
    if (route.params?.recetaTortaId && recetas.length > 0) {
      const receta = recetas.find(r => r.ID_TORTA === route.params.recetaTortaId);
      if (receta) {
        openEditModal(receta);
        navigation.setParams({ recetaTortaId: null }); // 🔧 <-- reset del parámetro
      }
    }
  }, [route.params, recetas]);


  const handleVerTorta = () => {
    setModalVisible(false);  // Cerrás el modal actual
    setTimeout(() => {
      navigation.navigate('Tortas', { editTortaId: formData.ID_TORTA });
    }, 300);
  };

  // Función para obtener el precio por ID de receta (torta)
  const obtenerPrecioPorIdTorta = (ID_TORTA) => {
    const precioEncontrado = precios.find(precio => precio.id_torta === ID_TORTA);
    return precioEncontrado ? `$${precioEncontrado.costo_total}` : 'Precio no disponible';
  };

  const ingredientesDisponibles = ingredientes
    .filter(ing => !formData.ingredientes.some(i => i.ID_INGREDIENTE === ing.id))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  const handleSaveReceta = async () => {
    if (!formData.nombre_torta.trim() && !formData.ID_TORTA) {
      Alert.alert('Error', 'El nombre de la receta es requerido');
      return;
    }
    if (formData.ingredientes.length === 0) {
      Alert.alert('Error', 'Agrega al menos un ingrediente');
      return;
    }
    setLoading(true);
    try {
      let recetaId = formData.ID_TORTA;
      if (!recetaId) {
        const recetaData = {
          nombre_torta: formData.nombre_torta,
          descripcion: formData.descripcion,
          imagen: formData.imagen
        };
        const response = await agregarReceta(recetaData);
        if (!response.success) throw new Error(response.error);
        recetaId = response.data.ID_TORTA;
        Alert.alert('Éxito', 'Receta creada correctamente');
      } else {
        Alert.alert('Éxito', 'Receta actualizada correctamente');
      }
      const resultados = await Promise.all(
        formData.ingredientes.map(async (ing) => {
          const cantidad = parseFloat(ing.total_cantidad);
          if (isNaN(cantidad))
            throw new Error(`Cantidad inválida para ${ing.Nombre}`);
          if (formData.ID_TORTA) {
            const recetaEncontrada = recetas.find(
              r => r.ID_TORTA === formData.ID_TORTA
            );
            const ingredienteOriginal = recetaEncontrada?.ingredientes?.find(
              i => i.ID_INGREDIENTE === ing.ID_INGREDIENTE
            );
            if (ingredienteOriginal) {
              if (parseFloat(ingredienteOriginal.total_cantidad) !== cantidad) {
                const res = await editarCantidadIngrediente(recetaId, ing.ID_INGREDIENTE, cantidad);
                if (!res.success) throw new Error(res.error);
                return res;
              }
              return { success: true, skipped: true };
            }
          }
          const res = await agregarIngrediente(recetaId, ing.ID_INGREDIENTE, cantidad);
          if (!res.success) throw new Error(res.error);
          return res;
        })
      );
      const errores = resultados.filter(r => !r.success);
      if (errores.length > 0)
        throw new Error(errores.map(e => e.error).join(', '));
      await cargarDatos();
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo guardar la receta');
    } finally {
      setLoading(false);
    }
  };

  // Cuando se abre el modal para editar, se carga el formulario y se guarda el valor original
  const openEditModal = (receta) => {
    setFormData({
      ID_TORTA: receta.ID_TORTA,
      nombre_torta: receta.nombre_torta,
      descripcion: receta.descripcion,
      imagen: receta.imagen,
      ingredientes: receta.ingredientes.map(ing => ({
        ...ing,
        total_cantidad: ing.total_cantidad.toString()
      })),
      ingredientesOriginales: receta.ingredientes.map(ing => ({
        ...ing,
        total_cantidad: ing.total_cantidad.toString()
      }))
    });
    setModalVisible(true);
  };

  const handleDelete = async (ID_TORTA) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de eliminar esta receta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const { success, error } = await borrarReceta(ID_TORTA);
              if (!success) throw new Error(error);
              await cargarDatos();
              Alert.alert('Éxito', 'Receta eliminada correctamente');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  const handleAgregarIngrediente = async (nuevoIngrediente, cantidadNuevo) => {
    try {
      if (!nuevoIngrediente || !cantidadNuevo) {
        Alert.alert('Error', 'Selecciona un ingrediente e ingresa la cantidad');
        return;
      }
      const cantidad = parseFloat(cantidadNuevo);
      if (isNaN(cantidad)) throw new Error('Cantidad inválida');

      setLoading(true);

      const nuevoIng = {
        ID_INGREDIENTE: nuevoIngrediente.id,
        total_cantidad: cantidad.toString(),
        Nombre: nuevoIngrediente.nombre
      };
      setFormData(prev => ({
        ...prev,
        ingredientes: [...prev.ingredientes, nuevoIng]
      }));
      if (formData.ID_TORTA) {
        const { success, error } = await agregarIngrediente(
          formData.ID_TORTA,
          nuevoIngrediente.id,
          cantidad
        );
        if (!success) {
          setFormData(prev => ({
            ...prev,
            ingredientes: prev.ingredientes.filter(i => i.ID_INGREDIENTE !== nuevoIngrediente.id)
          }));
          throw new Error(error);
        }
      }
      setIngredienteModalVisible(false);
      Alert.alert('Éxito', 'Ingrediente agregado correctamente');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Navegar a la vista de ingredientes y abrir el modal de creación
  const handleCrearIngrediente = () => {
    setIngredienteModalVisible(false);
    navigation.navigate('Ingredientes', { openAdd: true });
  };

  const handleEliminarIngrediente = async (ID_INGREDIENTE) => {
    try {
      setFormData(prev => ({
        ...prev,
        ingredientes: prev.ingredientes.filter(i => i.ID_INGREDIENTE !== ID_INGREDIENTE)
      }));
      if (formData.ID_TORTA) {
        const { success, error } = await eliminarIngrediente(
          formData.ID_TORTA,
          ID_INGREDIENTE
        );
        if (!success) throw new Error(error);
      }
      Alert.alert('Éxito', 'Ingrediente eliminado correctamente');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Se confirma la actualización de cantidad solo al presionar el check, comparando con el valor original.
  const handleConfirmUpdateQuantity = async (ing) => {
    try {
      // Si el campo está en blanco, no se realiza la actualización
      if (ing.total_cantidad.trim() === "") return;
      const newCantidad = parseFloat(ing.total_cantidad);
      if (isNaN(newCantidad) || newCantidad === 0) return;
      const { success, error } = await editarCantidadIngrediente(
        formData.ID_TORTA,
        ing.ID_INGREDIENTE,
        newCantidad
      );
      if (!success) throw new Error(error);
      // Se actualiza el valor original para este ítem
      setFormData(prev => {
        const updatedOriginales = prev.ingredientesOriginales.map(o =>
          o.ID_INGREDIENTE === ing.ID_INGREDIENTE ? { ...o, total_cantidad: ing.total_cantidad } : o
        );
        return { ...prev, ingredientesOriginales: updatedOriginales };
      });
      Alert.alert('Éxito', 'Cantidad actualizada correctamente');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Actualiza el valor local sin enviar al API automáticamente
  // Se elimina la restricción que impide actualizar el valor en blanco
  const handleActualizarCantidad = (ID_INGREDIENTE, cantidad) => {
    setFormData(prev => ({
      ...prev,
      ingredientes: prev.ingredientes.map(ing =>
        ing.ID_INGREDIENTE === ID_INGREDIENTE ? { ...ing, total_cantidad: cantidad } : ing
      )
    }));
  };

  const handleCerrarModal = async () => {
    if (!loading) {
      await cargarDatos();
      setModalVisible(false);
    }
  };

  // Render para cada ingrediente (sin FlatList)
  const renderIngredienteItem = ({ item }) => {
    const originalItem = formData.ingredientesOriginales.find(
      o => o.ID_INGREDIENTE === item.ID_INGREDIENTE
    );
    const originalValue = originalItem ? originalItem.total_cantidad : item.total_cantidad;
    return (
      <IngredienteItem
        item={item}
        ingredientes={ingredientes}
        loading={loading}
        originalValue={originalValue}
        onChangeCantidad={handleActualizarCantidad}
        onConfirmUpdate={handleConfirmUpdateQuantity}
        onDelete={handleEliminarIngrediente}
      />
    );
  };

  // Contenido del modal repartido en tres secciones:
  // 1. Header con título (nombre de la receta o "Nueva Receta") y botón de cerrar
  // 2. Área con botón "Agregar Ingrediente" y listado scrollable de ingredientes
  // 3. Footer con botones "Cancelar" y "Guardar"
const renderModalContent = () => (
    <View style={{ height: modalMaxHeight, backgroundColor: '#fff' }}>
      {/* Área con botón "Agregar Ingrediente" y listado */}
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#e0e0e0' }}>
          {!formData.ID_TORTA && (
            <>
              <TextInput
                style={[styles.input, { backgroundColor: '#fff' }]}
                placeholder="Nombre de la torta *"
                value={formData.nombre_torta}
                onChangeText={text => setFormData(prev => ({ ...prev, nombre_torta: text }))}
                editable={!loading}
              />
              <Text style={styles.seccionTitulo}>Ingredientes</Text>
            </>
          )}
          <Pressable
            style={[styles.boton, { backgroundColor: '#007bff', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 }]}
            onPress={() => setIngredienteModalVisible(true)}
          >
            <Text style={[styles.botonTexto, { color: '#fff' }]}>Agregar Ingrediente</Text>
          </Pressable>
        </View>
        {/* Listado de ingredientes */}
        <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }} contentContainerStyle={{ paddingBottom: 8 }}>
          <View style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 10, overflow: 'hidden' }}>
            {formData.ingredientes.length > 0 ? (
              <View style={{ padding: 10 }}>
                {formData.ingredientes.map(ing => (
                  <View key={ing.ID_INGREDIENTE.toString()}>
                    {renderIngredienteItem({ item: ing })}
                  </View>
                ))}
              </View>
            ) : (
              <Text style={[styles.cardText, { textAlign: 'center', marginVertical: 10 }]}>
                No hay ingredientes agregados
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
      {/* Footer */}
      <View style={{ marginBottom: 12 }}>
  {formData.ID_TORTA && (
    <Pressable
      style={[styles.boton, { backgroundColor: '#6c757d', padding: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 8 }]}
      onPress={handleVerTorta}
    >
      <Text style={[styles.botonTexto, { color: '#fff' }]}>Ver Torta</Text>
    </Pressable>
  )}
</View>

      <View style={{ padding: 16, borderTopWidth: 1, borderColor: '#e0e0e0', justifyContent: 'center' }}>
        <View style={styles.modalBotones}>
          <Pressable style={[styles.boton, { marginHorizontal: 8 }]} onPress={handleCerrarModal}>
            <Text style={styles.botonTexto}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={[styles.boton, styles.botonPrimario, { marginHorizontal: 8 }]}
            onPress={handleSaveReceta}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botonTexto}>Guardar</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
);

  const renderRecetaItem = ({ item }) => (
    <View style={styles.card}>
      {item.imagen && (
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: `${API_URL}/${item.imagen}` }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>
      )}
      <View style={{ padding: 16 }}>
        <Text style={styles.cardTitle}>{item.nombre_torta}</Text>
        <Text style={styles.metricaValor}>{obtenerPrecioPorIdTorta(item.ID_TORTA)}</Text>
        <View style={styles.cardActions}>
          <Pressable onPress={() => openEditModal(item)}>
            <Text style={styles.seccionLink}>Editar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heroTitle}>Gestión de Recetas</Text>
      {recetas.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="book-outline" size={72} color="#ccc" style={{ marginBottom: 16 }} />
          <Text style={styles.heroSubtitle}>No hay recetas registradas</Text>
        </View>
      ) : (
        <FlatList
          data={recetas}
          renderItem={renderRecetaItem}
          keyExtractor={item => item.ID_TORTA.toString()}
          contentContainerStyle={styles.scrollContainer}
        />
      )}

      {/* Modal principal para crear o editar receta */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCerrarModal}
      >
        <View style={styles.modalFondo}>
          <View
            style={[
              styles.modalContenido,
              {
                width: '90%',
                maxHeight: modalMaxHeight,
                backgroundColor: '#fff',
                borderRadius: 12,
                overflow: 'hidden'
              }
            ]}
          >
            {/* Header con título y botón de cerrar */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: '#e0e0e0' }}>
              <Text style={[styles.modalTitle, { fontSize: 20, fontWeight: 'bold', flex: 1 }]}>
                {formData.ID_TORTA ? `Editar  ${formData.nombre_torta}` : 'Nueva Receta'}
              </Text>
              <Pressable onPress={handleCerrarModal} hitSlop={10}>
                <Text style={[styles.cerrarModal, { fontSize: 24 }]}>✕</Text>
              </Pressable>
            </View>
            {renderModalContent()}
          </View>
        </View>
      </Modal>

      {/* Modal para agregar ingrediente */}
      <AddIngredienteModal
        visible={ingredienteModalVisible}
        onCancel={() => setIngredienteModalVisible(false)}
        ingredientes={ingredientesDisponibles}
        onSubmit={handleAgregarIngrediente}
        onCreateIngrediente={handleCrearIngrediente}
        loading={loading}
      />
    </View>
  );
};

export default RecetasScreen;
