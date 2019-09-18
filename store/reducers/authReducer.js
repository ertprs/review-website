import {
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/actionTypes";

const initialState = {
  signUpSuccess: false,
  isSigningUp: false,
  isSignUpFailed: false,
  authorized: false,
  status: -1,
  isLoggingIn: true,
  isLoginFailed: false,
  loginType: 0,
  token: ""
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_INIT:
      return { type: type, payload: { ...payload } };
    case SIGNUP_SUCCESS:
      return { type: type, payload: { ...payload } };
    case SIGNUP_FAILURE:
      return { type: type, payload: { ...payload } };
    case LOGIN_INIT:
      return { type: type, payload: { ...payload } };
    case LOGIN_SUCCESS:
      return { type: type, payload: { ...payload } };
    case LOGIN_FAILURE:
      return { type: type, payload: { ...payload } };
    default:
      return state;
  }
};
export default authReducer;
