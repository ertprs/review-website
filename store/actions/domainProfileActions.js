import {
  SET_DOMAIN_DATA_IN_REDUX,
  SET_DOMAIN_PROFILE_LOADER,
  REPORT_DOMAIN_INIT,
  REPORT_DOMAIN_SUCCESS,
  REPORT_DOMAIN_FAILURE,
  REPORT_DOMAIN_AFTER_LOGIN,
  REDIRECT_TO_REGISTRATION_WITH_DOMAIN_PREFILL,
  FETCH_PROFILE_REVIEWS_INIT,
  FETCH_PROFILE_REVIEWS_SUCCESS,
  FETCH_PROFILE_REVIEWS_FAILURE,
  FETCH_PROFILE_REVIEWS_INITIALLY
} from "./actionTypes";
import { iconNames } from "../../utility/constants/socialMediaConstants";
import { reportDomainApi, fetchProfileReviewsApi } from "../../utility/config";
import { isValidArray } from "../../utility/commonFunctions";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isNumber from "lodash/isEmpty";
import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";

const createHeaderData = data => {
  let willCome = false;
  let isScheduled = false;
  if (Array.isArray(data.sch)) {
    const domain_data = data.sch.includes("domain_data");
    const reviews = data.sch.includes("reviews");
    const general_analysis = data.sch.includes("general_analysis");
    isScheduled = domain_data || reviews || general_analysis;
  }
  willCome =
    data.hasOwnProperty("domain_data") ||
    data.hasOwnProperty("reviews") ||
    data.hasOwnProperty("general_analysis") ||
    isScheduled;
  const parsedData = {
    ...parsedData,
    domain_name: _get(data, "domain_data.name", ""),
    is_verified: _get(data, "domain_data.is_verified", false),
    company: _get(data, "domain_data.company", ""),
    screenshot: _get(data, "domain_data.screenshot", ""),
    review_length: _get(data, "reviews.domain.total", 0),
    rating: _get(data, "general_analysis.payload.ratings.watchdog", 0)
  };
  return {
    data: parsedData,
    willCome
  };
};

const createAnalysisData = data => {
  let willCome = false;
  let isScheduled = false;
  if (Array.isArray(data.sch)) {
    const whois = data.sch.includes("whois");
    const ssl = data.sch.includes("ssl");
    const etherscam = data.sch.includes("etherscam");
    const phishtank = data.sch.includes("phishtank");
    const wot = data.sch.includes("wot");
    const deface = data.sch.includes("deface");

    isScheduled = whois || ssl || etherscam || phishtank || wot || deface;
  }
  let doesKeyExist =
    data.hasOwnProperty("whois") ||
    data.hasOwnProperty("ssl") ||
    data.hasOwnProperty("etherscam") ||
    data.hasOwnProperty("phishtank") ||
    data.hasOwnProperty("wot") ||
    data.hasOwnProperty("deface") ||
    isScheduled;

  const analysisData = {
    ...analysisData,
    registration_date: _get(data, "whois.payload.registration.value", ""),
    expiration_date: _get(data, "whois.payload.expiration.value", ""),
    connection_safety: _get(data, "ssl.payload.enabled.value", ""),
    organisation_check: _get(data, "ssl.payload.ogranisation.value", ""),
    etherScam_DB: _get(data, "etherscam.payload.status.value", ""),
    phishtank_status: _get(data, "phishtank.payload.status.value", ""),
    trustworthiness: _get(data, "wot.payload.trust.value", 0),
    index_Page_Analysis: _get(data, "deface.payload.index.value", 0),
    redirect_Count: _get(data, "deface.payload.redirect.value", 0)
  };

  if (doesKeyExist) {
    let analysisDataKeys = Object.keys(analysisData);
    if (!_isEmpty(analysisDataKeys) && Array.isArray(analysisDataKeys)) {
      analysisDataKeys.forEach(key => {
        if (analysisData[key] !== null && analysisData[key]) {
          willCome = true;
        }
      });
    }
  }

  let parsedData = {
    data: analysisData,
    willCome
  };
  return parsedData;
};

