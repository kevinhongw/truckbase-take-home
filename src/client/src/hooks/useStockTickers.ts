import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StockTicker } from 'types';

export const useStockTickers = () => {
  const getStockTickers = async () => {
    const { data } = await axios.get('http://localhost:4000/v1/stock_tickers');

    return data.stockTickers as StockTicker[];
  };

  return useQuery({ queryKey: ['stockTickers'], queryFn: getStockTickers });
};
