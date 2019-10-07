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
  OAUTH_SIGNIN_END
} from "./actionTypes";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { baseURL, loginApiOAuth, registerApiOAuth } from "../../utility/config";
import axios from "axios";
import { sendTrustVote } from "./trustAction";

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
      const res = await axios.post(`${baseURL}${registerApi}`, signupData);
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
    const { trustVote } = getState();
    const { payload } = trustVote;
    const shouldSend = _get(payload, "shouldSend", false);
    const trustVoteData = _get(payload, "data", {});
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
      const res = await axios.post(`${baseURL}${loginApi}`, loginData);
      let success = _get(res, "data.success", false);
      let userProfile = _get(res, "data.user", {});
      let status = _get(res, "status", 0);
      let token = _get(res, "data.token", "");
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
    } catch (error) {
      let success = _get(error, "response.data.success", false);
      let status = _get(error, "response.status", 0);
      let message = _get(error, "response.data.message", "") === "Unauthorized";
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
  localStorage.removeItem("persist:primary");
  localStorage.removeItem("persist:auth");
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
        success: false
      }
    });
    if (url) {
      let splitUrlArray = url.split("/");
      let token = "";
      if (!_isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
        token = splitUrlArray[splitUrlArray.length - 1];
      }
      if (token) {
        try {
          const res = await axios.get(`${baseURL}${activateUserApi}/${token}`);
          let success = _get(res, "data.success", false);
          dispatch({
            type: ACTIVATE_USER_SUCCESS,
            activateUserTemp: {
              success
            }
          });
        } catch (error) {
          let success = _get(error, "response.data.success", false);
          dispatch({
            type: ACTIVATE_USER_FAILURE,
            activateUserTemp: {
              success
            }
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
          const res = await axios.post(`${baseURL}${verifyTokenApi}`, reqBody);
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
            `${baseURL}${resetPasswordApi}`,
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
