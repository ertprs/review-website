import {
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "./actionTypes";
import _get from "lodash/get";
import { baseURL } from "../../utility/config";
import axios from "axios";

export const signUp = userData => {
  return async (dispatch, getState) => {
    dispatch({ type: SIGNUP_INIT, payload: { signUpSuccess:false, status:-1 , isSigningUp: true } });
    const res = await axios.post(`${baseURL}/api/register`, userData);
    try {
      let success = _get(res, "data.success", false);
      let status = _get(res, "status", 0);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: { signUpSuccess: success, status:status, isSigningUp: false }
      });
    } catch (error) {
      let success = _get(error, "respnse.data.success", false);
      let status = _get(error, "response.status", 0);
      dispatch({
        type: SIGNUP_FAILURE,
        payload: { signUpSuccess: success, status: status, isSigningUp: false }
      });
    }
  };
};
