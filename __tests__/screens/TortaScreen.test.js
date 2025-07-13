import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import TortaScreen from '../../screens/TortasScreen';
import * as TortaController from '../../controllers/TortaController';

jest.mock('../../controllers/TortaController');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  useRoute: () => ({ params: {} })
}));


describe('TortaScreen', () => {
  beforeEach(() => {
    TortaController.fetchTortas.mockResolvedValue([
      { ID_TORTA: 1, nombre_torta: 'Choc', descripcion_torta: 'desc' }
    ]);
  });

  it('renders list of tortas', async () => {
    const { getByText } = render(<TortaScreen />);
    await waitFor(() => getByText('Choc'));
    expect(getByText('Choc')).toBeTruthy();
  });

  it('opens edit modal when Editar pressed', async () => {
    const { getByText } = render(<TortaScreen />);
    await waitFor(() => getByText('Editar'));
    fireEvent.press(getByText('Editar'));
    await waitFor(() => getByText('Editar Torta'));
    expect(getByText('Editar Torta')).toBeTruthy();
  });
});
