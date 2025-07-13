import { obtenerVentas } from '../../controllers/VentaController';
import { sendAuthenticatedRequest } from '../../controllers/UserController';

jest.mock('../../controllers/UserController', () => ({
  sendAuthenticatedRequest: jest.fn()
}));

describe('obtenerVentas', () => {
  it('returns ventas on success', async () => {
    const ventas = [{ ID_TORTA: 1 }];
    sendAuthenticatedRequest.mockResolvedValue(ventas);
    const result = await obtenerVentas();
    expect(result).toEqual(ventas);
  });

  it('throws when request fails', async () => {
    const error = new Error('fail');
    sendAuthenticatedRequest.mockRejectedValue(error);
    await expect(obtenerVentas()).rejects.toBe(error);
  });
});
