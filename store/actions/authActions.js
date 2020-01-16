import Router from "next/router";
import {
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REDIRECT_TO_LOGIN_WITH_EMAIL,
  ACTIVATE_USER_INIT,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAILURE,
  VERIFY_RESET_PASSWORD_TOKEN_INIT,
  VERIFY_RESET_PASSWORD_TOKEN_SUCCESS,
  VERIFY_RESET_PASSWORD_TOKEN_FAILURE,
  RESET_PASSWORD_INIT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  OAUTH_SIGNIN_INIT,
  OAUTH_SIGNIN_END,
  BUSINESS_SIGNUP_INIT,
  BUSINESS_SIGNUP_SUCCESS,
  BUSINESS_SIGNUP_FAILURE,
  BUSINESS_LOGIN_INIT,
  BUSINESS_LOGIN_SUCCESS,
  BUSINESS_LOGIN_FAILURE,
  RESEND_ACTIVATION_LINK_INIT,
  RESEND_ACTIVATION_LINK_SUCCESS,
  RESEND_ACTIVATION_LINK_FAILURE,
  SET_USER_ACTIVATED,
  SET_BUSINESS_SUBSCRIPTION,
  UPDATE_AUTH_SOCIAL_ARRAY,
  GET_AVAILABLE_PLATFORMS_INIT,
  GET_AVAILABLE_PLATFORMS_SUCCESS,
  GET_AVAILABLE_PLATFORMS_FAILURE
} from "./actionTypes";
import _get from "lodash/get";
import {
  loginApiOAuth,
  getAvailablePlatformsApi,
  thirdPartyDataApi
} from "../../utility/config";
import { loginApi } from "../../utility/config";
import axios from "axios";
import {
  setInvitationQuota,
  fetchCampaignLanguage,
  getAvailableReviewPlatforms,
  setReviewsAfterLogin
} from "./dashboardActions";
import { sendTrustVote } from "./trustAction";
import { reportDomain } from "./domainProfileActions";
import { get, find, isEmpty, omit, uniqBy } from "lodash";
import cookie from "js-cookie";
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";
import _omit from "lodash/omit";
import _uniqBy from "lodash/uniqBy";
import { isValidArray } from "../../utility/commonFunctions";

