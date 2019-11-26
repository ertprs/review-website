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
  UPDATE_AUTH_SOCIAL_ARRAY
} from "./actionTypes";
import _get from "lodash/get";
import { loginApiOAuth } from "../../utility/config";
import { loginApi } from "../../utility/config";
import axios from "axios";
import { sendTrustVote } from "./trustAction";
import {
  fetchReviews,
  fetchTransactionHistory,
  getThirdPartyReviews
} from "./dashboardActions";
import cookie from "js-cookie";
import { setInvitationQuota, fetchCampaignLanguage } from "./dashboardActions";
import { reportDomain } from "./domainProfileActions";
import _find from "lodash/find";
import _isEmpty from "lodash/isEmpty";

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
      let success = _get(res, "data.success", false);
      let status = _get(res, "status", 0);
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
      let success = _get(error, "response.data.success", false);
      let status = _get(error, "response.status", 0);
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
    const shouldSend = _get(payload, "shouldSend", false);
    const trustVoteData = _get(payload, "data", {});
    const shouldReportDomain = _get(
      reportDomainLaterData,
      "shouldReportDomain",
      false
    );
    const reportDomainData = _get(reportDomainLaterData, "data", {});
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
      let success = _get(res, "data.success", false);
      let userProfile = _get(res, "data.user", {});
      let status = _get(res, "status", 0);
      let token = _get(res, "data.token", "");
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
      let success = _get(error, "response.data.success", false);
      let status = _get(error, "response.status", 0);
      let message = _get(error, "response.data.error", "") === "Unauthorized";
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
      if (!_isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
        token = splitUrlArray[splitUrlArray.length - 1];
      }
      if (token) {
        try {
          const res = await axios.get(
            `${process.env.BASE_URL}${activateUserApi}/${token}`
          );
          let success = _get(res, "data.success", false);
          dispatch({
            type: ACTIVATE_USER_SUCCESS,
            activateUserTemp: {
              success,
              isLoading: false
            },
            userActivated: success
          });
        } catch (error) {
          let success = _get(error, "response.data.success", false);
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
      if (!_isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
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
          let success = _get(res, "data.success", false);
          dispatch({
            type: VERIFY_RESET_PASSWORD_TOKEN_SUCCESS,
            verifyTokenTemp: {
              success,
              verifyingToken: false
            }
          });
        } catch (error) {
          let success = _get(error, "response.data.success", false);
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
      if (!_isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
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
          let success = _get(res, "data.success", false);
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            resetPasswordTemp: {
              success,
              resetingPassword: false
            }
          });
        } catch (error) {
          let success = _get(error, "response.data.success", false);
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
      let success = _get(res, "data.success", false);
      let status = _get(res, "status", 0);
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
      let success = _get(err, "response.data.success", false);
      let status = _get(err, "response.status", 0);
      let error = _get(err, "response.data.error", "");
      dispatch({
        type: BUSINESS_SIGNUP_FAILURE,
        businessSignUp: {},
        businessSignUpTemp: {
          status,
          signUpSuccess: success,
          isSigningUp: false,
          isSignupFailed: true,
          error
        }
      });
    }
  };
};

export const businessLogIn = (loginData, api, directLogin) => {
  return async dispatch => {
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
      let success = _get(res, "data.success", false);
      let userProfile = _get(res, "data.user", {});
      let status = _get(res, "status", 0);
      let token = _get(res, "data.token", "");
      let placeId = _get(
        res,
        "data.user.business_profile.google_places.placeId",
        ""
      );
      let loginType = 0;
      const businessProfile = _get(res, "data.user.business_profile", {});
      const domainId = _get(businessProfile, "domainId", 0);
      const socialArray = _get(businessProfile, "social", []);
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
                _get(userProfile, "subscription.quota_details", {})
              )
            );
            let subscriptionExpired = _get(
              userProfile,
              "subscription.expired",
              false
            );
            cookie.set("loginType", loginType, { expires: 7 });
            cookie.set("token", token, { expires: 7 });
            cookie.set("placeId", placeId, { expires: 7 });
            dispatch(fetchReviews(token));
            dispatch(fetchTransactionHistory(token));
            dispatch(setSubscription(subscriptionExpired));
            dispatch(fetchCampaignLanguage(token));
            localStorage.setItem("token", token);
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
            // fetch all thirdy party reviews
            if (socialArray) {
              if (socialArray.length > 0) {
                socialArray.map(item => {
                  let hasData = _get(item, "hasData", 0);
                  let socialAppId = _get(item, "social_media_app_id", "");
                  if (hasData === 1) {
                    dispatch(getThirdPartyReviews(socialAppId, domainId));
                  }
                });
              }
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
            error: "Some Error Occured."
          }
        });
      }
    } catch (err) {
      let success = _get(err, "response.data.success", false);
      let status = _get(err, "response.status", 0);
      let error = _get(err, "response.data.error", "Some Error Occured.");
      let isWrongCredentials =
        _get(err, "response.data.error") === "Unauthorized";
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
          success: _get(result, "data.success", false),
          isLoading: false
        }
      });
    } catch (err) {
      dispatch({
        type: RESEND_ACTIVATION_LINK_FAILURE,
        resendActivation: {
          success: _get(err, "response.data.success", false),
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

export const updateAuthSocialArray = data => {
  return async (dispatch, getState) => {
    const state = getState();
    const socialArray = _get(
      state,
      "auth.logIn.userProfile.business_profile.social",
      []
    );
    let arrayOfChangedFields = [];
    let mergeArrayOfChangedFieldsWithSocialArray = [];
    if (data) {
      arrayOfChangedFields = Object.keys(data).map(key => {
        let foundItem = _find(socialArray, ["social_media_app_id", key]);
        if (foundItem) {
          return { ...foundItem, url: data[key] };
        } else {
          return { social_media_app_id: Number(key), url: data[key] };
        }
      });
      if (socialArray && Array.isArray(socialArray) && !_isEmpty(socialArray)) {
        mergeArrayOfChangedFieldsWithSocialArray = socialArray.filter(item => {
          let foundItem = _find(arrayOfChangedFields, [
            "social_media_app_id",
            _get(item, "social_media_app_id", 0)
          ]);
          if (!foundItem) {
            return { ...item };
          }
        });
      }
    }
    dispatch({
      type: UPDATE_AUTH_SOCIAL_ARRAY,
      socialArray: [
        ...arrayOfChangedFields,
        ...mergeArrayOfChangedFieldsWithSocialArray
      ]
    });
  };
};
