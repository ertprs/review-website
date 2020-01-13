import {
  SET_GET_REVIEWS_DATA,
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
  FETCH_CAMPAIGN_LANGUAGE_INIT,
  FETCH_CAMPAIGN_LANGUAGE_SUCCESS,
  FETCH_CAMPAIGN_LANGUAGE_FAILURE,
  SET_QUOTA_DETAILS,
  CREATE_CAMPAIGN_INIT,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAILURE,
  SET_CAMPAIGN_LANGUAGE,
  FETCH_EMAIL_TEMPLATE_INIT,
  FETCH_EMAIL_TEMPLATE_SUCCESS,
  FETCH_EMAIL_TEMPLATE_FAILURE,
  SET_GOOGLE_PLACES,
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
  SET_REVIEWS_PUSHER_CONNECT,
  FETCH_REVIEWS_INIT,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  SET_REVIEWS_OBJECT_WITH_PUSHER,
  SHOW_GET_STARTED,
  POST_AUTOMATIC_INVITATION_CONFIG_INIT,
  POST_AUTOMATIC_INVITATION_CONFIG_SUCCESS,
  POST_AUTOMATIC_INVITATION_CONFIG_FAILURE,
  UPDATE_AUTH_STATE_WITH_CONFIG_DETAILS,
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
  ADD_NEW_PLATFORM_IN_REVIEW_PLATFORMS,
  GET_AVAILABLE_REVIEW_PLATFORMS_INIT,
  GET_AVAILABLE_REVIEW_PLATFORMS_SUCCESS,
  GET_AVAILABLE_REVIEW_PLATFORMS_FAILURE,
  SET_REVIEWS_AFTER_LOGIN,
  SET_LOADING_STATUS_OF_REVIEWS
} from "./actionTypes";
import { updateAuthSocialArray } from "../actions/authActions";
import axios from "axios";
import _find from "lodash/find";
import cookie from "js-cookie";
import _get from "lodash/get";
import _groupBy from "lodash/groupBy";
import _isEmpty from "lodash/isEmpty";
import {
  upgradePremiumApi,
  transactionHistoryApi,
  createCampaignApi,
  fetchCampaignLanguageApi,
  fetchEmailTemplateApi,
  updateCompanyDetailsApi,
  updateUserDetailsApi,
  updateDomainDetailsApi,
  thirdPartyDataApi,
  eCommerceIntegrationApi,
  campaignHistoryApi,
  deactivateCampaignApi,
  smartUrlApi,
  addReviewPlatformAPI,
  getAvailableReviewPlatformsApi
} from "../../utility/config";
import createCampaignLanguage from "../../utility/createCampaignLang";
import _findIndex from "lodash/findIndex";
import { isValidArray } from "../../utility/commonFunctions";

export const setGetReviewsData = getReviewsData => {
  return {
    type: SET_GET_REVIEWS_DATA,
    getReviewsData
  };
};

//? remove this action
// export const fetchReviews = (token, page, perPage) => {
//   const pageNo = page || 1;
//   const perPageLimit = perPage || 10;
//   return async (dispatch, getState) => {
//     let { dashboardData } = getState();
//     let reviewsObject = _get(dashboardData, "reviewsObject", {});
//     dispatch({
//       type: FETCH_REVIEWS_DATA_INIT,
//       reviews: {
//         data: {},
//         isFetching: true,
//         error: "",
//         success: "undefined"
//       }
//     });
//     try {
//       const result = await axios({
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//         url: `${process.env.BASE_URL}/api/my-business/google-reviews?page=${pageNo}&perPage=${perPageLimit}`
//       });
//       let success = false;
//       let reviews = _get(result, "data.reviews", []);
//       reviewsObject["google"] = false;
//       dispatch(setReviewsObjectWithPusher(reviewsObject));
//       if (!_isEmpty(reviews) && Array.isArray(reviews)) {
//         success = true;
//       }
//       dispatch({
//         type: FETCH_REVIEWS_DATA_SUCCESS,
//         reviews: {
//           data: _get(result, "data", {}),
//           isFetching: false,
//           error: "",
//           success
//         }
//       });
//     } catch (err) {
//       reviewsObject["google"] = false;
//       dispatch(setReviewsObjectWithPusher(reviewsObject));
//       const success = _get(err, "response.data.success", false);
//       const error = _get(err, "response.data.error", "Some Error Occured.");
//       dispatch({
//         type: FETCH_REVIEWS_DATA_FAILURE,
//         reviews: {
//           data: {},
//           isFetching: false,
//           error,
//           success
//         }
//       });
//     }
//   };
// };

