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
  SET_GOOGLE_DIRECT_REVIEW_URL,
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
  FETCH_THIRD_PARTY_REVIEWS_INIT,
  FETCH_THIRD_PARTY_REVIEWS_SUCCESS,
  FETCH_THIRD_PARTY_REVIEWS_FAILURE
} from "./actionTypes";
import axios from "axios";
import cookie from "js-cookie";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { iconNames } from "../../utility/constants/socialMediaConstants";
import {
  upgradePremiumApi,
  transactionHistoryApi,
  createCampaignApi,
  fetchCampaignLanguageApi,
  fetchEmailTemplateApi,
  updateCompanyDetailsApi,
  updateUserDetailsApi,
  updateDomainDetailsApi,
  thirdPartyDataApi
} from "../../utility/config";
import createCampaignLanguage from "../../utility/createCampaignLang";

export const setGetReviewsData = getReviewsData => {
  return {
    type: SET_GET_REVIEWS_DATA,
    getReviewsData
  };
};

export const fetchReviews = (token, page, perPage) => {
  const pageNo = page || 1;
  const perPageLimit = perPage || 10;
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_REVIEWS_DATA_INIT,
      reviews: {
        data: {},
        isFetching: true,
        error: "",
        success: "undefined"
      }
    });
    try {
      const result = await axios({
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        url: `${process.env.BASE_URL}/api/my-business/google-reviews?page=${pageNo}&perPage=${perPageLimit}`
      });
      let success = false;
      let reviews = _get(result, "data.reviews", []);
      if (!_isEmpty(reviews) && Array.isArray(reviews)) {
        success = true;
      }
      dispatch({
        type: FETCH_REVIEWS_DATA_SUCCESS,
        reviews: {
          data: { ...result.data },
          isFetching: false,
          error: "",
          success
        }
      });
    } catch (err) {
      const success = _get(err, "response.data.success", false);
      const error = _get(err, "response.data.error", "Some Error Occured.");
      dispatch({
        type: FETCH_REVIEWS_DATA_FAILURE,
        reviews: {
          data: {},
          isFetching: false,
          error,
          success
        }
      });
    }
  };
};

export const clearReviewsData = () => {
  return {
    type: FETCH_REVIEWS_DATA_SUCCESS,
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
      const success = await _get(result, "data.success", false);
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
      if (success) {
        // dispatch(fetchReviews(token));
        cookie.set("placeLocated", true);
      }
    } catch (error) {
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

export const setGoogleDirectReviewUrl = (
  googleDirectReviewUrl,
  businessAddress,
  googlePlaceId
) => {
  return {
    type: SET_GOOGLE_DIRECT_REVIEW_URL,
    googleDirectReviewUrl,
    businessAddress,
    googlePlaceId
  };
};

export const setReviewsPusherConnect = isReviewsPusherConnected => {
  return {
    type: SET_REVIEWS_PUSHER_CONNECT,
    isReviewsPusherConnected
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
        type: UPDATE_USER_DETAILS_ERROR,
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

export const getThirdPartyReviews = (socialAppId, domainId) => {
  if (socialAppId && domainId) {
    return async (dispatch, getState) => {
      let socialAppName = `${iconNames[socialAppId].name}Reviews`;
      dispatch({
        type: FETCH_THIRD_PARTY_REVIEWS_INIT,
        thirdPartyReviews: {
          [socialAppName]: {
            isLoading: true,
            success: undefined,
            errorMsg: "",
            data: {}
          }
        }
      });
      try {
        const result = await axios.get(
          `${process.env.BASE_URL}${thirdPartyDataApi}?domain=${domainId}&socialAppId=${socialAppId}`
        );
        let success = false;
        let reviews = _get(result, "data.data.reviews", []);
        if (reviews) {
          if (!_isEmpty(reviews) && Array.isArray(reviews)) {
            success = true;
          }
        }
        dispatch({
          type: FETCH_THIRD_PARTY_REVIEWS_SUCCESS,
          thirdPartyReviews: {
            [socialAppName]: {
              isLoading: false,
              success,
              errorMsg: "",
              data: _get(result, "data.data", {})
            }
          }
        });
      } catch (error) {
        dispatch({
          type: FETCH_THIRD_PARTY_REVIEWS_FAILURE,
          thirdPartyReviews: {
            [socialAppName]: {
              isLoading: false,
              success: false,
              errorMsg: _get(
                error,
                "response.data.message",
                "Unable to fetch reviews!"
              ),
              data: {}
            }
          }
        });
      }
    };
  }
};
