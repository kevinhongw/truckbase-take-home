import { Container } from '@mui/material';
import Header from 'components/Header';
import StockWatchList from 'components/StockWatcher/StockWatchList';
import React from 'react';
type Props = {};

const StockWatcher: React.FC<Props> = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <StockWatchList />
      </Container>
    </div>
  );
};

export default StockWatcher;
