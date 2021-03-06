import { injectable, inject } from "inversify";
import boom from "boom";
import {
  Key as InfoSchemaRepoKey,
  IInfoSchemaRepo,
} from "../../repos/info-schema";
import {
  Key as CensusRepoKey,
  ICensusRepo,
} from "../../repos/census";

type CensusDataRow = {
  value: string,
  count: string,
  averageAge: string,
};

type CensusData = {
  rows: Array<CensusDataRow>,
  totalRows: number
};

export interface ICensusDomain {
  getCensusColumns(): Promise<Array<string>>;
  getCensusDataByColumn(column: string): Promise<CensusData>;
}

@injectable()
export class CensusDomain implements ICensusDomain {
  infoSchemaRepo: IInfoSchemaRepo;
  censusRepo: ICensusRepo;

  constructor(
    @inject(InfoSchemaRepoKey) infoSchemaRepo: IInfoSchemaRepo,
    @inject(CensusRepoKey) censusRepo: ICensusRepo
  ) {
    this.infoSchemaRepo = infoSchemaRepo;
    this.censusRepo = censusRepo;
  }

  async getCensusColumns(): Promise<Array<string>> {
    try {
      const columns = await this.infoSchemaRepo.getTableColumns("census_learn_sql", "birdietest");
      return columns
        .map(({ column_name }) => column_name)
        .filter(col => col !== "age");
    } catch (e) {
      throw boom.internal("There was an error getting the columns to filter");
    }
  }

  async getCensusDataByColumn(column: string): Promise<CensusData> {
    const countByValue = await this.censusRepo.getCountAndAvgAgeByValue(column);
    const [{ count: totalRows }] = await this.censusRepo.getUniqueValueCount(column);
    const rows = countByValue.map(({ [column]: value, count, averageAge }) => ({
      value,
      count,
      averageAge,
    }));

    return {
      rows,
      totalRows,
    };
  }
}