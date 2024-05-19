import express from 'express';
import { createWatchedStock, deleteWatchedStock, listWatchedStocks } from './watched-stocks';
import { listStockTickers } from './stock-tickers';
import { listStockPrices } from './stock-prices';

const router = express.Router();

router.get('/watched_stocks', listWatchedStocks);
router.post('/watched_stocks', createWatchedStock);
router.delete('/watched_stocks/:watchedStockId', deleteWatchedStock);

router.get('/stock_tickers', listStockTickers);

// Using POST here to pass the symbols as payload,
// We can also use GET request with query param
// but the request might become a problem when the list gets big
router.post('/stock_prices', listStockPrices);

export default router;
