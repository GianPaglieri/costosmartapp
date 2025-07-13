import { fetchIngredientes } from '../../controllers/IngredientController';
import { sendAuthenticatedRequest } from '../../controllers/UserController';

jest.mock('../../controllers/UserController', () => ({
  sendAuthenticatedRequest: jest.fn()
}));

describe('fetchIngredientes', () => {
  it('returns ingredientes when request succeeds', async () => {
    const ingredientes = [{ id: 1, nombre: 'Azucar' }];
    sendAuthenticatedRequest.mockResolvedValue({ success: true, ingredientes });
    const result = await fetchIngredientes();
    expect(result).toEqual(ingredientes);
  });

  it('returns empty array when request fails', async () => {
    sendAuthenticatedRequest.mockRejectedValue(new Error('network'));
    const result = await fetchIngredientes();
    expect(result).toEqual([]);
  });
});
