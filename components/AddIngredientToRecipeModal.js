import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

const AddIngredientToRecipeModal = ({
  visible,
  onCancel,
  ingredientes,
  onSubmit,
  onCreateIngrediente,
  loading,
}) => {
  const [selected, setSelected] = useState(null);
  const [cantidad, setCantidad] = useState('');

  useEffect(() => {
    if (!visible) {
      setSelected(null);
      setCantidad('');
    }
  }, [visible]);

  const handleAdd = () => {
    if (selected && cantidad) {
      onSubmit(selected, cantidad);
    }
  };

  const ordenados = ingredientes.sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.3)' }}>
        <View style={[styles.modalContenido, { width:'90%', backgroundColor:'#fff', borderRadius:12, overflow:'hidden' }]}>
          <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:16, borderBottomWidth:1, borderColor:'#e0e0e0' }}>
            <Text style={[styles.modalTitle, { fontSize:20, fontWeight:'bold', flex:1 }]}>Agregar Ingrediente</Text>
            <Pressable onPress={onCancel} hitSlop={10}>
              <Text style={[styles.cerrarModal, { fontSize:24 }]}>✕</Text>
            </Pressable>
          </View>
          <View style={{ padding:16 }}>
            <Picker
              selectedValue={selected?.id}
              onValueChange={val => setSelected(ordenados.find(i => i.id === val))}
              style={styles.input}
              dropdownIconColor="#666"
              enabled={!loading}
            >
              <Picker.Item label="Seleccione un ingrediente" value={null} />
              {ordenados.map(ing => (
                <Picker.Item key={ing.id} label={ing.nombre} value={ing.id} />
              ))}
            </Picker>
            <TextInput
              style={[styles.input, { marginTop:15, backgroundColor:'#fff' }]}
              placeholder="Cantidad *"
              value={cantidad}
              onChangeText={setCantidad}
              keyboardType="numeric"
              editable={!loading}
            />
            <Pressable onPress={onCreateIngrediente} style={{ alignSelf:'flex-end', marginVertical:8 }}>
              <Text style={styles.seccionLink}>Crear nuevo ingrediente</Text>
            </Pressable>
            <View style={styles.modalBotones}>
              <Pressable style={[styles.boton, { marginHorizontal:8 }]} onPress={onCancel}>
                <Text style={styles.botonTexto}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.boton, styles.botonPrimario, { marginHorizontal:8 }]}
                onPress={handleAdd}
                disabled={!selected || !cantidad || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.botonTexto}>Agregar</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddIngredientToRecipeModal;
