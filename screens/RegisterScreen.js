import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import UserController from '../controllers/UserController';

const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      if (contrasena !== confirmPassword) {
        setMensaje('Las contraseñas no coinciden');
        return;
      }

      const userData = {
        nombre: nombre,
        email: email,
        contrasena: contrasena,
      };
      const response = await UserController.registerUser(userData);
     
      
      setShowModal(true); // Mostrar el modal después del registro exitoso
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      setMensaje('Error al registrar usuario');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigation.navigate('LoginScreen'); // Redirigir al usuario a la pantalla de inicio de sesión al cerrar el modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.errorMessage}>{mensaje}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Registrarse" onPress={handleRegister} />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Usuario registrado correctamente</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default RegisterScreen;
