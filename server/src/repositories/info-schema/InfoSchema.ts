import db from "../../db";

export function getTableColumns(table: string, schema: string) {
  return db
    .withSchema("information_schema")
    .select("column_name")
    .from("columns")
    .where({
      table_name: table,
      table_schema: schema
    });
}