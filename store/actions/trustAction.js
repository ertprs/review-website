import {
  TRUST_VOTE_INIT,
  TRUST_VOTE_SUCCESS,
  TRUST_VOTE_FAILURE,
  SEND_TRUST_DATA_LATER
} from "./actionTypes";
import _get from "lodash/get";

import axios from "axios";
import Router from "next/router";

export const sendTrustVote = trustData => {
  return async (dispatch, getState) => {
    dispatch({ type: TRUST_VOTE_INIT, payload: { shouldSend: false } });
    try {
      const { auth } = getState() || {};
      const { token } = auth.logIn || {};
      const res = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: { ...trustData },
        url: `${process.env.BASE_URL}/api/applications/domain-review`
      });
      let success = _get(res, "data.success", false);
      let status = _get(res, "status", 0);
      dispatch({
        type: TRUST_VOTE_SUCCESS,
        payload: { success, shouldSend: false, status }
      });
      setTimeout(() => {
        dispatch({
          type: TRUST_VOTE_INIT,
          payload: { success: undefined, shouldSend: false, status: 0 }
        });
      }, 4000);
    } catch (error) {
      let success = _get(error, "response.data.success", false);
      let status = _get(error, "status", 0);
      dispatch({
        type: TRUST_VOTE_FAILURE,
        payload: { success, shouldSend: false, status }
      });
      setTimeout(() => {
        dispatch({
          type: TRUST_VOTE_INIT,
          payload: { success: undefined, shouldSend: false, status: 0 }
        });
      }, 4000);
    }
  };
};

export const sendTrustDataLater = trustData => {
  return {
    type: SEND_TRUST_DATA_LATER,
    payload: {
      data: { ...trustData },
      shouldSend: true
    }
  };
};
