import mockDb from "mock-knex";
import { getTableColumns } from "./InfoSchema";
import db from "../../db";

mockDb.mock(db);

const tracker = mockDb.getTracker();

describe("InfoSchema repository", () => {
  beforeEach(() => {
    tracker.install();
  });

  afterEach(() => {
    tracker.uninstall();
  });

  describe("getTableColumns", () => {
    test("gets columns from given table", async (done) => {
      const schema = "public";
      const table = "census";

      const response = ["age", "citizenship"];
      tracker.once("query", (query) => {
        expect(query.method).toEqual("select");
        expect(query.sql.includes("information_schema")).toBe(true);
        expect(query.sql.includes("columns")).toBe(true);
        expect(query.bindings[0]).toEqual(table);
        expect(query.bindings[1]).toEqual(schema);

        query.response(response);
        done();
      });

      const result = await getTableColumns(table, schema);
      expect(result).toEqual(response);
    });
  });
});