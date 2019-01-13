import { call, put } from "redux-saga/effects";
import api from "../../services/api";

export type CensusDataRow = {
  value: string;
  count: number;
  averageAge: number;
};

export type CensusData = {
  rows: Array<CensusDataRow>;
  totalRows: number;
};

export type State = CensusData & {
  loading: boolean;
  error?: Error;
};

export const FETCH_CENSUS_DATA_REQUEST = "FETCH_CENSUS_DATA_REQUEST";
export const FETCH_CENSUS_DATA_SUCCESS = "FETCH_CENSUS_DATA_SUCCESS";
export const FETCH_CENSUS_DATA_ERROR = "FETCH_CENSUS_DATA_ERROR";

export function* fetchCensusData({ column }: FetchCensusDataRequestAction) {
  try {
    const { data: { data } } = yield api.get(`/census/column_data?column=${column}`);
    yield put(fetchCensusDataSuccess(data));
  } catch (e) {
    yield put(fetchCensusDataError(e));
  }
}

const fetchCensusDataRequest = (column: string) => ({
  type: FETCH_CENSUS_DATA_REQUEST,
  column,
});
const fetchCensusDataSuccess = (data: CensusData) => ({
  type: FETCH_CENSUS_DATA_SUCCESS,
  data
});
const fetchCensusDataError = (error: Error) => ({
  type: FETCH_CENSUS_DATA_ERROR,
  error,
});

export const actions = {
  fetchCensusDataRequest,
  fetchCensusDataSuccess,
  fetchCensusDataError,
};

type FetchCensusDataRequestAction = ReturnType<typeof fetchCensusDataRequest>;
type FetchCensusDataSuccessAction = ReturnType<typeof fetchCensusDataSuccess>;
type FetchCensusDataErrorAction = ReturnType<typeof fetchCensusDataError>;

export type Actions = FetchCensusDataRequestAction
  | FetchCensusDataSuccessAction
  | FetchCensusDataErrorAction;

const defaultState: State = {
  rows: [],
  totalRows: 0,
  loading: false,
};

export default function reducer(state: State = defaultState, action: Actions) {
  switch (action.type) {
    case FETCH_CENSUS_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CENSUS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        ...(<FetchCensusDataSuccessAction> action).data,
      };
    case FETCH_CENSUS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: (<FetchCensusDataErrorAction> action).error,
      };
    default:
      return state;
  }
}