export const clearReviewsData = () => {
  return {
    type: fethh_revi,
    reviews: {
      data: {},
      isFetching: false,
      error: "",
      success: false
    }
  };
};

export const sendGetReviews = api => {
  return async (dispatch, getState) => {
    dispatch({
      type: SEND_GET_REVIEWS_INIT,
      result: []
    });
    try {
      const result = await axios.get(api);
      dispatch({ type: SEND_GET_REVIEWS_SUCCESS, result: [] });
    } catch (error) {
      dispatch({
        type: SEND_GET_REVIEWS_FAILURE,
        result: []
      });
    }
  };
};

export const locatePlaceByPlaceId = (data, token, url) => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOCATE_PLACE_INIT,
      locatePlace: {
        success: false
      },
      locatePlaceTemp: {
        isLoading: true,
        errorMsg: ""
      }
    });
    try {
      const result = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data,
        url
      });
      const success = _get(result, "data.success", false);
      console.log(success, "SUCCESS");
      if (success) {
        const socialsArray = _get(result, "data.review_platform_profiles", []);
        const scraping = _get(result, "data.scraping", []);
        cookie.set("placeLocated", true, { expires: 7 });
        dispatch({
          type: LOCATE_PLACE_SUCCESS,
          locatePlace: {
            success: _get(result, "data.success", false)
          },
          locatePlaceTemp: {
            isLoading: false,
            errorMsg: ""
          }
        });
        if (socialsArray.length > 0) {
          dispatch(updateAuthSocialArray(socialsArray));
          dispatch(setReviewsLoadingStatus(scraping));
        }
      }
      // We will also get failed array that we can use later to show user which URLs failed to be set
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOCATE_PLACE_FAILURE,
        locatePlace: {
          success: _get(error, "response.data.success", false)
        },
        locatePlaceTemp: {
          isLoading: false,
          errorMsg: _get(error, "response.data.message", "Some Error Occured!")
        }
      });
    }
  };
};

export const upgradeToPremium = data => {
  return async (dispatch, getState) => {
    const { auth } = getState() | {};
    let token = _get(auth, "logIn.token", "");
    dispatch({
      type: UPGRADE_TO_PREMIUM_INIT,
      upgradePremium: {
        success: "undefined",
        isLoading: true
      }
    });
    try {
      const result = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data,
        url: `${process.env.BASE_URL}${upgradePremiumApi}`
      });
      const success = await _get(result, "data.success", false);
      dispatch({
        type: UPGRADE_TO_PREMIUM_SUCCESS,
        upgradePremium: {
          success: success,
          isLoading: false
        }
      });
    } catch (error) {
      const success = await _get(error, "response.data.success", false);
      dispatch({
        type: UPGRADE_TO_PREMIUM_FAILURE,
        upgradePremium: {
          success: success,
          isLoading: false
        }
      });
    }
  };
};

//! Not in use as we are doing in table directly
export const fetchTransactionHistory = token => {
  return async dispatch => {
    dispatch({
      type: TRANSACTION_HISTORY_INIT,
      transactionHistory: {
        isLoading: true,
        invitatons: [],
        errorMsg: ""
      }
    });
    try {
      const result = await axios({
        method: "GET",
        url: `${process.env.BASE_URL}${transactionHistoryApi}`,
        headers: { Authorization: `Bearer ${token}` }
      });
      const invitations = _get(result, "data.invitations", []);
      dispatch({
        type: TRANSACTION_HISTORY_SUCCESS,
        transactionHistory: {
          invitations,
          isLoading: false,
          errorMsg: ""
        }
      });
    } catch (error) {
      const err = _get(error, "response.data.message", "Some Error Occured!");
      dispatch({
        type: TRANSACTION_HISTORY_FAILURE,
        transactionHistory: {
          invitations: [],
          isLoading: false,
          errorMsg: err
        }
      });
    }
  };
};

