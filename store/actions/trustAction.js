import {
  TRUST_VOTE_INIT,
  TRUST_VOTE_SUCCESS,
  TRUST_VOTE_FAILURE
} from "./actionTypes";
import { baseURL } from "../../utility/config";

import axios from "axios";

export const sendTrustVote = trustData => {
  return async (dispatch, getState) => {
    dispatch({ type: TRUST_VOTE_INIT, payload: {} });
    try {
      const res = await axios({
        method: "POST",
        headers: { "Authorization": `bearer ${localStorage.getItem("token")}` },
        data: {...trustData},
        url:`${baseURL}/api/applications/domain-trust`
      });
      let success = _get(res, "data.success", false);
      dispatch({type:TRUST_VOTE_SUCCESS, payload:{success}})

    } catch (error) {
      let success = _get(error, "response.data.success", false);
      dispatch({type:TRUST_VOTE_FAILURE, payload:{success}})
    }
  };
};
