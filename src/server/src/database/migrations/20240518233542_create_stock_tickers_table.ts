import type { Knex } from 'knex';

const tableName = 'stock_tickers';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('symbol');
    table.string('name');
    table.string('currency').defaultTo('USD');
    table.string('stockExchange').defaultTo('NasdaqGS');
    table.string('exchangeShortName').defaultTo('NASDAQ');
    table.timestamp('deletedAt').defaultTo(null);
    table.timestamps(true, true); // createdAt, updatedAt
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
