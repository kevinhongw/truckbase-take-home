import { Request, Response } from 'express';

const generateRandomStockPrice = async (symbol: string) => {
  const mockPrice = (Math.random() * 200).toFixed(2); // max $200
  return Promise.resolve({ symbol, price: mockPrice });
};

export const listStockPrices = async (req: Request, res: Response) => {
  console.log('List stock prices route hit');

  const { symbols } = req.body;

  if (!symbols) {
    res.status(400).send();
  }

  const promises = [];
  for (const symbol of symbols) {
    promises.push(generateRandomStockPrice(symbol));
  }

  const response = await Promise.all(promises);

  console.log('@##$$', response);

  res.json({ stockPrices: response });
};
