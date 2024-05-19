// model inspired by https://site.financialmodelingprep.com/developer/docs/stock-ticker-symbol-lookup-api
export type StockTicker = {
  id: number;
  symbol: string;
  name: string;
  currency?: string;
  stockExchange?: string;
  exchangeShortName?: string;
};
