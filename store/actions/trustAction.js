import {
  TRUST_VOTE_INIT,
  TRUST_VOTE_SUCCESS,
  TRUST_VOTE_FAILURE,
  SEND_TRUST_DATA_LATER
} from "./actionTypes";
import { baseURL } from "../../utility/config";
import _get from 'lodash/get';

import axios from "axios";
import Router from "next/router";

export const sendTrustVote = trustData => {
  console.log(trustData, 'trustData')
  return async (dispatch, getState) => {
    dispatch({ type: TRUST_VOTE_INIT, payload: { shouldSend: false } });
    try {
      const { auth } = getState() || {};
      const { token } = auth.logIn || {};
      const res = await axios({
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        data: { ...trustData },
        url: `${baseURL}/api/applications/domain-review`
      });
      let success = _get(res, "data.success", false);
      dispatch({ type: TRUST_VOTE_SUCCESS, payload: { success, shouldSend: false } })

    } catch (error) {
      let success = _get(error, "response.data.success", false);
      dispatch({ type: TRUST_VOTE_FAILURE, payload: { success, shouldSend: false } })
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
  }
};
