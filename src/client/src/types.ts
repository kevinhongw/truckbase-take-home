export type StockTicker = {
  symbol: string;
  name: string;
};

export type WatchedStock = {
  id: number;
  symbol: string;
};

export type StockPrice = {
  symbol: string;
  price: number;
};

export type WatchedStockWithInfo = {
  id: number;
  symbol: string;
  name: string;
  price: number;
};
