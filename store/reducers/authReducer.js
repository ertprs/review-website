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
  status: -1,
  isSigningUp: false,
  isSignupFailed: false
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
    default:
      return state;
  }
};
export default authReducer;
