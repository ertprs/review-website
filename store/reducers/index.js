import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import trustReducer from "./trustReducer";
import domainProfileReducer from "./domainProfileReducer";
import dashboardReducer from "./dashboardReducer";
import loaderReducer from "./loaderReducer";
import cookie from "js-cookie";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["logInTemp", "signUpTemp", "tempEmail", "resendActivation"]
};

const dashboardPersistConfig = {
  key: "dashboardData",
  storage: storage,
  blacklist: ["locatePlaceTemp", "upgradePremium"]
};

// export default combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
//   trustVote: trustReducer,
//   profileData: domainProfileReducer,
//   dashboardData: persistReducer(dashboardPersistConfig, dashboardReducer),
//   loader: loaderReducer
// });

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  trustVote: trustReducer,
  profileData: domainProfileReducer,
  dashboardData: persistReducer(dashboardPersistConfig, dashboardReducer),
  loader: loaderReducer
});

const rootReducer = (state, action) => {
  console.log(action.type, "action type");
  if (action.type === "LOGOUT") {
    state = undefined;
    cookie.remove("loginType");
    cookie.remove("token");
  }
  return appReducer(state, action);
};

export default rootReducer;
