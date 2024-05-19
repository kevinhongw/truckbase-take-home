import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateWatchedStock = () => {
  const createWatchedStock = async (symbol: string) => {
    const response = await axios.post('http://localhost:4000/v1/watched_stocks', {
      symbol,
    });

    return response.data;
  };

  return useMutation({ mutationFn: createWatchedStock });
};