export const clearCampaignData = data => {
  return {
    type: CREATE_CAMPAIGN_SUCCESS,
    createCampaign: {
      ...data
    }
  };
};

export const createCampaign = data => {
  const token = localStorage.getItem("token");
  return async dispatch => {
    dispatch({
      type: CREATE_CAMPAIGN_INIT,
      createCampaign: {
        isLoading: true,
        errorMsg: "",
        quotaDetails: {},
        success: "undefined"
      }
    });
    try {
      const result = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}${createCampaignApi}`,
        data,
        headers: { Authorization: `Bearer ${token}` }
      });
      const quotaDetails = _get(result, "data.quota_details", {});
      dispatch({
        type: CREATE_CAMPAIGN_SUCCESS,
        createCampaign: {
          isLoading: false,
          errorMsg: "",
          quotaDetails,
          success: _get(result, "data.success", false)
        }
      });
      dispatch(setInvitationQuota(quotaDetails));
    } catch (error) {
      dispatch({
        type: CREATE_CAMPAIGN_FAILURE,
        createCampaign: {
          isLoading: false,
          errorMsg: _get(
            error,
            "response.data.error",
            "Some error occured! Please try again later."
          ),
          quotaDetails: {},
          success: false
        }
      });
    }
  };
};

export const fetchCampaignLanguage = token => {
  return async dispatch => {
    dispatch({
      type: FETCH_CAMPAIGN_LANGUAGE_INIT,
      campaignLanguage: {
        isLoading: true,
        locales: {},
        success: "undefined",
        errorMsg: ""
      }
    });
    try {
      const result = await axios({
        method: "GET",
        url: `${process.env.BASE_URL}${fetchCampaignLanguageApi}`,
        headers: { Authorization: `Bearer ${token}` }
      });
      let locales = _get(result, "data.locales", {});
      if (!_isEmpty(locales)) {
        const data = createCampaignLanguage(locales);
        dispatch(setCampaignLanguage(data));
      }
      dispatch({
        type: FETCH_CAMPAIGN_LANGUAGE_SUCCESS,
        campaignLanguage: {
          isLoading: false,
          locales: _get(result, "data.locales", {}),
          success: _get(result, "data.success", false),
          errorMsg: ""
        }
      });
    } catch (error) {
      dispatch({
        type: FETCH_CAMPAIGN_LANGUAGE_FAILURE,
        campaignLanguage: {
          isLoading: false,
          locales: {},
          success: false,
          errorMsg: _get(
            error,
            "response.data.error",
            "Some error occured! Please try again later."
          )
        }
      });
    }
  };
};

export const setInvitationQuota = quotaDetails => {
  return {
    type: SET_QUOTA_DETAILS,
    quotaDetails
  };
};

export const setCampaignLanguage = parsedCampaignLanguage => {
  return {
    type: SET_CAMPAIGN_LANGUAGE,
    parsedCampaignLanguage
  };
};

export const fetchEmailTemplate = templateId => {
  let token = localStorage.getItem("token");
  return async dispatch => {
    dispatch({
      type: FETCH_EMAIL_TEMPLATE_INIT,
      emailTemplate: {
        isLoading: true,
        success: "undefined",
        template: {},
        errorMsg: ""
      }
    });
    try {
      let result = await axios({
        method: "GET",
        url: `${process.env.BASE_URL}${fetchEmailTemplateApi}/${templateId}`,
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({
        type: FETCH_EMAIL_TEMPLATE_SUCCESS,
        emailTemplate: {
          isLoading: false,
          success: _get(result, "data.success", false),
          template: _get(result, "data.template", {}),
          errorMsg: ""
        }
      });
    } catch (error) {
      dispatch({
        type: FETCH_EMAIL_TEMPLATE_FAILURE,
        emailTemplate: {
          isLoading: false,
          success: "false",
          template: {},
          errorMsg: _get(
            error,
            "response.data.error.message",
            "Some error occurred. Please try again later."
          )
        }
      });
    }
  };
};

export const setGooglePlaces = data => {
  return {
    type: SET_GOOGLE_PLACES,
    googlePlaces: { ...data }
  };
};

export const setReviewsPusherConnect = isReviewsPusherConnected => {
  return {
    type: SET_REVIEWS_PUSHER_CONNECT,
    isReviewsPusherConnected
  };
};

export const setReviewsObjectWithPusher = (reviewsObject = {}) => {
  return {
    type: SET_REVIEWS_OBJECT_WITH_PUSHER,
    reviewsObject: { ...reviewsObject }
  };
};

export const updateCompanyDetails = data => {
  let token = localStorage.getItem("token");
  return async dispatch => {
    dispatch({
      type: UPDATE_COMPANY_DETAILS_INIT,
      companyDetails: {
        isLoading: true,
        success: "undefined",
        data: {},
        errorMsg: ""
      }
    });
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}${updateCompanyDetailsApi}`,
        headers: { Authorization: `Bearer ${token}` },
        data
      });
      dispatch({
        type: UPDATE_COMPANY_DETAILS_SUCCESS,
        companyDetails: {
          isLoading: false,
          success: _get(result, "data.success", false),
          data: _get(result, "data.data", {}),
          errorMsg: ""
        }
      });
    } catch (error) {
      dispatch({
        type: UPDATE_COMPANY_DETAILS_ERROR,
        companyDetails: {
          isLoading: false,
          success: false,
          data: {},
          errorMsg: _get(
            error,
            "response.data.error.message",
            "Some error occured. Please try again later."
          )
        }
      });
    }
  };
};

