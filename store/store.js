import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// ACTIONS

// export const serverRenderClock = isServer => dispatch => {
//   return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
// }

const persistConfig = {
  key: "primary",
  storage,
  // whitelist: ['exampleData'] // place to select which state you want to persist
  blacklist: ["auth", "trustVote"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

let middleWare = [thunkMiddleware];

if (process.env.NODE_ENV === "production") {
  middleWare = [...middleWare];
} else {
  middleWare = [...middleWare, logger];
}

export function initializeStore(initialState = {}) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
  );
}
