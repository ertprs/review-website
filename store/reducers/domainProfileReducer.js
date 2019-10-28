import {
  SET_DOMAIN_DATA_IN_REDUX,
  SET_DOMAIN_PROFILE_LOADER
} from "../actions/actionTypes";

const domainProfileReducer = (state = {}, action) => {
  const { type, domainProfileData, isLoading } = action;
  switch (type) {
    case SET_DOMAIN_DATA_IN_REDUX:
      return {
        ...state,
        type,
        domainProfileData: { ...domainProfileData }
      };
    case SET_DOMAIN_PROFILE_LOADER:
      return {
        ...state,
        type,
        isLoading
      };
    default:
      return state;
  }
};

export default domainProfileReducer;
