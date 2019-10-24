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
  SET_CAMPAIGN_LANGUAGE
} from "./actionTypes";
import axios from "axios";
import cookie from "js-cookie";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import {
  upgradePremiumApi,
  transactionHistoryApi,
  createCampaignApi,
  fetchCampaignLanguageApi
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
        dispatch(fetchReviews(token));
        cookie.set("placeLocated", true, { expires: 7 });
      }
    } catch (error) {
      dispatch({
        type: LOCATE_PLACE_FAILURE,
        locatePlace: {
          success: _get(error, "response.data.success", false)
        },
        locatePlaceTemp: {
          isLoading: false,
          errorMsg: _get(error, "response.data.error", "Some Error Occured!")
        }
      });
    }
  };
};

export const upgradeToPremium = data => {
  console.log(data, "data");
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

export const createCampaign = data => {
  console.log(data, "craete campaign data");
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
        console.log(locales, "locales");
        const data = createCampaignLanguage(locales);
        console.log(data, "data is here");
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