export const signUp = (signupData, registerApi, signUpType) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SIGNUP_INIT,
      signUp: {},
      signUpTemp: {
        status: -1,
        signUpSuccess: false,
        isSigningUp: true,
        isSignupFailed: false
      }
    });
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}${registerApi}`,
        signupData
      );
      let success = get(res, "data.success", false);
      let status = get(res, "status", 0);
      if (signUpType == 2 || signUpType == 3) {
        let oAuthSignUpSuccess = "undefined";
        if (status === 409 || success) {
          oAuthSignUpSuccess = true;
        } else {
          oAuthSignUpSuccess = false;
        }
        dispatch({
          type: SIGNUP_SUCCESS,
          signUp: {},
          signUpTemp: {
            status,
            oAuthSignUpSuccess,
            isSigningUp: false
          }
        });
        if (status === 200 && oAuthSignUpSuccess === true) {
          dispatch(logIn(signupData, loginApiOAuth, signUpType));
        } else {
          dispatch(oAuthSigninginEnd());
        }
      } else {
        dispatch({
          type: SIGNUP_SUCCESS,
          signUp: {},
          signUpTemp: {
            status,
            signUpSuccess: success,
            isSigningUp: false,
            isSignupFailed: false
          }
        });
      }
    } catch (error) {
      let success = get(error, "response.data.success", false);
      let status = get(error, "response.status", 0);
      if (signUpType == 2 || signUpType == 3) {
        let oAuthSignUpSuccess = "undefined";
        if (status === 409) {
          oAuthSignUpSuccess = true;
        } else {
          oAuthSignUpSuccess = false;
        }
        dispatch({
          type: SIGNUP_FAILURE,
          signUp: {},
          signUpTemp: {
            status,
            oAuthSignUpSuccess,
            isSigningUp: false
          }
        });
        if (status === 409) {
          dispatch(logIn(signupData, loginApiOAuth, signUpType));
        } else {
          dispatch(oAuthSigninginEnd());
        }
      } else {
        dispatch({
          type: SIGNUP_FAILURE,
          signUp: {},
          signUpTemp: {
            status,
            signUpSuccess: success,
            isSigningUp: false,
            isSignupFailed: true
          }
        });
      }
    }
  };
};

export const logIn = (loginData, loginApi, loginType) => {
  return async (dispatch, getState) => {
    const { trustVote, profileData } = getState();
    const { payload } = trustVote;
    const { reportDomainLaterData } = profileData;
    const shouldSend = get(payload, "shouldSend", false);
    const trustVoteData = get(payload, "data", {});
    const shouldReportDomain = get(
      reportDomainLaterData,
      "shouldReportDomain",
      false
    );
    const reportDomainData = get(reportDomainLaterData, "data", {});
    dispatch({
      type: LOGIN_INIT,
      logIn: {
        authorized: false,
        loginType: 0,
        token: "",
        userProfile: {}
      },
      logInTemp: {
        status: -1,
        isWrongCredentials: false,
        isLoginFailed: false,
        isLoggingIn: true
      }
    });
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}${loginApi}`,
        loginData
      );
      let success = get(res, "data.success", false);
      let userProfile = get(res, "data.user", {});
      let status = get(res, "status", 0);
      let token = get(res, "data.token", "");
      if (success) {
        localStorage.setItem("token", token);
        cookie.set("loginType", loginType, { expires: 7 });
        cookie.set("token", token, { expires: 7 });
      }
      dispatch({
        type: LOGIN_SUCCESS,
        logIn: {
          authorized: success,
          loginType,
          token,
          userProfile
        },
        logInTemp: {
          status: status,
          isWrongCredentials: false,
          isLoginFailed: !success,
          isLoggingIn: false
        }
      });
      dispatch(oAuthSigninginEnd());
      if (success && shouldSend) {
        dispatch(sendTrustVote(trustVoteData));
      }
      if (success && shouldReportDomain) {
        dispatch(reportDomain(reportDomainData));
      }
    } catch (error) {
      let success = get(error, "response.data.success", false);
      let status = get(error, "response.status", 0);
      let message = get(error, "response.data.error", "") === "Unauthorized";
      dispatch({
        type: LOGIN_FAILURE,
        logIn: {
          authorized: false,
          loginType: 0,
          token: "",
          userProfile: {}
        },
        logInTemp: {
          status: status,
          isWrongCredentials: message,
          isLoginFailed: !success,
          isLoggingIn: false
        }
      });
      dispatch(oAuthSigninginEnd());
    }
  };
};

export const logOut = () => {
  cookie.remove("loginType");
  cookie.remove("token");
  cookie.remove("placeLocated");
  cookie.remove("placeId");
  localStorage.removeItem("persist:primary");
  localStorage.removeItem("persist:auth");
  localStorage.removeItem("userActivated");
  localStorage.removeItem("persist:dashboardData");
  localStorage.clear();
  window.location.reload();
  return {
    type: LOGOUT,
    payload: {}
  };
};

// ? This will redirect the user to login page with email prefilled in case of already registered.
export const redirectToLoginWithEmail = email => {
  Router.push("/login");
  return {
    type: REDIRECT_TO_LOGIN_WITH_EMAIL,
    tempEmail: {
      emailPrefill: true,
      email
    }
  };
};

