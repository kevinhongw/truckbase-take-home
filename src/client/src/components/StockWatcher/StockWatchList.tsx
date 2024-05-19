import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useWatchedStocks } from 'hooks/useWatchedStocks';
import { usePollStockPrices } from 'hooks/usePollStockPrices';
import { useStockTickers } from 'hooks/useStockTickers';
import AddWatchedStockDialog from './AddWatchedStockDialog';

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

  return (
    <>
      <Stack spacing={2} marginTop={4}>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button variant={'contained'} onClick={handleAddWatchStock} size="large">
            Add
          </Button>
        </Box>
        <TableContainer component={Card}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Symbol</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Price</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watchedStocks.map((row) => {
                const ticker = stockTickers?.find(
                  (stockTicker) => stockTicker.symbol === row.symbol,
                );
                const stockPrice = stockPrices?.find(
                  (stockPrice) => stockPrice.symbol === row.symbol,
                );
                return (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Chip color="warning" label={row.symbol} />
                    </TableCell>
                    <TableCell>{ticker?.name}</TableCell>
                    <TableCell align="right">{`$${stockPrice?.price}` || 'N/A'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      {openAddWatchedStockDialog && (
        <AddWatchedStockDialog onClose={() => setOpenAddWatchedStockDialog(false)} />
      )}
    </>
  );
};

export default StockWatchList;
