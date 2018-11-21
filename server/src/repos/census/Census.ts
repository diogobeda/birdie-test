import * as Knex from "knex";
import { injectable, inject } from "inversify";
import { Key as DBConnectorKey } from "../../connectors/db";

export interface ICensusRepo {
  getCountByValue(column: string): Promise<ValueAggregates>;
  getUniqueValueCount(column: string): Promise<UniqueValuesCount>;
}

export type ValueAggregates = Array<{
  count: string,
  averageAge: string,
  [key: string]: string,
}>;

export type UniqueValuesCount = Array<{ count: number }>;

const AGGREGATE_DATA_LIMIT = 100;

@injectable()
export class CensusRepo implements ICensusRepo {
  db: Knex;

  constructor(
    @inject(DBConnectorKey) db: Knex
  ) {
    this.db = db;
  }

  getCountByValue(column: string): Promise<ValueAggregates> {
    return <Promise<ValueAggregates>> <unknown> this.db
      .count({ count: column })
      .avg({ averageAge: "age" })
      .select(column)
      .from("census_learn_sql")
      .groupBy(column)
      .orderBy("count", "desc")
      .limit(AGGREGATE_DATA_LIMIT);
  }

  getUniqueValueCount(column: string): Promise<UniqueValuesCount> {
    return <Promise<UniqueValuesCount>> <unknown> this.db
      .countDistinct({ count: column })
      .from("census_learn_sql");
  }
}