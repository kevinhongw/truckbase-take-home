import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useStockPrices = () => {
  const getStockPrices = async (symbols: string[]) => {
    const response = await axios.post('http://localhost:4000/v1/stock_prices', {
      data: {
        symbols,
      },
    });

    return response.data;
  };

  return useMutation({ mutationFn: getStockPrices });
};
