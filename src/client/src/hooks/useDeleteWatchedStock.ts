import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useDeleteWatchedStock = () => {
  const deleteWatchedStock = async (watchedStockId: number) => {
    const response = await axios.delete(
      `http://localhost:4000/v1/watched_stocks/${watchedStockId}`,
    );

    return response.data;
  };

  return useMutation({ mutationFn: deleteWatchedStock });
};
