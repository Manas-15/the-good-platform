import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

const loggerMiddleware = createLogger();
const persistedState = loadFromLocalStorage();
export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//   reducer,
//   persistedState,
//   applyMiddleware(logger, sagaMiddleware))
// sagaMiddleware.run(watchLoadData);

store.subscribe(() => saveToLocalStorage(store.getState()));
