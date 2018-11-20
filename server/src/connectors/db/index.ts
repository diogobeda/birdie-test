import { injectable } from "inversify";
import knex from "knex";

export const Key = Symbol.for("DBConnector");

export const DBConnector = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  }
});