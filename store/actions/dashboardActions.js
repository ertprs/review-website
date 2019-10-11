import {
  SET_GET_REVIEWS_DATA,
  FETCH_REVIEWS_DATA_INIT,
  FETCH_REVIEWS_DATA_SUCCESS,
  FETCH_REVIEWS_DATA_FAILURE,
  SEND_GET_REVIEWS_INIT,
  SEND_GET_REVIEWS_SUCCESS,
  SEND_GET_REVIEWS_FAILURE
} from "./actionTypes";
import axios from "axios";

export const setGetReviewsData = getReviewsData => {
  return {
    type: SET_GET_REVIEWS_DATA,
    getReviewsData
  };
};

export const fetchReviews = api => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_REVIEWS_DATA_INIT,
      reviewsData: []
    });
    try {
      const result = await axios.get(api);
      dispatch({ type: FETCH_REVIEWS_DATA_SUCCESS, reviewsData: [] });
    } catch (error) {
      dispatch({
        type: FETCH_REVIEWS_DATA_FAILURE,
        reviewsData: []
      });
    }
  };
};

export const sendGetReviews = api => {
  return async (dispatch, getState) => {
    dispatch({
      type: SEND_GET_REVIEWS_INIT,
      result: []
    });
    try {
      const result = await axios.get(api);
      dispatch({ type: SEND_GET_REVIEWS_SUCCESS, result: [] });
    } catch (error) {
      dispatch({
        type: SEND_GET_REVIEWS_FAILURE,
        result: []
      });
    }
  };
};