export const emptyCompanyDetails = () => {
  return {
    type: EMPTY_COMPANY_DETAILS
  };
};

export const updateUserDetails = data => {
  let token = localStorage.getItem("token");
  return async dispatch => {
    dispatch({
      type: UPDATE_USER_DETAILS_INIT,
      userDetails: {
        isLoading: true,
        success: "undefined",
        data: {},
        errorMsg: ""
      }
    });
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}${updateUserDetailsApi}`,
        headers: { Authorization: `Bearer ${token}` },
        data
      });
      let success = _get(result, "data.success", false);
      if (success) {
        dispatch({
          type: UPDATE_USER_DETAILS_SUCCESS,
          userDetails: {
            isLoading: false,
            success: _get(result, "data.success", false),
            data,
            errorMsg: ""
          }
        });
      } else {
        dispatch({
          type: UPDATE_USER_DETAILS_ERROR,
          userDetails: {
            isLoading: false,
            success: false,
            data: {},
            errorMsg: "Some error occured. Please try again later."
          }
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_USER_DETAILS_ERROR,
        userDetails: {
          isLoading: false,
          success: false,
          data: {},
          errorMsg: _get(
            error,
            "response.data.error.message",
            "Some error occured. Please try again later."
          )
        }
      });
    }
  };
};

export const emptyUserDetails = () => {
  return {
    type: EMPTY_USER_DETAILS
  };
};

export const updateDomainDetails = data => {
  let token = localStorage.getItem("token");
  return async dispatch => {
    dispatch({
      type: UPDATE_DOMAIN_DETAILS_INIT,
      domainDetails: {
        isLoading: true,
        success: "undefined",
        data: {},
        errorMsg: ""
      }
    });
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}${updateDomainDetailsApi}`,
        headers: { Authorization: `Bearer ${token}` },
        data
      });
      const response = {
        domain: _get(result, "data.data.fullName", "")
      };
      dispatch({
        type: UPDATE_DOMAIN_DETAILS_SUCCESS,
        domainDetails: {
          isLoading: false,
          success: _get(result, "data.success", false),
          data: response,
          errorMsg: ""
        }
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DOMAIN_DETAILS_ERROR,
        domainDetails: {
          isLoading: false,
          success: false,
          data: {},
          errorMsg: _get(
            error,
            "response.data.error.message",
            "Some error occured. Please try again later."
          )
        }
      });
    }
  };
};

