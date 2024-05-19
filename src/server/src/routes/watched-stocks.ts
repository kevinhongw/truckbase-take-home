import { Request, Response } from 'express';

import { knex } from '../database';
import { WatchedStock } from 'models/watched-stock';

export const listWatchedStocks = async (req: Request, res: Response) => {
  console.log('list watched stocks route hit');

  const result = await knex
    .table<WatchedStock>('watched-stocks')
    .select()
    .whereNotNull('deletedAt');

  res.json(result);
};

export const createWatchedStock = async (req: Request, res: Response) => {
  console.log('create watched stock route hit');

  const payload = req.body as Pick<WatchedStock, 'symbol'>;

  if (!payload.symbol) {
    res.send(400);
  }

  const result = await knex.table<WatchedStock>('watched-stocks').insert(payload).returning('*');

  res.json(result);
};

export const deleteWatchedStock = async (req: Request, res: Response) => {
  console.log('delete watched stock route hit');

  const { watchedStockId } = req.params;

  if (!watchedStockId) {
    res.send(400);
  }

  const result = await knex
    .table<WatchedStock>('watched-stocks')
    .update({ deletedAt: new Date() })
    .where({ id: Number(watchedStockId) });

  res.json(result);
};