export const activateUser = (url, activateUserApi) => {
  return async dispatch => {
    dispatch({
      type: ACTIVATE_USER_INIT,
      activateUserTemp: {
        success: false,
        isLoading: true
      },
      userActivated: false
    });
    if (url) {
      let splitUrlArray = url.split("/");
      let token = "";
      if (!isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
        token = splitUrlArray[splitUrlArray.length - 1];
      }
      if (token) {
        try {
          const res = await axios.get(
            `${process.env.BASE_URL}${activateUserApi}/${token}`
          );
          let success = get(res, "data.success", false);
          dispatch({
            type: ACTIVATE_USER_SUCCESS,
            activateUserTemp: {
              success,
              isLoading: false
            },
            userActivated: success
          });
        } catch (error) {
          let success = get(error, "response.data.success", false);
          dispatch({
            type: ACTIVATE_USER_FAILURE,
            activateUserTemp: {
              success,
              isLoading: false
            },
            userActivated: success
          });
        }
      }
    }
  };
};

export const verifyToken = (url, verifyTokenApi) => {
  return async dispatch => {
    dispatch({
      type: VERIFY_RESET_PASSWORD_TOKEN_INIT,
      verifyTokenTemp: {
        success: false,
        verifyingToken: true
      }
    });
    if (url) {
      let splitUrlArray = url.split("/");
      let token = "";
      if (!isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
        token = splitUrlArray[splitUrlArray.length - 1];
      }
      if (token) {
        let reqBody = {
          token: token
        };
        try {
          const res = await axios.post(
            `${process.env.BASE_URL}${verifyTokenApi}`,
            reqBody
          );
          let success = get(res, "data.success", false);
          dispatch({
            type: VERIFY_RESET_PASSWORD_TOKEN_SUCCESS,
            verifyTokenTemp: {
              success,
              verifyingToken: false
            }
          });
        } catch (error) {
          let success = get(error, "response.data.success", false);
          dispatch({
            type: VERIFY_RESET_PASSWORD_TOKEN_FAILURE,
            verifyTokenTemp: {
              success,
              verifyingToken: false
            }
          });
        }
      }
    }
  };
};

export const resetPassword = (password, url, resetPasswordApi) => {
  return async dispatch => {
    dispatch({
      type: RESET_PASSWORD_INIT,
      resetPasswordTemp: {
        success: false,
        resetingPassword: true
      }
    });
    if (url) {
      let splitUrlArray = url.split("/");
      let token = "";
      if (!isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
        token = splitUrlArray[splitUrlArray.length - 1];
      }
      if (token) {
        const reqBody = {
          password: password || "",
          token
        };
        try {
          const res = await axios.post(
            `${process.env.BASE_URL}${resetPasswordApi}`,
            reqBody
          );
          let success = get(res, "data.success", false);
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            resetPasswordTemp: {
              success,
              resetingPassword: false
            }
          });
        } catch (error) {
          let success = get(error, "response.data.success", false);
          dispatch({
            type: RESET_PASSWORD_FAILURE,
            resetPasswordTemp: {
              success,
              resetingPassword: false
            }
          });
        }
      }
    }
  };
};

export const oAuthSigninginInit = () => {
  return {
    type: OAUTH_SIGNIN_INIT
  };
};

export const oAuthSigninginEnd = () => {
  return {
    type: OAUTH_SIGNIN_END
  };
};

