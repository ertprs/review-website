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
  VERIFY_RESET_PASSWORD_TOKEN_FAILURE
} from "../actions/actionTypes";

const authReducer = (state = {}, action) => {
  const {
    type,
    logIn,
    signUp,
    signUpTemp,
    logInTemp,
    tempEmail,
    activateUserTemp,
    verifyTokenTemp
  } = action;
  switch (type) {
    case SIGNUP_INIT:
      return {
        type: type,
        signUp: { ...signUp },
        signUpTemp: { ...signUpTemp }
      };
    case SIGNUP_SUCCESS:
      return {
        type: type,
        signUp: { ...signUp },
        signUpTemp: { ...signUpTemp }
      };
    case SIGNUP_FAILURE:
      return {
        type: type,
        signUp: { ...signUp },
        signUpTemp: { ...signUpTemp }
      };
    case LOGIN_INIT:
      return { type: type, logIn: { ...logIn }, logInTemp: { ...logInTemp } };
    case LOGIN_SUCCESS:
      return { type: type, logIn: { ...logIn }, logInTemp: { ...logInTemp } };
    case LOGIN_FAILURE:
      return { type: type, logIn: { ...logIn }, logInTemp: { ...logInTemp } };

    case REDIRECT_TO_LOGIN_WITH_EMAIL:
      return { type, tempEmail: { ...tempEmail } };
    case ACTIVATE_USER_INIT:
      return {
        ...state,
        type,
        activateUserTemp: { ...activateUserTemp }
      };
    case ACTIVATE_USER_SUCCESS:
      return {
        ...state,
        type,
        activateUserTemp: { ...activateUserTemp }
      };
    case ACTIVATE_USER_FAILURE:
      return {
        ...state,
        type,
        activateUserTemp: { ...activateUserTemp }
      };
    case VERIFY_RESET_PASSWORD_TOKEN_INIT:
      return {
        ...state,
        type,
        verifyTokenTemp: { ...verifyTokenTemp }
      };
    case VERIFY_RESET_PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        type,
        verifyTokenTemp: { ...verifyTokenTemp }
      };
    case VERIFY_RESET_PASSWORD_TOKEN_FAILURE:
      return {
        ...state,
        type,
        verifyTokenTemp: { ...verifyTokenTemp }
      };
    case LOGOUT:
      state = undefined;
      return { type: type, payload: {} };
    default:
      return state;
  }
};

export default authReducer;
