import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('stock_tickers').del();
  await knex('watched_stocks').del();

  // Inserts seed entries
  await knex('stock_tickers').insert([
    { symbol: 'AAPL', name: 'Apple Inc' },
    { symbol: 'MMM', name: '3M' },
    { symbol: 'ABNB', name: 'Airbnb' },
    { symbol: 'ALB', name: 'Albemarle Corporation' },
    { symbol: 'ALL', name: 'Allstate' },
    { symbol: 'CCL', name: 'Carnival' },
    { symbol: 'SCHW', name: 'Charles Schwab Corporation' },
    { symbol: 'CSCO', name: 'Cisco' },
    { symbol: 'INTU', name: 'Intuit' },
    { symbol: 'KR', name: 'Kroger' },
    { symbol: 'UBER', name: 'Uber' },
  ]);
  await knex('watched_stocks').insert([{ symbol: 'UBER' }, { symbol: 'AAPL' }]);
}
