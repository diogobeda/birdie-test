import * as Knex from "knex";
import { injectable, inject } from "inversify";
import { Key as DBConnectorKey } from "../../connectors/db";

export interface IInfoSchemaRepo {
  getTableColumns(table: string, schema: string): Knex.QueryBuilder;
}

@injectable()
export class InfoSchemaRepo implements IInfoSchemaRepo {
  db: Knex;

  constructor(
    @inject(DBConnectorKey) db: Knex
  ) {
    this.db = db;
  }

  getTableColumns(table: string, schema: string): Knex.QueryBuilder {
    return this.db
      .withSchema("information_schema")
      .select("column_name")
      .from("columns")
      .where({
        table_name: table,
        table_schema: schema
      });
  }
}