export const emptyDomainDetails = () => {
  return {
    type: EMPTY_DOMAIN_DETAILS
  };
};

//? it is used to update reviews of any particular profile inside socialappid inside dashboarddata/reviews. We can also fetch reviews by socialappid only it will give us it's primary profiles review but we are not allowing as per now because our current data structure doesn't supports that. So all these fields are mandatory.
export const fetchReviews = (socialAppId, profileId, domainId) => {
  //? is we have profile id then we need to send it as query param and we'll get that particular profiles data
  let api = profileId
    ? `${process.env.BASE_URL}${thirdPartyDataApi}?domain=${domainId}&socialAppId=${socialAppId}&profileId=${profileId}`
    : `${process.env.BASE_URL}${thirdPartyDataApi}?domain=${domainId}&socialAppId=${socialAppId}`;

  if (socialAppId && profileId && domainId) {
    return async (dispatch, getState) => {
      const state = getState();
      const dashboardData = _get(state, "dashboardData", {});
      const reviews = _get(dashboardData, "reviews", {});
      dispatch({
        type: FETCH_REVIEWS_INIT,
        reviews: {
          ...reviews,
          [socialAppId]: {
            ..._get(reviews, socialAppId, {}),
            [profileId]: {
              ..._get(reviews, socialAppId.profileId, {}),
              isLoading: true,
              success: undefined
            }
          }
        }
      });
      try {
        const result = await axios.get(api);
        // console.log(result.data.data, "DATA");
        let success = false;
        let reviewsArray = _get(result, "data.data.reviews", []);
        if (isValidArray(reviewsArray)) {
          success = true;
        }
        console.log(reviews, "REVIEWS");
        dispatch({
          type: FETCH_REVIEWS_SUCCESS,
          reviews: {
            ...reviews,
            [socialAppId]: {
              ..._get(reviews, socialAppId, {}),
              [profileId]: {
                ..._get(reviews, socialAppId.profileId, {}),
                ..._get(result, "data", {}),
                isLoading: false,
                success
              }
            }
          }
        });
      } catch (error) {
        dispatch({
          type: FETCH_REVIEWS_FAILURE,
          reviews: {
            ...reviews,
            [socialAppId]: {
              ..._get(reviews, socialAppId, {}),
              [profileId]: {
                ..._get(reviews, socialAppId.profileId, {}),
                isLoading: false,
                success: false
              }
            }
          }
        });
      }
    };
  }
};

export const setGetStartedShow = (show, social_media_app_id) => {
  //? we are using social_media_app_id as key of review platform in edit case
  return {
    type: SHOW_GET_STARTED,
    showGetStarted: show,
    reviewPlatformToEdit: social_media_app_id
  };
};

