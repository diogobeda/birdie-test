import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import runSagas from "./saga";
import { State as ColumnsState } from "./domains/columns";
import { State as CensusState } from "./domains/census";

export type State = {
  columns: ColumnsState;
  census: CensusState;
};

const composeEnhancers = (<any> window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  runSagas(sagaMiddleware);

  return store;
};
