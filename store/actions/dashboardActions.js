import {
  SET_GET_REVIEWS_DATA,
  FETCH_REVIEWS_DATA_INIT,
  FETCH_REVIEWS_DATA_SUCCESS,
  FETCH_REVIEWS_DATA_FAILURE,
  SEND_GET_REVIEWS_INIT,
  SEND_GET_REVIEWS_SUCCESS,
  SEND_GET_REVIEWS_FAILURE,
  LOCATE_PLACE_INIT,
  LOCATE_PLACE_SUCCESS,
  LOCATE_PLACE_FAILURE
} from "./actionTypes";
import axios from "axios";
import _get from "lodash/get";

export const setGetReviewsData = getReviewsData => {
  return {
    type: SET_GET_REVIEWS_DATA,
    getReviewsData
  };
};

export const fetchReviews = (token, page, perPage) => {
  const pageNo = page || 1;
  const perPageLimit = perPage || 10;
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_REVIEWS_DATA_INIT,
      reviewsData: {}
    });
    try {
      const result = await axios({
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        url: `${process.env.BASE_URL}/api/my-business/google-reviews?page=${pageNo}&perPage=${perPageLimit}`
      });
      dispatch({
        type: FETCH_REVIEWS_DATA_SUCCESS,
        reviewsData: { ...result.data }
      });
    } catch (error) {
      dispatch({
        type: FETCH_REVIEWS_DATA_FAILURE,
        reviewsData: {}
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

export const locatePlaceByPlaceId = (data, token, url) => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOCATE_PLACE_INIT,
      locatePlace: {
        success: false
      }
    });
    try {
      const result = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data,
        url
      });
      const success= await _get(result, "data.success", false);
      dispatch({
        type: LOCATE_PLACE_SUCCESS,
        locatePlace: {
          success: _get(result, "data.success", false)
        }
      });
      if(success){
        dispatch(fetchReviews(token))
      }
    } catch (error) {
      dispatch({
        type: LOCATE_PLACE_FAILURE,
        locatePlace: {
          success: _get(error, "response.data.success", false)
        }
      });
    }
  };
};