export const businessSignUp = (signupData, api) => {
  return async (dispatch, getState) => {
    dispatch({
      type: BUSINESS_SIGNUP_INIT,
      businessSignUp: {},
      businessSignUpTemp: {
        status: -1,
        signUpSuccess: false,
        isSigningUp: true,
        isSignupFailed: false,
        error: ""
      }
    });
    try {
      const res = await axios.post(`${process.env.BASE_URL}${api}`, signupData);
      let success = get(res, "data.success", false);
      let status = get(res, "status", 0);
      if (success) {
        let loginData = {
          email: signupData.email,
          password: signupData.password
        };
        dispatch(businessLogIn(loginData, loginApi));
      }
      dispatch({
        type: BUSINESS_SIGNUP_SUCCESS,
        businessSignUp: {},
        businessSignUpTemp: {
          status,
          signUpSuccess: success,
          isSigningUp: false,
          isSignupFailed: false,
          error: ""
        }
      });
    } catch (err) {
      let success = get(err, "response.data.success", false);
      let status = get(err, "response.status", 0);
      let error = get(err, "response.data.error", "");
      let errorMsg = "";
      //! Some temporary logic to show errors thrown by Laravel
      let errors = get(err, "response.data.errors", {});
      if (errors) {
        let errorsKeyArr = Object.keys(errors);
        if (isValidArray(errorsKeyArr)) {
          if (isValidArray(errors[errorsKeyArr[0]])) {
            errorMsg = errors[errorsKeyArr[0]][0];
          }
        }
      }
      //! *******************************************************
      if (!errorMsg) {
        switch (error) {
          case "invalid_locale":
            errorMsg = "Please, select a valid language.";
            break;
          case "invalid_url":
            errorMsg =
              "Sorry, we cannot verify that domain. Please, check if it is correct and try again.";
            break;
          case "already_claimed":
            errorMsg =
              "Sorry, this domain is already claimed. If you are the owner, please contact support for further assistance.";
            break;
          case "business_account_exists":
            errorMsg =
              "Sorry, this email already has a registered business account.";
            break;
          case "subscription_exists":
            errorMsg = "Sorry, this company is already registered with us.";
            break;
          default:
            errorMsg = "Some Error Occurred while Registration!";
        }
      }
      dispatch({
        type: BUSINESS_SIGNUP_FAILURE,
        businessSignUp: {},
        businessSignUpTemp: {
          status,
          signUpSuccess: success,
          isSigningUp: false,
          isSignupFailed: true,
          error: errorMsg
        }
      });
    }
  };
};

export const businessLogIn = (loginData, api, directLogin) => {
  return async dispatch => {
    let reviews = {};
    dispatch({
      type: BUSINESS_LOGIN_INIT,
      logIn: {
        authorized: "undefined",
        loginType: 0,
        token: "",
        userProfile: {}
      },
      logInTemp: {
        status: -1,
        isWrongCredentials: false,
        isLoginFailed: false,
        isLoggingIn: true,
        error: ""
      }
    });
    try {
      const res = await axios.post(`${process.env.BASE_URL}${api}`, loginData);
      let success = get(res, "data.success", false);
      let userProfile = get(res, "data.user", {});
      let status = get(res, "status", 0);
      let token = get(res, "data.token", "");
      let placeId = get(
        res,
        "data.user.business_profile.google_places.placeId",
        ""
      );
      let loginType = 0;
      const businessProfile = get(res, "data.user.business_profile", {});
      const domainId = get(businessProfile, "domainId", 0);
      const socialArray = get(businessProfile, "social", []);

      if (userProfile.subscription !== null) {
        if (userProfile.hasOwnProperty("subscription")) {
          if (
            userProfile.subscription.plan_type_id === 1 ||
            userProfile.subscription.plan_type_id === 2 ||
            userProfile.subscription.plan_type_id === 3
          ) {
            loginType = 4;
            dispatch(
              setInvitationQuota(
                get(userProfile, "subscription.quota_details", {})
              )
            );
            let subscriptionExpired = get(
              userProfile,
              "subscription.expired",
              false
            );
            cookie.set("loginType", loginType, { expires: 7 });
            cookie.set("token", token, { expires: 7 });
            cookie.set("placeId", placeId, { expires: 7 });
            localStorage.setItem("token", token);
            // dispatch(fetchReviews(token));
            dispatch(getAvailableReviewPlatforms(token));
            dispatch(setSubscription(subscriptionExpired));
            dispatch(fetchCampaignLanguage(token));
            dispatch(getAvailablePlatforms(token));
            dispatch({
              type: BUSINESS_LOGIN_SUCCESS,
              logIn: {
                authorized: success,
                loginType,
                token,
                userProfile
              },
              logInTemp: {
                status: status,
                isWrongCredentials: false,
                isLoginFailed: !success,
                isLoggingIn: false,
                error: ""
              }
            });
            //we are fetching reviews of all social profiles that exist inside social key
            if (isValidArray(socialArray)) {
              dispatch(setReviewsAfterLogin(socialArray));
            }
          }
        }
      } else {
        dispatch({
          type: BUSINESS_LOGIN_FAILURE,
          logIn: {
            authorized: false,
            loginType: 0,
            token: "",
            userProfile: {}
          },
          logInTemp: {
            status: 0,
            isWrongCredentials: false,
            isLoginFailed: true,
            isLoggingIn: false,
            error:
              "You've used this email in your normal user account. Please use different email."
          }
        });
      }
    } catch (err) {
      let success = get(err, "response.data.success", false);
      let status = get(err, "response.status", 0);
      let error = get(err, "response.data.error", "Some Error Occured.");
      let isWrongCredentials =
        get(err, "response.data.error") === "Unauthorized";
      dispatch({
        type: BUSINESS_LOGIN_FAILURE,
        logIn: {
          authorized: false,
          loginType: 0,
          token: "",
          userProfile: {}
        },
        logInTemp: {
          status: status,
          isWrongCredentials,
          isLoginFailed: !success,
          isLoggingIn: false,
          error
        }
      });
    }
  };
};

