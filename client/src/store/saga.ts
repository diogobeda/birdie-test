import { SagaMiddleware } from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import { FETCH_COLUMNS_REQUEST, fetchColumns } from "./domains/columns";
import { FETCH_CENSUS_DATA_REQUEST, fetchCensusData } from "./domains/census";

function* censusSaga() {
  yield takeEvery(FETCH_COLUMNS_REQUEST, fetchColumns);
  yield takeEvery(FETCH_CENSUS_DATA_REQUEST, fetchCensusData);
}

export default (middleware: SagaMiddleware<{}>) => {
  middleware.run(censusSaga);
};
