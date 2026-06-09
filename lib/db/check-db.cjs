const { Client } = require("pg");

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not loaded");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  console.log("connected");

  const tables = await client.query(`
    select table_schema, table_name
    from information_schema.tables
    where table_schema = 'public'
    order by table_name;
  `);

  console.table(tables.rows);

  const appTables = await client.query(`
    select
      to_regclass('public.assessments') as assessments,
      to_regclass('public.section_responses') as section_responses;
  `);

  console.table(appTables.rows);

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
