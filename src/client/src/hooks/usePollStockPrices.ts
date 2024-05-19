import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStockPrices } from './useStockPrices';
import { useEffect } from 'react';

const TIMEOUT = 5000;
export const usePollStockPrices = (symbols: string[]) => {
  const { data, mutate, isPending } = useStockPrices();

  useEffect(() => {
    let killed = false;

    async function poll() {
      if (killed) {
        return;
      }
      await mutate(symbols);
      setTimeout(poll, TIMEOUT);
    }

    poll();

    return () => {
      killed = true;
    };
  }, [mutate, TIMEOUT, symbols]);

  return {
    stockPrices: data,
    isPolling: isPending,
  };
};
