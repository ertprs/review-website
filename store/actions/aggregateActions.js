import {
  GET_AGGREGATE_DATA_INIT,
  GET_AGGREGATE_DATA_SUCCESS,
  GET_AGGREGATE_DATA_FAILURE,
  SET_AGGREGATE_DATA_SUCCESS
} from "../actions/actionTypes";
import axios from "axios";
import _get from "lodash/get";
import { thirdPartyDataApi } from "../../utility/config";

export const setAggregateData = data => {
  return { type: SET_AGGREGATE_DATA_SUCCESS, aggregateData: { ...data } };
};

export const getAggregateData = (data, id) => {
  return async (dispatch, getState) => {
    const socialAppId = _get(data, "response.socialAppId", "");
    dispatch({
      type: GET_AGGREGATE_DATA_INIT,
      aggregateData: {}
    });
    try {
      const result = await axios.get(
        `${process.env.BASE_URL}${thirdPartyDataApi}?domain=${id}&socialAppId=${socialAppId}`
      );
      //   console.log(result, "result");
      dispatch({
        type: GET_AGGREGATE_DATA_SUCCESS,
        aggregateData: { [socialAppId]: { ...result.data } }
      });
    } catch (error) {
      dispatch({
        type: GET_AGGREGATE_DATA_FAILURE,
        aggregateData: {}
      });
      //   console.log(error, "error");
    }
  };
};

// return { type: SET_AGGREGATE_DATA, aggregateData: { ...data, id } };