const createTrafficReports = data => {
  let willCome = false;
  let isScheduled = false;
  if (Array.isArray(data.sch)) {
    isScheduled = data.sch.includes("traffic");
  }
  if (isScheduled || data.hasOwnProperty("traffic")) {
    if (
      _get(data, "traffic.payload.timeline", []) !== null &&
      Array.isArray(_get(data, "traffic.payload.timeline", []))
    ) {
      if (!_isEmpty(_get(data, "traffic.payload.timeline", []))) {
        willCome = true;
      }
    }
  }
  let parsedData = {};
  if (Array.isArray(_get(data, "traffic.payload.timeline", []))) {
    if (_get(data, "traffic.payload.timeline", []).length > 0) {
      const { timeline } = data.traffic.payload;
      parsedData = {
        ...parsedData,
        daily_unique_visitors: _get(
          timeline[0],
          "visits.daily_unique_visitors",
          0
        ),
        monthly_unique_visitors: _get(
          timeline[0],
          "visits.monthly_unique_visitors",
          0
        ),
        pages_per_visit: _get(timeline[0], "visits.pages_per_visit", 0),
        bounce_rate: _get(timeline[0], "visits.bounce_rate", 0),
        alexa_pageviews: _get(timeline[0], "visits.alexa_pageviews", 0)
      };
    }
  }
  return {
    data: parsedData,
    willCome
  };
};

const createSocialMediaStats = data => {
  let willCome = false;
  let isScheduled = false;
  if (Array.isArray(data.sch)) {
    isScheduled = data.sch.includes("social");
  }
  let doesKeyExist;
  if (isScheduled || data.hasOwnProperty("social")) {
    if (_get(data, "social.success", false) === true) {
      doesKeyExist = true;
    }
  }
  let socialMediaStats = [];
  if (
    !_isEmpty(_get(data, "social.payload", {})) &&
    typeof _get(data, "social.payload", {}) === "object"
  ) {
    if (_get(data, "social.payload", {}) !== null) {
      const payload = _get(data, "social.payload", {});
      for (let item in _get(data, "social.payload", {})) {
        let socialTemp = {};
        if (payload[item].verified) {
          socialTemp = {
            ...socialTemp,
            name: (iconNames[item] || {}).name || "",
            followers: payload[item].followers || "",
            profile_url: payload[item].profile_url || "",
            icon: (iconNames[item] || {}).name || "",
            color: (iconNames[item] || {}).color || ""
          };
          socialMediaStats = [...socialMediaStats, socialTemp];
        }
      }
    }
  }
  if (doesKeyExist) {
    socialMediaStats ||
      [].forEach(data => {
        if (data.followers) {
          willCome = true;
        }
      });
  }
  return {
    data: socialMediaStats,
    willCome
  };
};

const createDomainReviews = data => {
  let domainReviews = [];
  let willCome = false;
  let isScheduled = false;
  if (Array.isArray(data.sch)) {
    isScheduled = data.sch.includes("reviews");
  }
  if (isScheduled || data.hasOwnProperty("reviews")) {
    if (
      _get(data, "reviews.domain.reviews", []) !== null &&
      Array.isArray(_get(data, "reviews.domain.reviews", []))
    ) {
      if (!_isEmpty(_get(data, "reviews.domain.reviews", []))) {
        willCome = true;
      }
    }
  }
  if (_get(data, "reviews.domain.reviews", []) !== null) {
    _get(data, "reviews.domain.reviews", []).map(review => {
      let temp = {
        ...temp,
        name: _get(review, "user.name", ""),
        text: _get(review, "text", ""),
        rating: _get(review, "avg_rating", 0)
      };
      domainReviews = [...domainReviews, temp];
    });
  }
  return {
    data: domainReviews,
    willCome
  };
};

const createWotReviews = data => {
  let wotReviews = [];
  let willCome = false;
  let isScheduled = false;
  if (Array.isArray(data.sch)) {
    isScheduled = data.sch.includes("wot");
  }
  if (isScheduled || data.hasOwnProperty("wot")) {
    if (
      _get(data, "wot.payload.comments", []) !== null &&
      Array.isArray(_get(data, "wot.payload.comments", []))
    ) {
      if (!_isEmpty(_get(data, "wot.payload.comments", []))) {
        willCome = true;
      }
    }
  }
  if (_get(data, "wot.payload.comments", []) !== null) {
    _get(data, "wot.payload.comments", []).map(review => {
      let rating = _get(review, "score", 0);
      if (rating) {
        if (_isNumber(rating)) {
          rating = (_get(review, "score", 0) / 100).toFixed(2) * 5;
        } else {
          rating = 0;
        }
      }
      let temp = {
        ...temp,
        name: _get(review, "name", ""),
        text: _get(review, "text", ""),
        rating: rating,
        date: _get(review, "date", "")
      };
      wotReviews = [...wotReviews, temp];
    });
  }
  return {
    data: wotReviews,
    willCome
  };
};

