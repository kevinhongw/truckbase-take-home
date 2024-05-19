import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { WatchedStock } from 'types';

export const useWatchedStocks = () => {
  const getWatchedStocks = async () => {
    const { data } = await axios.get('http://localhost:4000/v1/watched_stocks');

    return data.watchedStocks as WatchedStock[];
  };

  return useQuery({ queryKey: ['watchedStocks'], queryFn: getWatchedStocks });
};
