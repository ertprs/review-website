import {
  SET_DOMAIN_DATA_IN_REDUX,
  SET_DOMAIN_PROFILE_LOADER,
  REPORT_DOMAIN_INIT,
  REPORT_DOMAIN_SUCCESS,
  REPORT_DOMAIN_FAILURE,
  REPORT_DOMAIN_AFTER_LOGIN
} from "./actionTypes";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { iconNames } from "../../utility/constants/socialMediaConstants";
import { reportDomainApi } from "../../utility/config";
import axios from "axios";

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
            name: iconNames[item].name,
            followers: payload[item].followers,
            profile_url: payload[item].profile_url,
            icon: iconNames[item].name,
            color: iconNames[item].color
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
        userName: _get(review, "user.name", ""),
        text: _get(review, "text", ""),
        ratings: _get(review, "avg_rating", 0)
      };
      domainReviews = [...domainReviews, temp];
    });
  }
  return {
    data: domainReviews,
    willCome
  };
};

export const setDomainDataInRedux = profileData => {
  const domainProfileData = {
    headerData: createHeaderData(profileData),
    analysisReports: createAnalysisData(profileData),
    trafficReports: createTrafficReports(profileData),
    socialMediaStats: createSocialMediaStats(profileData),
    domainReviews: createDomainReviews(profileData)
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
      await axios({
        method: "POST",
        url: `${process.env.BASE_URL}${reportDomainApi}`,
        headers: { Authorization: `Bearer ${token}` },
        data
      });
      dispatch({
        type: REPORT_DOMAIN_SUCCESS,
        reportDomain: {
          isLoading: false,
          success: true,
          errorMsg: ""
        }
      });
      dispatch(reportDomainAfterLogin({}, false));
    } catch (error) {
      dispatch({
        type: REPORT_DOMAIN_FAILURE,
        reportDomain: {
          isLoading: false,
          success: false,
          errorMsg: "Some error occured in reporting domain!"
        }
      });
      dispatch(reportDomainAfterLogin({}, false));
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
