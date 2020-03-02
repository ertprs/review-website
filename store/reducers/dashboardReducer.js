import {
  SET_GET_REVIEWS_DATA,
  FETCH_REVIEWS_INIT,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
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
  FETCH_CAMPAIGN_LANGUAGE_INIT,
  FETCH_CAMPAIGN_LANGUAGE_SUCCESS,
  FETCH_CAMPAIGN_LANGUAGE_FAILURE,
  SET_CAMPAIGN_LANGUAGE,
  FETCH_EMAIL_TEMPLATE_INIT,
  FETCH_EMAIL_TEMPLATE_SUCCESS,
  FETCH_EMAIL_TEMPLATE_FAILURE,
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
  SHOW_GET_STARTED,
  POST_AUTOMATIC_INVITATION_CONFIG_INIT,
  POST_AUTOMATIC_INVITATION_CONFIG_SUCCESS,
  POST_AUTOMATIC_INVITATION_CONFIG_FAILURE,
  GET_AVAILABLE_PLATFORMS_INIT,
  GET_AVAILABLE_PLATFORMS_SUCCESS,
  GET_AVAILABLE_PLATFORMS_FAILURE,
  REQUEST_INSTALLATION_INIT,
  REQUEST_INSTALLATION_SUCCESS,
  REQUEST_INSTALLATION_FAILURE,
  FETCH_CAMPAIGNS_INIT,
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_CAMPAIGNS_FAILURE,
  CHANGE_CAMPAIGN_STATUS_INIT,
  CHANGE_CAMPAIGN_STATUS_SUCCESS,
  CHANGE_CAMPAIGN_STATUS_FAILURE,
  SET_CAMPAIGN_EDIT_MODE,
  GET_SMART_URL_INIT,
  GET_SMART_URL_SUCCESS,
  GET_SMART_URL_ERROR,
  ADD_REVIEW_PLATFORM_INIT,
  ADD_REVIEW_PLATFORM_SUCCESS,
  ADD_REVIEW_PLATFORM_ERROR,
  GET_AVAILABLE_REVIEW_PLATFORMS_INIT,
  GET_AVAILABLE_REVIEW_PLATFORMS_SUCCESS,
  GET_AVAILABLE_REVIEW_PLATFORMS_FAILURE,
  ADD_NEW_PLATFORM_IN_REVIEW_PLATFORMS,
  SET_REVIEWS_AFTER_LOGIN,
  SET_LOADING_STATUS_OF_REVIEWS,
  SET_SCRAPING_ARRAY_IN_REDUCER,
  TOGGLE_REVIEW_VISIBILITY_INIT,
  TOGGLE_REVIEW_VISIBILITY_SUCCESS,
  TOGGLE_REVIEW_VISIBILITY_FAILURE,
  SET_REVIEWS_AFTER_TOGGLE_VISIBILITY,
  SET_WIDGET_PLATFORM_VISIBILITY_INIT,
  SET_WIDGET_PLATFORM_VISIBILITY_SUCCESS,
  SET_WIDGET_PLATFORM_VISIBILITY_FAILURE,
  GET_SHORT_REVIEW_URL_INIT,
  GET_SHORT_REVIEW_URL_SUCCESS,
  GET_SHORT_REVIEW_URL_ERROR,
  WHATSAPP_MANUAL_INVITE_INIT,
  WHATSAPP_MANUAL_INVITE_SUCCESS,
  WHATSAPP_MANUAL_INVITE_FAILURE,
  WHATSAPP_MANUAL_COMMIT_INIT,
  WHATSAPP_MANUAL_COMMIT_SUCCESS,
  WHATSAPP_MANUAL_COMMIT_FAILURE,
  WHATSAPP_AUTOMATIC_INVITE_INIT,
  WHATSAPP_AUTOMATIC_INVITE_SUCCESS,
  WHATSAPP_AUTOMATIC_INVITE_FAILURE,
  WHATSAPP_AUTOMATIC_COMMIT_INIT,
  WHATSAPP_AUTOMATIC_COMMIT_SUCCESS,
  WHATSAPP_AUTOMATIC_COMMIT_FAILURE,
  WHATSAPP_AUTOMATIC_CREATE_CAMPAIGN_INIT,
  WHATSAPP_AUTOMATIC_CREATE_CAMPAIGN_SUCCESS,
  WHATSAPP_AUTOMATIC_CREATE_CAMPAIGN_FAILURE,
  EMPTY_WHATSAPP_DATA,
  GET_PRODUCT_REVIEWS_PLATFORMS_INIT,
  GET_PRODUCT_REVIEWS_PLATFORMS_SUCCESS,
  GET_PRODUCT_REVIEWS_PLATFORMS_FAILURE,
  GET_ALL_PRODUCTS_INIT,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  DELETE_PRODUCT_INIT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  FETCH_PRODUCT_REVIEWS_INIT,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
  FETCH_PRODUCT_REVIEWS_FAILURE
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
    campaignLanguage,
    parsedCampaignLanguage,
    emailTemplate,
    isReviewsPusherConnected,
    companyDetails,
    userDetails,
    domainDetails,
    showGetStarted,
    reviewPlatformToEdit,
    configDetails,
    availablePlatforms,
    requestInstallation,
    campaignsData,
    changeCampaignStatus,
    isCampaignEditMode,
    selectedCampaignData,
    smartUrl,
    addReviewPlatformData,
    review_platforms,
    updatedReviewPlatforms,
    scrapingArray,
    toggleReviewResponse,
    toggleWidgetPlatformVisibilityResponse,
    shortReviewUrl,
    whatsAppManualInvitationInit,
    whatsAppManualInvitationCommit,
    whatsAppAutomaticInvitationInit,
    whatsAppAutomaticInvitationCommit,
    whatsAppAutomaticCreateCampaign,
    productReviewsPlatforms,
    products,
    deleteProductResponse,
    productReviews
  } = action;
  switch (type) {
    case SET_GET_REVIEWS_DATA:
      return {
        ...state,
        type,
        getReviewsData: { ...getReviewsData }
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
    case SET_REVIEWS_PUSHER_CONNECT: {
      return {
        ...state,
        type,
        isReviewsPusherConnected
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
    case FETCH_REVIEWS_INIT:
      return { ...state, type, reviews: { ...reviews } };
    case FETCH_REVIEWS_SUCCESS:
      return { ...state, type, reviews: { ...reviews } };
    case FETCH_REVIEWS_FAILURE:
      return { ...state, type, reviews: { ...reviews } };
    case SHOW_GET_STARTED: {
      return { ...state, type, showGetStarted, reviewPlatformToEdit };
    }
    case POST_AUTOMATIC_INVITATION_CONFIG_INIT: {
      return { ...state, type, configDetails };
    }
    case POST_AUTOMATIC_INVITATION_CONFIG_SUCCESS: {
      return { ...state, type, configDetails };
    }
    case POST_AUTOMATIC_INVITATION_CONFIG_FAILURE: {
      return { ...state, type, configDetails };
    }
    case GET_AVAILABLE_PLATFORMS_INIT: {
      return { ...state, type, availablePlatforms };
    }
    case GET_AVAILABLE_PLATFORMS_SUCCESS: {
      return { ...state, type, availablePlatforms };
    }
    case GET_AVAILABLE_PLATFORMS_FAILURE: {
      return { ...state, type, availablePlatforms };
    }
    case REQUEST_INSTALLATION_INIT:
      return {
        ...state,
        type,
        requestInstallation
      };
    case REQUEST_INSTALLATION_SUCCESS:
      return {
        ...state,
        type,
        requestInstallation
      };
    case REQUEST_INSTALLATION_FAILURE:
      return {
        ...state,
        type,
        requestInstallation
      };
    case FETCH_CAMPAIGNS_INIT:
      return {
        ...state,
        type,
        campaignsData
      };
    case FETCH_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        type,
        campaignsData
      };
    case FETCH_CAMPAIGNS_FAILURE:
      return {
        ...state,
        type,
        campaignsData
      };
    case CHANGE_CAMPAIGN_STATUS_INIT:
      return {
        ...state,
        type,
        changeCampaignStatus
      };
    case CHANGE_CAMPAIGN_STATUS_SUCCESS:
      return {
        ...state,
        type,
        changeCampaignStatus
      };
    case CHANGE_CAMPAIGN_STATUS_FAILURE:
      return {
        ...state,
        type,
        changeCampaignStatus
      };
    case SET_CAMPAIGN_EDIT_MODE:
      return {
        ...state,
        type,
        selectedCampaignData,
        isCampaignEditMode
      };
    case GET_SMART_URL_INIT:
      return {
        ...state,
        type,
        smartUrl
      };
    case GET_SMART_URL_SUCCESS:
      return {
        ...state,
        type,
        smartUrl
      };
    case GET_SMART_URL_ERROR:
      return {
        ...state,
        type,
        smartUrl
      };
    case ADD_REVIEW_PLATFORM_INIT:
      return {
        ...state,
        type,
        addReviewPlatformData
      };
    case ADD_REVIEW_PLATFORM_SUCCESS:
      return {
        ...state,
        type,
        addReviewPlatformData
      };
    case ADD_REVIEW_PLATFORM_ERROR:
      return {
        ...state,
        type,
        addReviewPlatformData
      };
    case GET_AVAILABLE_REVIEW_PLATFORMS_INIT:
      return { ...state, type, review_platforms };
    case GET_AVAILABLE_REVIEW_PLATFORMS_SUCCESS:
      return { ...state, type, review_platforms };
    case GET_AVAILABLE_REVIEW_PLATFORMS_FAILURE:
      return { ...state, type, review_platforms };
    case ADD_NEW_PLATFORM_IN_REVIEW_PLATFORMS:
      return {
        ...state,
        type,
        review_platforms: {
          ...state.review_platforms,
          data: { ...updatedReviewPlatforms }
        }
      };
    case SET_REVIEWS_AFTER_LOGIN:
      return {
        ...state,
        type,
        reviews: { ...reviews }
      };
    case SET_LOADING_STATUS_OF_REVIEWS:
      return {
        ...state,
        type,
        reviews: { ...reviews }
      };
    case SET_SCRAPING_ARRAY_IN_REDUCER:
      return {
        ...state,
        type,
        scrapingArray
      };
    case TOGGLE_REVIEW_VISIBILITY_INIT:
      return {
        ...state,
        type,
        toggleReviewResponse
      };
    case TOGGLE_REVIEW_VISIBILITY_SUCCESS:
      return {
        ...state,
        type,
        toggleReviewResponse
      };
    case TOGGLE_REVIEW_VISIBILITY_FAILURE:
      return {
        ...state,
        type,
        toggleReviewResponse
      };
    case SET_REVIEWS_AFTER_TOGGLE_VISIBILITY:
      return {
        ...state,
        type,
        reviews: { ...reviews }
      };
    case SET_WIDGET_PLATFORM_VISIBILITY_INIT:
      return {
        ...state,
        type,
        toggleWidgetPlatformVisibilityResponse
      };
    case SET_WIDGET_PLATFORM_VISIBILITY_SUCCESS:
      return {
        ...state,
        type,
        toggleWidgetPlatformVisibilityResponse
      };
    case SET_WIDGET_PLATFORM_VISIBILITY_FAILURE:
      return {
        ...state,
        type,
        toggleWidgetPlatformVisibilityResponse
      };
    case GET_SHORT_REVIEW_URL_INIT:
      return {
        ...state,
        type,
        shortReviewUrl
      };
    case GET_SHORT_REVIEW_URL_SUCCESS:
      return {
        ...state,
        type,
        shortReviewUrl
      };
    case GET_SHORT_REVIEW_URL_ERROR:
      return {
        ...state,
        type,
        shortReviewUrl
      };
    case WHATSAPP_MANUAL_INVITE_INIT:
      return {
        ...state,
        type,
        whatsAppManualInvitationInit
      };
    case WHATSAPP_MANUAL_INVITE_SUCCESS:
      return {
        ...state,
        type,
        whatsAppManualInvitationInit
      };
    case WHATSAPP_MANUAL_INVITE_FAILURE:
      return {
        ...state,
        type,
        whatsAppManualInvitationInit
      };
    case WHATSAPP_MANUAL_COMMIT_INIT:
      return {
        ...state,
        type,
        whatsAppManualInvitationCommit
      };
    case WHATSAPP_MANUAL_COMMIT_SUCCESS:
      return {
        ...state,
        type,
        whatsAppManualInvitationCommit
      };
    case WHATSAPP_MANUAL_COMMIT_FAILURE:
      return {
        ...state,
        type,
        whatsAppManualInvitationCommit
      };

    case WHATSAPP_AUTOMATIC_INVITE_INIT:
      return {
        ...state,
        type,
        whatsAppAutomaticInvitationInit
      };
    case WHATSAPP_AUTOMATIC_INVITE_SUCCESS:
      return {
        ...state,
        type,
        whatsAppAutomaticInvitationInit
      };
    case WHATSAPP_AUTOMATIC_INVITE_FAILURE:
      return {
        ...state,
        type,
        whatsAppAutomaticInvitationInit
      };

    case WHATSAPP_AUTOMATIC_COMMIT_INIT:
      return {
        ...state,
        type,
        whatsAppAutomaticInvitationCommit
      };
    case WHATSAPP_AUTOMATIC_COMMIT_SUCCESS:
      return {
        ...state,
        type,
        whatsAppAutomaticInvitationCommit
      };
    case WHATSAPP_AUTOMATIC_COMMIT_FAILURE:
      return {
        ...state,
        type,
        whatsAppAutomaticInvitationCommit
      };

    case WHATSAPP_AUTOMATIC_CREATE_CAMPAIGN_INIT:
      return {
        ...state,
        type,
        whatsAppAutomaticCreateCampaign
      };
    case WHATSAPP_AUTOMATIC_CREATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        type,
        whatsAppAutomaticCreateCampaign
      };
    case WHATSAPP_AUTOMATIC_CREATE_CAMPAIGN_FAILURE:
      return {
        ...state,
        type,
        whatsAppAutomaticCreateCampaign
      };
    case EMPTY_WHATSAPP_DATA:
      return {
        ...state,
        type,
        whatsAppAutomaticCreateCampaign: {},
        whatsAppAutomaticInvitationCommit: {},
        whatsAppAutomaticInvitationInit: {},
        whatsAppManualInvitationCommit: {},
        whatsAppManualInvitationInit: {}
      };
    case GET_PRODUCT_REVIEWS_PLATFORMS_INIT:
      return {
        ...state,
        type,
        productReviewsPlatforms
      };
    case GET_PRODUCT_REVIEWS_PLATFORMS_SUCCESS:
      return {
        ...state,
        type,
        productReviewsPlatforms
      };
    case GET_PRODUCT_REVIEWS_PLATFORMS_FAILURE:
      return {
        ...state,
        type,
        productReviewsPlatforms
      };
    case GET_ALL_PRODUCTS_INIT:
      return {
        ...state,
        type,
        products
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        type,
        products
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        type,
        products
      };
    case DELETE_PRODUCT_INIT:
      return {
        ...state,
        type,
        deleteProductResponse
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        type,
        deleteProductResponse
      };
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        type,
        deleteProductResponse
      };
    case FETCH_PRODUCT_REVIEWS_INIT:
      return {
        ...state,
        type,
        productReviews
      };
    case FETCH_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        type,
        productReviews
      };
    case FETCH_PRODUCT_REVIEWS_FAILURE:
      return {
        ...state,
        type,
        productReviews
      };
    default:
      return state;
  }
};

export default dashboardReducer;
