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
  SET_GOOGLE_DIRECT_REVIEW_URL,
  SET_REVIEWS_PUSHER_CONNECT,
  UPDATE_COMPANY_DETAILS_INIT,
  UPDATE_COMPANY_DETAILS_SUCCESS,
  UPDATE_COMPANY_DETAILS_ERROR,
  EMPTY_COMPANY_DETAILS,
  UPDATE_USER_DETAILS_INIT,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_ERROR,
  EMPTY_USER_DETAILS,
  UPDATE_DOMAIN_DETAILS_INIT,
  UPDATE_DOMAIN_DETAILS_SUCCESS,
  UPDATE_DOMAIN_DETAILS_ERROR,
  EMPTY_DOMAIN_DETAILS,
  FETCH_THIRD_PARTY_REVIEWS_INIT,
  FETCH_THIRD_PARTY_REVIEWS_SUCCESS,
  FETCH_THIRD_PARTY_REVIEWS_FAILURE,
  SET_REVIEWS_OBJECT_WITH_PUSHER
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
    googleDirectReviewUrl,
    businessAddress,
    isReviewsPusherConnected,
    reviewsObject,
    googlePlaceId,
    companyDetails,
    userDetails,
    domainDetails,
    thirdPartyReviews
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
        googleDirectReviewUrl,
        businessAddress,
        googlePlaceId
      };
    }
    case SET_REVIEWS_PUSHER_CONNECT: {
      return {
        ...state,
        type,
        isReviewsPusherConnected
      };
    }
    case SET_REVIEWS_OBJECT_WITH_PUSHER: {
      return {
        ...state,
        type,
        reviewsObject: { ...state.reviewsObject, ...reviewsObject }
      };
    }
    case UPDATE_COMPANY_DETAILS_INIT: {
      return {
        ...state,
        type,
        companyDetails
      };
    }
    case UPDATE_COMPANY_DETAILS_SUCCESS: {
      return {
        ...state,
        type,
        companyDetails
      };
    }
    case UPDATE_COMPANY_DETAILS_ERROR: {
      return {
        ...state,
        type,
        companyDetails
      };
    }
    case EMPTY_COMPANY_DETAILS: {
      return {
        ...state,
        type,
        companyDetails: {}
      };
    }
    case UPDATE_USER_DETAILS_INIT: {
      return {
        ...state,
        type,
        userDetails
      };
    }
    case UPDATE_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        type,
        userDetails
      };
    }
    case UPDATE_USER_DETAILS_ERROR: {
      return {
        ...state,
        type,
        userDetails
      };
    }
    case EMPTY_USER_DETAILS: {
      return {
        ...state,
        type,
        userDetails: {}
      };
    }
    case UPDATE_DOMAIN_DETAILS_INIT: {
      return {
        ...state,
        type,
        domainDetails
      };
    }
    case UPDATE_DOMAIN_DETAILS_SUCCESS: {
      return {
        ...state,
        type,
        domainDetails
      };
    }
    case UPDATE_DOMAIN_DETAILS_ERROR: {
      return {
        ...state,
        type,
        domainDetails
      };
    }
    case EMPTY_DOMAIN_DETAILS: {
      return {
        ...state,
        type,
        domainDetails: {}
      };
    }
    case FETCH_THIRD_PARTY_REVIEWS_INIT:
      return { ...state, type, ...thirdPartyReviews };
    case FETCH_THIRD_PARTY_REVIEWS_SUCCESS:
      return { ...state, type, ...thirdPartyReviews };
    case FETCH_THIRD_PARTY_REVIEWS_FAILURE:
      return { ...state, type, ...thirdPartyReviews };
    default:
      return state;
  }
};

export default dashboardReducer;