const getOverallRatingAndReviews = data => {
  let totalReviews = 0;
  let averageRating = 0;
  let totalReviewsFromPusher = _get(data, "ratings.total", 0);
  let averageRatingFromPusher = _get(data, "ratings.average", 0);
  let totalReviewsFromPusherUpdated = _get(data, "ratings_update.total", 0);
  let averageRatingFromPusherUpdated = _get(data, "ratings_update.average", 0);
  totalReviews = +totalReviewsFromPusherUpdated
    ? +totalReviewsFromPusherUpdated
    : +totalReviewsFromPusher;
  averageRating = +averageRatingFromPusherUpdated
    ? +averageRatingFromPusherUpdated
    : averageRatingFromPusher;
  return {
    totalReviews,
    averageRating
  };
};

export const setDomainDataInRedux = profileData => {
  const domainProfileData = {
    headerData: createHeaderData(profileData),
    analysisReports: createAnalysisData(profileData),
    trafficReports: createTrafficReports(profileData),
    socialMediaStats: createSocialMediaStats(profileData),
    domainReviews: createDomainReviews(profileData),
    wotReviews: createWotReviews(profileData),
    watchdogRating: _get(
      profileData,
      "general_analysis.payload.ratings.watchdog",
      0
    ),
    isNewDomain: _get(
      profileData,
      "notifications.payload.is_new_domain",
      false
    ),
    overallRatingAndReviews: getOverallRatingAndReviews(profileData)
  };
  return {
    type: SET_DOMAIN_DATA_IN_REDUX,
    domainProfileData
  };
};

export const setLoading = isLoading => {
  return {
    type: SET_DOMAIN_PROFILE_LOADER,
    isLoading
  };
};