export const sendConfigData = data => {
  let token = localStorage.getItem("token");
  return async (dispatch, getState) => {
    const { auth } = getState();
    const ecommerceIntegrations = _get(
      auth,
      "logIn.userProfile.business_profile.integrations.ecommerce",
      []
    );
    dispatch({
      type: POST_AUTOMATIC_INVITATION_CONFIG_INIT,
      configDetails: {
        isLoading: true,
        success: undefined,
        data: {},
        errorMsg: ""
      }
    });
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}${eCommerceIntegrationApi}`,
        headers: { Authorization: `Bearer ${token}` },
        data
      });
      let resultData = _get(result, "data.shop", "");
      if (resultData) {
        if (ecommerceIntegrations) {
          if (
            Array.isArray(ecommerceIntegrations) &&
            !_isEmpty(ecommerceIntegrations)
          ) {
            let indexOfPlatformInIntegrations = _findIndex(
              ecommerceIntegrations,
              ["type", _get(resultData, "type", "")]
            );
            if (indexOfPlatformInIntegrations !== -1) {
              ecommerceIntegrations[indexOfPlatformInIntegrations] = {
                ...resultData
              };
            } else {
              ecommerceIntegrations.push(resultData);
            }
            dispatch({
              type: UPDATE_AUTH_STATE_WITH_CONFIG_DETAILS,
              ecommerceIntegrations
            });
          }
        }
      }
      dispatch({
        type: POST_AUTOMATIC_INVITATION_CONFIG_SUCCESS,
        configDetails: {
          isLoading: false,
          success: _get(result, "data.success", false),
          resultData,
          errorMsg: ""
        }
      });
    } catch (error) {
      let errorMsg = _get(
        error,
        "response.data.error",
        "Some error occured! Please choose another method of invitation."
      );
      if (errorMsg === "duplicate_bcc_sender") {
        errorMsg = "This email is already in use.";
      }
      dispatch({
        type: POST_AUTOMATIC_INVITATION_CONFIG_FAILURE,
        configDetails: {
          isLoading: false,
          success: false,
          data: {},
          errorMsg
        }
      });
    }
  };
};

export const requestInstallation = data => {
  return async (dispatch, getState) => {
    const { auth } = getState() | {};
    let token = _get(auth, "logIn.token", "");
    dispatch({
      type: REQUEST_INSTALLATION_INIT,
      requestInstallation: {
        success: undefined,
        isLoading: true
      }
    });
    try {
      const result = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data,
        url: `${process.env.BASE_URL}${upgradePremiumApi}`
      });
      const success = await _get(result, "data.success", false);
      dispatch({
        type: REQUEST_INSTALLATION_SUCCESS,
        requestInstallation: {
          success,
          isLoading: false
        }
      });
    } catch (error) {
      dispatch({
        type: REQUEST_INSTALLATION_FAILURE,
        requestInstallation: {
          success: false,
          isLoading: false
        }
      });
    }
  };
};

//! Not in use as we are doing it remotely directly from the table
export const fetchCampaignsList = token => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_CAMPAIGNS_INIT,
      campaignsData: {
        data: [],
        isLoading: true
      }
    });
    try {
      const res = await axios({
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        url: `${process.env.BASE_URL}${campaignHistoryApi}?perPage=10&page=1`
      });
      let campaignsList = _get(res, "data.campaigns", []);
      let data = [];
      if (Array.isArray(campaignsList) && !_isEmpty(campaignsList)) {
        data = campaignsList.map(campaign => {
          let parsedCampaignStructure = JSON.parse(
            _get(campaign, "campaign_structure", {})
          );
          return {
            ...campaign,
            campaign_structure: { ...parsedCampaignStructure }
          };
        });
      }
      dispatch({
        type: FETCH_CAMPAIGNS_SUCCESS,
        campaignsData: {
          isLoading: false,
          data
        }
      });
    } catch (error) {
      dispatch({
        type: FETCH_CAMPAIGNS_FAILURE,
        campaignsData: {
          isLoading: false,
          data: []
        }
      });
    }
  };
};

export const changeCampaignStatus = (id, actionOnStatus) => {
  console.log(id, actionOnStatus, "id, actionOnStatus");
  let token = localStorage.getItem("token");
  return async (dispatch, getState) => {
    const state = getState();
    const campaignsData = _get(state, "dashboardData.campaignsData.data", []);
    dispatch({
      type: CHANGE_CAMPAIGN_STATUS_INIT,
      changeCampaignStatus: {
        success: undefined,
        isLoading: true
      }
    });
    try {
      const res = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        url: `${process.env.BASE_URL}${deactivateCampaignApi}/${id}/${actionOnStatus}`
      });
      let success = _get(res, "data.success", undefined);
      if (success) {
        let campaignIndex = _findIndex(campaignsData, ["id", id]);
        if (campaignIndex >= 0) {
          let campaignToChange = { ...campaignsData[campaignIndex] };
          let status = _get(campaignToChange, "status", 0);
          if (status === 1 || status === 3) {
            status = 2;
          } else if (status === 2) {
            status = 1;
          }
          campaignToChange = { ...campaignToChange, status };
          campaignsData[campaignIndex] = {
            ...campaignToChange
          };
          dispatch({
            type: FETCH_CAMPAIGNS_SUCCESS,
            campaignsData: {
              isLoading: false,
              data: campaignsData
            }
          });
        }
      }
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_SUCCESS,
        changeCampaignStatus: {
          isLoading: false,
          success
        }
      });
    } catch (error) {
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_FAILURE,
        changeCampaignStatus: {
          isLoading: false,
          success: false
        }
      });
    }
  };
};

export const setCampaignEditMode = (
  selectedCampaignData,
  isCampaignEditMode
) => {
  return {
    type: SET_CAMPAIGN_EDIT_MODE,
    isCampaignEditMode,
    selectedCampaignData
  };
};

export const getSmartUrl = platformId => {
  let token = localStorage.getItem("token");

  return async (dispatch, getState) => {
    const state = getState();
    const domainUrlKey = _get(
      state,
      "auth.logIn.userProfile.business_profile.domainUrlKey",
      ""
    );
    let url = "";
    if (platformId === "automatic") {
      url = `${process.env.BASE_URL}${smartUrlApi}/${domainUrlKey}`;
    } else {
      url = `${process.env.BASE_URL}${smartUrlApi}/${domainUrlKey}?p=${platformId}`;
    }
    dispatch({
      type: GET_SMART_URL_INIT,
      smartUrl: {
        isLoading: true,
        success: undefined,
        url: ""
      }
    });
    try {
      const res = await axios({
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        url
      });
      dispatch({
        type: GET_SMART_URL_SUCCESS,
        smartUrl: {
          isLoading: false,
          success: _get(res, "data.success", false),
          url: _get(res, "data.url", "")
        }
      });
    } catch (error) {
      dispatch({
        type: GET_SMART_URL_ERROR,
        smartUrl: {
          isLoading: false,
          success: false,
          url: ""
        }
      });
    }
  };
};

export const addReviewPlatform = data => {
  return async (dispatch, getState) => {
    const { auth } = getState() || {};
    let token = _get(auth, "logIn.token", "");
    dispatch({
      type: ADD_REVIEW_PLATFORM_INIT,
      addReviewPlatformData: {
        success: undefined,
        isLoading: true,
        social_media_app: {},
        errorMsg: ""
      }
    });
    try {
      const result = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data,
        url: `${process.env.BASE_URL}${addReviewPlatformAPI}`
      });
      const success = await _get(result, "data.success", false);
      const social_media_app = await _get(result, "data.social_media_app", {});
      if (success) {
        dispatch(addNewPlatformInReviewPlatforms({ ...social_media_app }));
        dispatch({
          type: ADD_REVIEW_PLATFORM_SUCCESS,
          addReviewPlatformData: {
            success,
            isLoading: false,
            social_media_app,
            errorMsg: ""
          }
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_REVIEW_PLATFORM_ERROR,
        addReviewPlatformData: {
          success: false,
          isLoading: false,
          social_media_app: {},
          errorMsg: _get(error, "response.data.error", "Some error occurred")
        }
      });
    }
  };
};

export const addNewPlatformInReviewPlatforms = data => {
  return async (dispatch, getState) => {
    const state = getState() || {};
    let review_platforms = _get(state, "dashboardData.review_platforms", {});
    let reviewPlatformsData = _get(review_platforms, "data", {});
    const id = _get(data, "id", "");
    const name = _get(data, "name", "");
    if ((id || id == "0") && name) {
      reviewPlatformsData = { ...reviewPlatformsData, [id]: name };
    }
    dispatch({
      type: ADD_NEW_PLATFORM_IN_REVIEW_PLATFORMS,
      updatedReviewPlatforms: reviewPlatformsData
    });
  };
};

export const getAvailableReviewPlatforms = token => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_AVAILABLE_REVIEW_PLATFORMS_INIT,
      review_platforms: {
        success: false,
        isLoading: true,
        errorMsg: "",
        data: {}
      }
    });
    try {
      const res = await axios.get(
        `${process.env.BASE_URL}${getAvailableReviewPlatformsApi}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      let success = _get(res, "data.success", false);
      let review_platforms = _get(res, "data.review_platforms", {});
      let errorMsg = "";
      dispatch({
        type: GET_AVAILABLE_REVIEW_PLATFORMS_SUCCESS,
        review_platforms: {
          data: { ...review_platforms },
          isLoading: false,
          success,
          errorMsg
        }
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: GET_AVAILABLE_REVIEW_PLATFORMS_FAILURE,
        review_platforms: {
          success: false,
          isLoading: false,
          errorMsg: _get(err, "data.response.message", "Some error occurred"),
          data: {}
        }
      });
    }
  };
};

