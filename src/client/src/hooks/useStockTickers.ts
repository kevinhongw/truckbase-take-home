import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useStockTickers = () => {
  const getStockPrices = async () => {
    const response = await axios.get('http://localhost:4000/v1/stock_tickers');

    return response.data;
  };

  return useQuery({ queryKey: ['stockTickers'], queryFn: getStockPrices });
};
