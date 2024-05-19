import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStockPrices } from './useStockPrices';
import { useInterval } from 'usehooks-ts';

const TIMEOUT = 5000;
export const usePollStockPrices = (symbols: string[]) => {
  const { data = [], mutate, isPending } = useStockPrices();

  useInterval(
    () => {
      mutate(symbols);
    },
    symbols.length > 0 ? 3000 : null,
  );

  return {
    stockPrices: data,
    isPolling: isPending,
  };
};