//? this action creator is used to set reviews in dashboarddata after login only
export const setReviewsAfterLogin = socialArray => {
  return async (dispatch, getState) => {
    let reviews = {};
    const state = getState();
    const businessProfile = _get(
      state,
      "auth.logIn.userProfile.business_profile"
    );
    const domainId = _get(businessProfile, "domainId", 0);
    Promise.all(
      socialArray.map(platform => {
        let hasData = _get(platform, "hasData", 0);
        let socialAppId = _get(platform, "social_media_app_id", "");
        let profileId = _get(platform, "id", "");
        if (hasData === 1) {
          return axios
            .get(
              `${process.env.BASE_URL}${thirdPartyDataApi}?domain=${domainId}&socialAppId=${socialAppId}&profileId=${profileId}`
            )
            .then(res => {
              return {
                ...res.data,
                socialAppId,
                profileId
              };
            })
            .catch(err => {
              return {
                err,
                socialAppId,
                profileId
              };
            });
        }
      })
    ).then(resArr => {
      resArr.forEach(res => {
        let success = false;
        let socialAppId = _get(res, "socialAppId", "");
        let profileId = _get(res, "profileId");
        let reviewsArr = _get(res, "data.reviews", []);
        if (isValidArray(reviewsArr)) {
          success = true;
        }
        if (socialAppId && profileId) {
          reviews = {
            ...reviews,
            [socialAppId]: {
              ..._get(reviews, socialAppId, {}),
              [profileId]: {
                ..._get(reviews, socialAppId.profileId, {}),
                data: { ...res },
                isLoading: false,
                success
              }
            }
          };
        }
      });
      dispatch({ type: SET_REVIEWS_AFTER_LOGIN, reviews });
    });
  };
};

