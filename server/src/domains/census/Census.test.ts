import { CensusDomain } from "./Census";
import { IInfoSchemaRepo } from "../../repos/info-schema";
import { ICensusRepo } from "../../repos/census";

describe("CensusDomain", () => {
  let infoShcemaRepo: IInfoSchemaRepo;
  let censusRepo: ICensusRepo;
  beforeEach(() => {
    infoShcemaRepo = {
      getTableColumns: jest.fn().mockResolvedValue([]),
    };
    censusRepo = {
      getCountAndAvgAgeByValue: jest.fn().mockResolvedValue([]),
      getUniqueValueCount: jest.fn().mockResolvedValue([{}]),
    };
  });

  describe("getCensusColumns", () => {
    test("filters out age column from the result", async () => {
      const domain = new CensusDomain(infoShcemaRepo, censusRepo);
      infoShcemaRepo.getTableColumns = jest.fn().mockResolvedValue([
        { column_name: "education" },
        { column_name: "age" },
        { column_name: "weight" },
      ]);

      expect(await domain.getCensusColumns()).toEqual(["education", "weight"]);
    });
  });

  describe("getCensusDataByColumn", () => {
    test("returns formatted rows", async () => {
      const domain = new CensusDomain(infoShcemaRepo, censusRepo);
      censusRepo.getCountAndAvgAgeByValue = jest.fn().mockResolvedValue([
        { education: "High school", count: 10, averageAge: 10 },
        { education: "University", count: 20, averageAge: 20 },
      ]);

      const { rows } = await domain.getCensusDataByColumn("education");
      expect(rows).toEqual([
        { value: "High school", count: 10, averageAge: 10 },
        { value: "University", count: 20, averageAge: 20 },
      ]);
    });

    test("returns total unique values for a column", async () => {
      const domain = new CensusDomain(infoShcemaRepo, censusRepo);
      censusRepo.getUniqueValueCount = jest.fn().mockResolvedValue([{
        count: 1000,
      }]);

      const { totalRows } = await domain.getCensusDataByColumn("education");
      expect(totalRows).toEqual(1000);
    });
  });
});