export const resendActivationLink = (token, api) => {
  return async dispatch => {
    dispatch({
      type: RESEND_ACTIVATION_LINK_INIT,
      resendActivation: {
        success: "undefined",
        isLoading: true
      }
    });
    try {
      const result = await axios({
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        url: `${process.env.BASE_URL}${api}`
      });
      dispatch({
        type: RESEND_ACTIVATION_LINK_SUCCESS,
        resendActivation: {
          success: get(result, "data.success", false),
          isLoading: false
        }
      });
    } catch (err) {
      dispatch({
        type: RESEND_ACTIVATION_LINK_FAILURE,
        resendActivation: {
          success: get(err, "response.data.success", false),
          isLoading: false
        }
      });
    }
  };
};

export const setUserActivated = userActivated => {
  return {
    type: SET_USER_ACTIVATED,
    userActivated
  };
};

export const setSubscription = isSubscriptionExpired => {
  return {
    type: SET_BUSINESS_SUBSCRIPTION,
    isSubscriptionExpired
  };
};

//updating social in auth/logIn/userProfile/business_profile/social with the new url user has changed in getstarted to show cards on home page. currently we are pushing google as well but not displaying it.

export const updateAuthSocialArray = newSocialArray => {
  return {
    type: UPDATE_AUTH_SOCIAL_ARRAY,
    socialArray: [...newSocialArray]
  };
};

export const getAvailablePlatforms = token => {
  return async dispatch => {
    dispatch({
      type: GET_AVAILABLE_PLATFORMS_INIT,
      availablePlatforms: {
        isLoading: true,
        success: undefined,
        data: [],
        errorMsg: ""
      }
    });
    try {
      let result = await axios({
        method: "GET",
        url: `${process.env.BASE_URL}${getAvailablePlatformsApi}`,
        headers: { Authorization: `Bearer ${token}` }
      });
      let response = get(result, "data.shops", []);
      let shops = [];
      let success = false;
      if (response) {
        if (Array.isArray(response) && !isEmpty(response)) {
          shops = response;
          success = true;
        }
      }
      dispatch({
        type: GET_AVAILABLE_PLATFORMS_SUCCESS,
        availablePlatforms: {
          isLoading: false,
          success,
          data: shops,
          errorMsg: ""
        }
      });
    } catch (error) {
      dispatch({
        type: GET_AVAILABLE_PLATFORMS_FAILURE,
        availablePlatforms: {
          isLoading: false,
          success: false,
          data: [],
          errorMsg: get(
            error,
            "response.data.error.message",
            "Some error occurred while fetching available platforms."
          )
        }
      });
    }
  };
};
