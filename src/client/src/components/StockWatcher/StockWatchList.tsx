import React, { useState } from 'react';
import { Box, Button, Skeleton, Stack } from '@mui/material';

import { WatchedStockWithInfo } from 'types';
import { useWatchedStocks } from 'hooks/useWatchedStocks';
import { usePollStockPrices } from 'hooks/usePollStockPrices';
import { useStockTickers } from 'hooks/useStockTickers';

import AddWatchedStockDialog from './AddWatchedStockDialog';
import StockWatchListTable from './StockWatchListTable';

type Props = {};

const StockWatchList: React.FC<Props> = () => {
  const [openAddWatchedStockDialog, setOpenAddWatchedStockDialog] = useState<boolean>(false);
  const { data: stockTickers = [], isPending: isStockTickerPending } = useStockTickers();
  const { data: watchedStocks = [], isPending: isWatchedStocksPending } = useWatchedStocks();

  const { stockPrices, isPolling } = usePollStockPrices(watchedStocks.map((stock) => stock.symbol));

  if (isStockTickerPending || isWatchedStocksPending) {
    return <Skeleton width={'100%'} height={500} />;
  }

  const handleAddWatchStock = () => {
    setOpenAddWatchedStockDialog(true);
  };

  const processedWatchedStocks = watchedStocks.map((watchedStock) => {
    const ticker = stockTickers?.find((stockTicker) => stockTicker.symbol === watchedStock.symbol);
    const stockPrice = stockPrices?.find((stockPrice) => stockPrice.symbol === watchedStock.symbol);

    return {
      ...watchedStock,
      name: ticker?.name || 'N/A',
      price: stockPrice?.price,
    } as WatchedStockWithInfo;
  });

  return (
    <>
      <Stack spacing={2} marginTop={4}>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button variant={'contained'} onClick={handleAddWatchStock} size="large">
            Add
          </Button>
        </Box>
        <StockWatchListTable watchedStocks={processedWatchedStocks} />
      </Stack>
      {openAddWatchedStockDialog && (
        <AddWatchedStockDialog onClose={() => setOpenAddWatchedStockDialog(false)} />
      )}
    </>
  );
};

export default StockWatchList;
