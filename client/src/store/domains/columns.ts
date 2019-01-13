import { call, put } from "redux-saga/effects";
import api from "../../services/api";

export const FETCH_COLUMNS_REQUEST = "FETCH_COLUMNS_REQUEST";
export const FETCH_COLUMNS_SUCCESS = "FETCH_COLUMNS_SUCCESS";
export const FETCH_COLUMNS_ERROR = "FETCH_COLUMNS_ERROR";

export function* fetchColumns() {
  try {
    const { data: { columns } } = yield call(api.get, "/census/columns");
    yield put(fetchColumnsSuccess(columns));
  } catch (e) {
    yield put(fetchColumnsError(e));
  }
}

const fetchColumnsRequest = () => ({ type: FETCH_COLUMNS_REQUEST });
const fetchColumnsSuccess = (columns: Array<string>) => ({
  type: FETCH_COLUMNS_SUCCESS,
  columns,
});
const fetchColumnsError = (error: Error) => ({
  type: FETCH_COLUMNS_ERROR,
  error,
});

export const actions = {
  fetchColumnsRequest,
  fetchColumnsSuccess,
  fetchColumnsError
};

type FetchColumnsRequestAction = ReturnType<typeof fetchColumnsRequest>;
type FetchColumnsSuccessAction = ReturnType<typeof fetchColumnsSuccess>;
type FetchColumnsErrorAction = ReturnType<typeof fetchColumnsError>;

export type Actions = FetchColumnsRequestAction
  | FetchColumnsSuccessAction
  | FetchColumnsErrorAction;

export type State = {
  list: Array<string>;
  loading: boolean;
  error?: Error;
};

const defaultState: State = {
  list: [],
  loading: false,
  error: undefined,
};

export default function reducer(state: State = defaultState, action: Actions) {
  switch (action.type) {
    case FETCH_COLUMNS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_COLUMNS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: (<FetchColumnsSuccessAction> action).columns,
      };
    case FETCH_COLUMNS_ERROR:
      return {
        ...state,
        loading: false,
        error: (<FetchColumnsErrorAction> action).error,
      };
    default:
      return state;
  }
}