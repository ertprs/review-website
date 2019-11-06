import {
  SET_DOMAIN_DATA_IN_REDUX,
  SET_DOMAIN_PROFILE_LOADER,
  REPORT_DOMAIN_INIT,
  REPORT_DOMAIN_SUCCESS,
  REPORT_DOMAIN_FAILURE,
  REPORT_DOMAIN_AFTER_LOGIN,
  REDIRECT_TO_REGISTRATION_WITH_DOMAIN_PREFILL
} from "../actions/actionTypes";

const domainProfileReducer = (state = {}, action) => {
  const {
    type,
    domainProfileData,
    isLoading,
    reportDomain,
    reportDomainLaterData,
    domain
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
    case REDIRECT_TO_REGISTRATION_WITH_DOMAIN_PREFILL: {
      return {
        ...state,
        type,
        domain
      };
    }
    default:
      return state;
  }
};

export default domainProfileReducer;
