import { Container } from "inversify";
import * as Knex from "knex";
import {
  Key as DBConnectorKey,
  DBConnector,
} from "../connectors/db";
import {
  Key as InfoSchemRepoKey,
  IInfoSchemaRepo,
  InfoSchemaRepo
} from "../repos/info-schema";
import {
  Key as CensusRepoKey,
  ICensusRepo,
  CensusRepo
} from "../repos/census";
import {
  Key as CensusDomainKey,
  ICensusDomain,
  CensusDomain
} from "../domains/census";

// @FIXME: Automatic discovery of bindings by file system convention
// would greatly improve productivity
export default class IOCContainer extends Container {
  constructor() {
    super();
    this.initializeBindings();
  }

  initializeBindings() {
    this.bindConnectors();
    this.bindRepositories();
    this.bindDomains();
  }

  bindDomains() {
    this.bind<ICensusDomain>(CensusDomainKey).to(CensusDomain);
  }

  bindRepositories() {
    this.bind<IInfoSchemaRepo>(InfoSchemRepoKey).to(InfoSchemaRepo);
    this.bind<ICensusRepo>(CensusRepoKey).to(CensusRepo);
  }

  bindConnectors() {
    this.bind<Knex>(DBConnectorKey).toConstantValue(DBConnector);
  }
}