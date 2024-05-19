import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StockPrice } from 'types';

export const useStockPrices = () => {
  const getStockPrices = async (symbols: string[]) => {
    const { data } = await axios.post('http://localhost:4000/v1/stock_prices', {
      symbols,
    });

    return data.stockPrices as StockPrice[];
  };

  return useMutation({ mutationFn: getStockPrices });
};