export const reportDomain = data => {
  let token = localStorage.getItem("token");
  return async dispatch => {
    dispatch({
      type: REPORT_DOMAIN_INIT,
      reportDomain: {
        isLoading: true,
        success: "undefined",
        errorMsg: ""
      }
    });
    try {
      const result = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}${reportDomainApi}`,
        headers: { Authorization: `Bearer ${token}` },
        data
      });
      const success = _get(result, "data.success", false);
      dispatch({
        type: REPORT_DOMAIN_SUCCESS,
        reportDomain: {
          isLoading: false,
          success,
          errorMsg: ""
        }
      });
    } catch (error) {
      dispatch({
        type: REPORT_DOMAIN_FAILURE,
        reportDomain: {
          isLoading: false,
          success: false,
          errorMsg: "Some error occured in reporting domain!"
        }
      });
    }
  };
};

export const reportDomainAfterLogin = (data, shouldReportDomain) => {
  return {
    type: REPORT_DOMAIN_AFTER_LOGIN,
    reportDomainLaterData: {
      data,
      shouldReportDomain
    }
  };
};

export const redirectWithDomain = (route, domain) => {
  if (route) {
    Router.push(route);
  }
  return {
    type: REDIRECT_TO_REGISTRATION_WITH_DOMAIN_PREFILL,
    domain
  };
};

//? verbose true will give complete data like url, followers, rating, review. By default it's false
//? we are also not passing rating profileId filters, we are only passing platformId that will fetch reviews of all it's profiles
//? replaceReviews will replace the old reviews with new one. When we are coming from broadcast we are replacing it and when we are coming from "show more" we are merging it.
export const fetchProfileReviews = (
  domain = "",
  platformId,
  replaceReviews = false,
  nextUrl = "",
  page = 1,
  perPage = 30,
  profileId,
  rating,
  verbose = 1
) => {
  const token = cookie.get("token") || "";
  const loginType = cookie.get("loginType") || "";
  let url = nextUrl
    ? `${nextUrl}&verbose=${verbose}`
    : `${process.env.BASE_URL}${fetchProfileReviewsApi}?perPage=${perPage}&page=${page}&domain=${domain}&platform=${platformId}&verbose=${verbose}`;
  let axiosConfig = {};
  if (token && loginType === 4) {
    axiosConfig = {
      url,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    };
  } else {
    axiosConfig = {
      url,
      method: "GET"
    };
  }
  return async (dispatch, getState) => {
    const state = getState();
    let platformReviews = _get(state, "profileData.socialPlatformReviews", {});
    let platformObj = _get(platformReviews, platformId, {});
    dispatch({
      type: FETCH_PROFILE_REVIEWS_INIT,
      socialPlatformReviews: {
        ...platformReviews,
        [platformId]: {
          ...platformObj,
          isLoading: true,
          success: undefined
        }
      }
    });
    try {
      const result = await axios({
        ...axiosConfig
      });
      dispatch(
        setProfileReviewsSuccessInReducer(result, platformId, replaceReviews)
      );
    } catch (err) {
      dispatch(setProfileReviewsFailureInReducer(platformId));
    }
  };
};

export const setProfileReviewsSuccessInReducer = (
  result,
  platformId,
  replaceReviews = false
) => {
  return async (dispatch, getState) => {
    const state = getState();
    let platformReviews = _get(state, "profileData.socialPlatformReviews", {});
    let platformObj = _get(platformReviews, platformId, {});
    let success = false;
    let reviewsArr = _get(result, "data.data.reviews", []);
    if (isValidArray(reviewsArr)) {
      success = true;
    }
    let socialPlatformReviews = {};
    if (replaceReviews) {
      socialPlatformReviews = {
        ...platformReviews,
        [platformId]: {
          data: {
            ..._get(platformObj, "data", {}),
            ..._get(result, "data", {}),
            data: {
              ..._get(platformObj, "data.data", {}),
              ..._get(result, "data.data", {}),
              reviews: [..._get(result, "data.data.reviews", [])]
            }
          },
          isLoading: false,
          success
        }
      };
    } else if (!replaceReviews) {
      socialPlatformReviews = {
        ...platformReviews,
        [platformId]: {
          data: {
            ..._get(platformObj, "data", {}),
            ..._get(result, "data", {}),
            data: {
              ..._get(platformObj, "data.data", {}),
              ..._get(result, "data.data", {}),
              reviews: [
                ..._get(platformObj, "data.data.reviews", []),
                ..._get(result, "data.data.reviews", [])
              ]
            }
          },
          isLoading: false,
          success
        }
      };
    }

    dispatch({
      type: FETCH_PROFILE_REVIEWS_SUCCESS,
      socialPlatformReviews: {
        ...socialPlatformReviews
      }
    });
  };
};

export const setProfileReviewsFailureInReducer = platformId => {
  return async (dispatch, getState) => {
    const state = getState();
    let platformReviews = _get(state, "profileData.socialPlatformReviews", {});
    let platformObj = _get(platformReviews, platformId, {});
    dispatch({
      type: FETCH_PROFILE_REVIEWS_FAILURE,
      socialPlatformReviews: {
        ...platformReviews,
        [platformId]: {
          data: { ...platformObj },
          isLoading: false,
          success: false
        }
      }
    });
  };
};

//? This method will receive an array of socialPlatforms and fetch reviews of all of them one by one by making an array of promise and calling Promise.All(). We'll return a socialPlatformReviews object from this action.
export const fetchProfileReviewsInitially = (
  socialPlatformsArr,
  domain,
  page = 1,
  perPage = 30,
  verbose = 1
) => {
  const token = cookie.get("token") || "";
  const loginType = cookie.get("loginType") || "";
  return async dispatch => {
    let socialPlatformReviews = {};
    Promise.all(
      socialPlatformsArr.map(socialPlatform => {
        let platformId = _get(socialPlatform, "id", 0);
        let platformName = _get(socialPlatform, "name", "");
        let axiosConfig = {};
        if (token && loginType === 4) {
          axiosConfig = {
            url: `${process.env.BASE_URL}${fetchProfileReviewsApi}?perPage=${perPage}&page=${page}&domain=${domain}&platform=${platformId}&verbose=${verbose}`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
          };
        } else {
          axiosConfig = {
            url: `${process.env.BASE_URL}${fetchProfileReviewsApi}?perPage=${perPage}&page=${page}&domain=${domain}&platform=${platformId}&verbose=${verbose}`,
            method: "GET"
          };
        }
        return axios({ ...axiosConfig })
          .then(res => {
            return {
              ...res.data,
              platformId,
              platformName
            };
          })
          .catch(err => {
            return {
              err,
              platformId,
              platformName
            };
          });
      })
    )
      .then(resArr => {
        resArr.forEach(res => {
          let success = false;
          let platformId = _get(res, "platformId", "");
          let reviewsArr = _get(res, "data.data.reviews", []);
          if (isValidArray(reviewsArr)) {
            success = true;
          }
          if (platformId) {
            socialPlatformReviews = {
              ...socialPlatformReviews,
              [platformId]: {
                data: { ...res },
                isLoading: false,
                success
              }
            };
          }
        });
      })
      .then(() => {
        dispatch({
          type: FETCH_PROFILE_REVIEWS_INITIALLY,
          socialPlatformReviews: { ...socialPlatformReviews }
        });
      });
  };
};
