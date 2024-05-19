import React from 'react';
import {
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { WatchedStockWithInfo } from 'types';
type Props = {
  watchedStocks: WatchedStockWithInfo[];
};

const StockWatchListTable: React.FC<Props> = ({ watchedStocks }) => {
  return (
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
            <TableCell align="right" sx={{ width: '100px' }}>
              <strong>Price</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watchedStocks.map((row) => {
            return (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Chip color="warning" label={row.symbol} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right" sx={{ width: '100px' }}>
                  {row.price ? `$${row.price}` : 'N/A'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockWatchListTable;
