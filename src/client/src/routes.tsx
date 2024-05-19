import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import StockWatcher from 'pages/StockWatcher';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StockWatcher />,
  },
]);
