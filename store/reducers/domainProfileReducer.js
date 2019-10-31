import {
  SET_DOMAIN_DATA_IN_REDUX,
  SET_DOMAIN_PROFILE_LOADER,
  REPORT_DOMAIN_INIT,
  REPORT_DOMAIN_SUCCESS,
  REPORT_DOMAIN_FAILURE,
  REPORT_DOMAIN_AFTER_LOGIN
} from "../actions/actionTypes";

const domainProfileReducer = (state = {}, action) => {
  const {
    type,
    domainProfileData,
    isLoading,
    reportDomain,
    reportDomainLaterData
  } = action;
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
    case REPORT_DOMAIN_INIT: {
      return {
        ...state,
        type,
        reportDomain
      };
    }
    case REPORT_DOMAIN_SUCCESS: {
      return {
        ...state,
        type,
        reportDomain
      };
    }
    case REPORT_DOMAIN_FAILURE: {
      return {
        ...state,
        type,
        reportDomain
      };
    }
    case REPORT_DOMAIN_AFTER_LOGIN: {
      return {
        ...state,
        type,
        reportDomainLaterData
      };
    }
    default:
      return state;
  }
};

export default domainProfileReducer;
