import { Request, Response } from 'express';

import { knex } from '../database';
import { StockTicker } from 'models/stock-ticker';

export const listStockTickers = async (req: Request, res: Response) => {
  console.log('list stock tickers route hit');

  const result = await knex
    .table<StockTicker>('stock_tickers')
    .select('symbol', 'name')
    .whereNull('deletedAt');

  res.json({
    stockTickers: result,
  });
};
