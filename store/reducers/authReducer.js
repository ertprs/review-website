import {
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REDIRECT_TO_LOGIN_WITH_EMAIL
} from "../actions/actionTypes";

const authReducer = (state = {}, action) => {
  const {
    type,
    logIn,
    signUp,
    signUpTemp,
    logInTemp,
    tempEmail
  } = action;
  switch (type) {
    case SIGNUP_INIT:
      return { type: type, signUp: { ...signUp }, signUpTemp: { ...signUpTemp } };
    case SIGNUP_SUCCESS:
      return { type: type, signUp: { ...signUp }, signUpTemp: { ...signUpTemp } };
    case SIGNUP_FAILURE:
      return { type: type, signUp: { ...signUp }, signUpTemp: { ...signUpTemp } };
    case LOGIN_INIT:
      return { type: type, logIn: { ...logIn }, logInTemp: { ...logInTemp } };
    case LOGIN_SUCCESS:
      return { type: type, logIn: { ...logIn }, logInTemp: { ...logInTemp } };
    case LOGIN_FAILURE:
      return { type: type, logIn: { ...logIn }, logInTemp: { ...logInTemp } };
    case LOGOUT:
      state = undefined
      return { type: type, payload: {} }
    case REDIRECT_TO_LOGIN_WITH_EMAIL:
      return { type, tempEmail: { ...tempEmail } }
    default:
      return state;
  }
};

export default authReducer;