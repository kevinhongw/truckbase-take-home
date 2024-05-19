import type { Knex } from 'knex';

const tableName = 'watched_stocks';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('symbol');
    table.timestamp('deletedAt').defaultTo(null);
    table.timestamps(true, true); // createdAt, updatedAt
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
