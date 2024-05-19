import { Request, Response } from 'express';

import { knex } from '../database';
import { StockTicker } from 'models/StockTicker';

export const listStockTickers = async (req: Request, res: Response) => {
  console.log('list watched stocks route hit');

  const result = await knex
    .table<StockTicker>('stock_tickers')
    .select('symbol')
    .whereNotNull('deletedAt');

  res.json(result);
};
