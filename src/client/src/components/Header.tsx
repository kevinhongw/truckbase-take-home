import { AppBar, Box, Container, Toolbar } from '@mui/material';
import React from 'react';
type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Box component="h1">Stock Watcher</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
