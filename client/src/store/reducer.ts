import { combineReducers } from "redux";
import columnsReducer from "./domains/columns";
import censusReducer from "./domains/census";

export default combineReducers({
  columns: columnsReducer,
  census: censusReducer,
});