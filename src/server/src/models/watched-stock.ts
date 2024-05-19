export type WatchedStock = {
  id: number;
  symbol: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CreateWatchedStockPayload = {
  symbol: string;
};
