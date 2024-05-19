import { listWatchedStocks } from './watched-stocks';
import * as Database from '../database';

describe('router - watched_stock', () => {
  describe('listWatchedStocks', () => {
    it('should call with correct payload', async () => {
      jest.spyOn(Database, 'knex').mockResolvedValue(() => ({
        table: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        whereNotNull: jest.fn().mockResolvedValue([{ id: 1, symbol: 'AAPL' }]),
      }));

      const request = {} as any;
      const response = { json: jest.fn() } as any;

      await listWatchedStocks(request, response);
      expect(response.json).toHaveBeenCalledWith({ id: 1, symbol: 'AAPL' });
    });
  });
});
