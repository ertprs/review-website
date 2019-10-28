import {
  SET_GET_REVIEWS_DATA,
  FETCH_REVIEWS_DATA_INIT,
  FETCH_REVIEWS_DATA_SUCCESS,
  FETCH_REVIEWS_DATA_FAILURE,
  SEND_GET_REVIEWS_INIT,
  SEND_GET_REVIEWS_SUCCESS,
  SEND_GET_REVIEWS_FAILURE,
  LOCATE_PLACE_INIT,
  LOCATE_PLACE_SUCCESS,
  LOCATE_PLACE_FAILURE,
  UPGRADE_TO_PREMIUM_INIT,
  UPGRADE_TO_PREMIUM_SUCCESS,
  UPGRADE_TO_PREMIUM_FAILURE,
  TRANSACTION_HISTORY_INIT,
  TRANSACTION_HISTORY_SUCCESS,
  TRANSACTION_HISTORY_FAILURE,
  CREATE_CAMPAIGN_INIT,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAILURE,
  SET_QUOTA_DETAILS,
  FETCH_CAMPAIGN_LANGUAGE_INIT,
  FETCH_CAMPAIGN_LANGUAGE_SUCCESS,
  FETCH_CAMPAIGN_LANGUAGE_FAILURE,
  SET_CAMPAIGN_LANGUAGE,
  FETCH_EMAIL_TEMPLATE_INIT,
  FETCH_EMAIL_TEMPLATE_SUCCESS,
  FETCH_EMAIL_TEMPLATE_FAILURE,
  SET_GOOGLE_DIRECT_REVIEW_URL
} from "../actions/actionTypes";

const dashboardReducer = (state = {}, action) => {
  const {
    type,
    getReviewsData,
    reviews,
    result,
    locatePlace,
    locatePlaceTemp,
    upgradePremium,
    transactionHistory,
    createCampaign,
    quotaDetails,
    campaignLanguage,
    parsedCampaignLanguage,
    emailTemplate,
    googleDirectReviewUrl
  } = action;
  switch (type) {
    case SET_GET_REVIEWS_DATA:
      return {
        ...state,
        type,
        getReviewsData: { ...getReviewsData }
      };
    case FETCH_REVIEWS_DATA_INIT:
      return {
        ...state,
        type,
        reviews
      };
    case FETCH_REVIEWS_DATA_SUCCESS:
      return {
        ...state,
        type,
        reviews
      };
    case FETCH_REVIEWS_DATA_FAILURE:
      return {
        ...state,
        type,
        reviews
      };
    case SEND_GET_REVIEWS_INIT:
      return {
        ...state,
        type,
        result: { ...result }
      };
    case SEND_GET_REVIEWS_SUCCESS:
      return {
        ...state,
        type,
        result: { ...result }
      };
    case SEND_GET_REVIEWS_FAILURE:
      return {
        ...state,
        type,
        result: { ...result }
      };
    case LOCATE_PLACE_INIT:
      return {
        ...state,
        type,
        locatePlace,
        locatePlaceTemp
      };
    case LOCATE_PLACE_SUCCESS:
      return {
        ...state,
        type,
        locatePlace,
        locatePlaceTemp
      };
    case LOCATE_PLACE_FAILURE:
      return {
        ...state,
        type,
        locatePlace,
        locatePlaceTemp
      };
    case UPGRADE_TO_PREMIUM_INIT:
      return {
        ...state,
        type,
        upgradePremium
      };
    case UPGRADE_TO_PREMIUM_SUCCESS:
      return {
        ...state,
        type,
        upgradePremium
      };
    case UPGRADE_TO_PREMIUM_FAILURE:
      return {
        ...state,
        type,
        upgradePremium
      };
    case TRANSACTION_HISTORY_INIT:
      return {
        ...state,
        type,
        transactionHistory
      };
    case TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        type,
        transactionHistory
      };
    case TRANSACTION_HISTORY_FAILURE:
      return {
        ...state,
        type,
        transactionHistory
      };
    case CREATE_CAMPAIGN_INIT:
      return {
        ...state,
        type,
        createCampaign
      };
    case CREATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        type,
        createCampaign
      };
    case CREATE_CAMPAIGN_FAILURE:
      return {
        ...state,
        type,
        createCampaign
      };
    case FETCH_CAMPAIGN_LANGUAGE_INIT:
      return {
        ...state,
        type,
        campaignLanguage
      };
    case FETCH_CAMPAIGN_LANGUAGE_SUCCESS:
      return {
        ...state,
        type,
        campaignLanguage
      };
    case FETCH_CAMPAIGN_LANGUAGE_FAILURE:
      return {
        ...state,
        type,
        campaignLanguage
      };
    case SET_QUOTA_DETAILS: {
      return {
        ...state,
        type,
        quotaDetails
      };
    }
    case SET_CAMPAIGN_LANGUAGE: {
      return {
        ...state,
        type,
        parsedCampaignLanguage
      };
    }
    case FETCH_EMAIL_TEMPLATE_INIT: {
      return {
        ...state,
        type,
        emailTemplate
      };
    }
    case FETCH_EMAIL_TEMPLATE_SUCCESS: {
      return {
        ...state,
        type,
        emailTemplate
      };
    }
    case FETCH_EMAIL_TEMPLATE_FAILURE: {
      return {
        ...state,
        type,
        emailTemplate
      };
    }
    case SET_GOOGLE_DIRECT_REVIEW_URL: {
      return {
        ...state,
        type,
        googleDirectReviewUrl
      };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
