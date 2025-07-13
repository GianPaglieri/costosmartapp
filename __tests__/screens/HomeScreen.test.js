import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import * as VentaController from '../../controllers/VentaController';
import * as IngredienteController from '../../controllers/IngredientController';
import * as TortaController from '../../controllers/TortaController';

jest.mock('../../controllers/VentaController');
jest.mock('../../controllers/IngredientController');
jest.mock('../../controllers/TortaController');
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(fn => fn()),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    VentaController.obtenerCantidadVentas.mockResolvedValue(2);
    VentaController.obtenerGanancias.mockResolvedValue(100);
    VentaController.obtenerVentas.mockResolvedValue([]);
    IngredienteController.fetchIngredientesMenosStock.mockResolvedValue([]);
    TortaController.fetchTortas.mockResolvedValue([{ ID_TORTA: 1, nombre_torta: 'A' }]);
  });

  it('renders title', async () => {
    const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
    await waitFor(() => getByText('Panel de Control'));
    expect(getByText('Panel de Control')).toBeTruthy();
  });

  it('opens modal when new sale button pressed', async () => {
    const { getByText, queryByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
    await waitFor(() => getByText('Generar Nueva Venta'));
    fireEvent.press(getByText('Generar Nueva Venta'));
    await waitFor(() => expect(queryByText('Registrar Venta')).toBeTruthy());
  });
});
