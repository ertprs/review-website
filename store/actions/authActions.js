import Router from "next/router";
import {
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REDIRECT_TO_LOGIN_WITH_EMAIL
} from "./actionTypes";
import _get from "lodash/get";
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
        if (status === 200 && success) {
          dispatch(logIn(signupData, loginApiOAuth, signUpType));
        }
      }
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
    } catch (error) {
      let success = _get(error, "response.data.success", false);
      let status = _get(error, "response.status", 0);
      if (signUpType == 2 || signUpType == 3) {
        if (status === 409 || status === 500) {
          dispatch(logIn(signupData, loginApiOAuth, signUpType));
        }
      }
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