//Action creator to set loading status of reviews objects

export const setReviewsLoadingStatus = (scrapingArray = []) => {
  return async (dispatch, getState) => {
    let reviews = _get(state, "dashboardData.reviews", {});
    if (scrapingArray) {
      if (Array.isArray(scrapingArray)) {
        if (scrapingArray.length > 0) {
          const state = getState() || {};
          let scrapingArrayGroupedBySocialId = _groupBy(
            scrapingArray,
            "social_media_app_id"
          );
          // {1:[{}...], 22: [{}...], 23:[{}...]}
          for (let item in scrapingArrayGroupedBySocialId) {
            let selectedSocialMediaAppId = item;
            if (scrapingArrayGroupedBySocialId[item]) {
              if (Array.isArray(scrapingArrayGroupedBySocialId[item])) {
                if (scrapingArrayGroupedBySocialId[item].length > 0) {
                  scrapingArrayGroupedBySocialId[item].forEach(
                    (item, index) => {
                      let selectedAccountId = _get(item, "id", "");
                      if (selectedAccountId) {
                        reviews = {
                          ...reviews,
                          [selectedSocialMediaAppId]: {
                            ...reviews[selectedSocialMediaAppId],
                            [selectedAccountId]: {
                              ..._get(
                                reviews,
                                selectedSocialMediaAppId.selectedAccountId,
                                {}
                              ),
                              isLoading: true,
                              success: false
                            }
                          }
                        };
                      }
                    }
                  );
                }
              }
            }
          }
        }
      }
    }
    dispatch({ type: SET_LOADING_STATUS_OF_REVIEWS, reviews: { ...reviews } });
  };
};
