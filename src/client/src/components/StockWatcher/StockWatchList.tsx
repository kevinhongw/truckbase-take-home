import React, { useMemo, useState } from 'react';
import { Box, Button, CircularProgress, Skeleton, Stack } from '@mui/material';

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

  const processedWatchedStocks = useMemo(
    () =>
      watchedStocks.map((watchedStock) => {
        const ticker = stockTickers?.find(
          (stockTicker) => stockTicker.symbol === watchedStock.symbol,
        );
        const stockPrice = stockPrices?.find(
          (stockPrice) => stockPrice.symbol === watchedStock.symbol,
        );

        return {
          ...watchedStock,
          name: ticker?.name || 'N/A',
          price: stockPrice?.price || null,
        } as WatchedStockWithInfo;
      }),
    [watchedStocks, stockTickers, stockPrices],
  );

  if (isStockTickerPending || isWatchedStocksPending) {
    return <Skeleton width={'100%'} height={500} />;
  }

  const handleAddWatchStock = () => {
    setOpenAddWatchedStockDialog(true);
  };

  return (
    <>
      <Stack spacing={2} marginTop={4}>
        <Box display={'flex'} justifyContent={'flex-end'}>
          {isPolling && <CircularProgress />}
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
