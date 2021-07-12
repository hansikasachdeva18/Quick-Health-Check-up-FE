import { createStore, compose, applyMiddleware } from "redux";
import initial from "./initial.json";
import sagas from "./sagas";
import createSagaMiddleware from "redux-saga";

const reducer = function (state = initial, action) {
  switch (action.type) {
    case "COMMON_SUCCESS":
      return { Common: action.payload };
    case "PD_SUCCESS":
      return { probableDiagnosis: action.payload };
    case "DG_SUCCESS":
      return { diagnose: action.payload };
    case "LOADING":
      return { loading: action.payload };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  initial,
  compose(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(sagas);
export default store;
