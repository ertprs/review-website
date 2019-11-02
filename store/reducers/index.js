import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import trustReducer from "./trustReducer";
import domainProfileReducer from "./domainProfileReducer";
import dashboardReducer from "./dashboardReducer";
import loaderReducer from "./loaderReducer";
import aggregateReducer from "./aggregateReducer";
import googleReviews from "./googleReviewReducer";

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

const profileDataConfig = {
  key: "profileData",
  storage: storage,
  blacklist: ["reportDomain"]
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  trustVote: trustReducer,
  profileData: persistReducer(profileDataConfig, domainProfileReducer),
  dashboardData: persistReducer(dashboardPersistConfig, dashboardReducer),
  loader: loaderReducer,
  aggregateData: aggregateReducer,
  googleReviews
});
