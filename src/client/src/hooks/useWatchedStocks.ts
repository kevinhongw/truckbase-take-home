import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useWatchedStocks = () => {
  const getWatchedStocks = async () => {
    const response = await axios.get('http://localhost:4000/v1/watched_stocks');

    return response.data;
  };

  return useQuery({ queryKey: ['watchedStocks'], queryFn: getWatchedStocks });
};
