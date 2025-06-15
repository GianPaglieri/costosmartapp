// src/screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Title, Text, Button, DataTable } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import Chart from '../components/Chart';  // Importar el nuevo componente
import styles from '../components/styles';
import { fetchIngredientesMenosStock } from '../controllers/IngredientController';
import { fetchListaPrecios } from '../controllers/ListaPreciosController';
import {
  obtenerCantidadVentas as fetchCantidadVentas,
  obtenerCantidadVentasSemanales as fetchCantidadVentasSemanales,
  obtenerGanancias as fetchGanancias,
  obtenerPorcentajeVentas as fetchPorcentajeVentas,
  registrarVenta,
  obtenerVentas,
} from '../controllers/VentaController';

const HomeScreen = () => {
  const [cantidadVentas, setCantidadVentas] = useState(null);
  const [listaPrecios, setListaPrecios] = useState([]);
  const [ingredientesFaltantes, setIngredientesFaltantes] = useState([]);
  const [selectedTorta, setSelectedTorta] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [ganancias, setGanancias] = useState(0);
  const [cantidadVentasSemana, setCantidadVentasSemana] = useState(0);
  const [porcentajeVentas, setPorcentajeVentas] = useState(0);
  const [aumento, setAumento] = useState(false);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ventasData = await obtenerVentas();
        setVentas(ventasData);

        const ventas = await fetchCantidadVentas();
        setCantidadVentas(ventas);

        const listaPreciosData = await fetchListaPrecios();
        setListaPrecios(listaPreciosData);

        const gananciasData = await fetchGanancias();
        setGanancias(gananciasData);

        const ingredientesFaltantesData = await fetchIngredientesMenosStock();
        setIngredientesFaltantes(ingredientesFaltantesData);

        const cantidadVentasSem = await fetchCantidadVentasSemanales();
        setCantidadVentasSemana(cantidadVentasSem);
        

        const porcentaje = await fetchPorcentajeVentas();
        setPorcentajeVentas(porcentaje);
        setAumento(porcentaje > 0);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenerarVenta = async () => {
    if (selectedTorta) {
      try {
        console.log('Generando venta para la torta:', selectedTorta);
        await registrarVenta(selectedTorta); 
    
        // Actualizar la cantidad de ventas
        const nuevaCantidadVentas = await fetchCantidadVentas();
        console.log('Nueva cantidad de ventas:', nuevaCantidadVentas);
        setCantidadVentas(nuevaCantidadVentas);
    
        // Actualizar las ganancias
        const nuevasGanancias = await fetchGanancias();
        console.log('Nuevas ganancias:', nuevasGanancias);
        setGanancias(nuevasGanancias);
    
        // Actualizar la variación semanal
        const nuevoPorcentajeVentas = await fetchPorcentajeVentas();
        console.log('Nuevo porcentaje de ventas:', nuevoPorcentajeVentas);
        setPorcentajeVentas(nuevoPorcentajeVentas);
        setAumento(nuevoPorcentajeVentas > 0);
    
        setMensaje('Venta generada exitosamente');
      } catch (error) {
        console.error('Error al generar la venta:', error);
        setMensaje('Cantidad insuficiente de ingredientes');
      }
    } else {
      setMensaje('Selecciona una torta antes de generar la venta');
    }
  };
  

  return (
    <View style={styles.homeContainer}>
      <ScrollView>
        <Card style={styles.homeCard}>
          <Card.Content style={styles.homeCardContent}>
            <Title style={styles.homeTitle}>Ventas</Title>

            <View style={styles.salesInfo}>
              <Text style={styles.salesLabel}>Ganancias</Text>
              <Text style={styles.salesValue}>${ganancias}</Text>
            </View>

            <View style={styles.salesOverview}>
              <View style={styles.salesInfo}>
                <Text style={styles.salesLabel}>Ventas Totales</Text>
                <Text style={styles.salesValue}>{cantidadVentas}</Text>
              </View>

              <View style={styles.salesInfo}>
                <Text style={styles.salesLabel}>Variación Semanal</Text>
                <Text style={[styles.salesValue, aumento ? styles.salesIncrease : styles.salesDecrease]}>
                  {aumento ? "+" : ""}{porcentajeVentas}%
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.homeCard}>
          <Card.Content style={styles.homeCardContent}>
            <Title style={styles.homeTitle}>Generar Venta</Title>
            <View style={styles.homeDropdownContainer}>
              <ModalDropdown
                options={['Seleccionar torta', ...listaPrecios.map((torta) => torta.nombre_torta)]}
                defaultValue={'Seleccionar torta'}
                textStyle={styles.homeDropdownText}
                dropdownStyle={styles.homeDropdownOption}
                dropdownTextStyle={styles.homeDropdownOptionText}
                onSelect={(index, value) => setSelectedTorta(listaPrecios[index - 1]?.id_torta)}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              style={styles.buttonContainer}
              labelStyle={styles.buttonText}
              onPress={handleGenerarVenta}
            >
              Generar Venta
            </Button>
          </Card.Actions>
        </Card>
        
      

        <Card style={[styles.homeCard, styles.homeDataTableContainer]}>
          <Card.Content>
            <Title style={styles.homeTitle}>Ingredientes Faltantes</Title>
            <DataTable>
              <DataTable.Header style={styles.homeTableHeaderContainer}>
                <DataTable.Title>
                  <Text style={styles.homeTableHeaderText}>Nombre</Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                  <Text style={styles.homeTableHeaderText}>Stock</Text>
                </DataTable.Title>
              </DataTable.Header>

              {ingredientesFaltantes.map((ingrediente) => (
                <DataTable.Row key={ingrediente.id}>
                  <DataTable.Cell>
                    <Text style={styles.homeTableRowText}>{ingrediente.nombre}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Text style={styles.homeTableRowText}>{ingrediente.CantidadStock}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
        <Card style={styles.homeCard}>
        <Card.Content style={styles.homeCardContent}>
        <Title style={styles.homeTitle}>Generar Venta</Title>
        
        <Chart />
     
        </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};
export default HomeScreen; 