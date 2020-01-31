import {
  FETCH_PROFILE_REVIEWS_INIT,
  FETCH_PROFILE_REVIEWS_SUCCESS,
  FETCH_PROFILE_REVIEWS_FAILURE
} from "./actionTypes";
import { fetchProfileReviewsApi } from "../../utility/config";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";

//? verbose true will give complete data like url, followers, rating, review. By default it's false
export const fetchProfileReviews = (
  domain = "",
  page = 1,
  perPage = 10,
  showAll = false,
  platformId,
  profileId,
  rating,
  verbose
) => {
  //? if we finalize to max 100 reviews then this will work
  // if (showAll) {
  //   page = 1;
  //   perPage = 100;
  // }
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_PROFILE_REVIEWS_INIT,
      reviews: {
        data: {},
        isFetching: true,
        error: "",
        success: "undefined"
      }
    });
    try {
      const result = await axios({
        method: "GET",
        url: `${process.env.BASE_URL}${fetchProfileReviewsApi}?perPage=${perPageLimit}&page=${pageNo}&domain=${domain}&platform=${platformId}`
      });
      let success = false;
      let reviews = _get(result, "data.reviews", []);
      if (!_isEmpty(reviews) && Array.isArray(reviews)) {
        success = true;
      }
      dispatch({
        type: FETCH_PROFILE_REVIEWS_SUCCESS,
        reviews: {
          data: { ...result.data },
          isFetching: false,
          error: "",
          success
        }
      });
    } catch (err) {
      const success = _get(err, "response.data.success", false);
      const error = _get(err, "response.data.error", "Some Error Occured.");
      dispatch({
        type: FETCH_PROFILE_REVIEWS_FAILURE,
        reviews: {
          data: {},
          isFetching: false,
          error,
          success
        }
      });
    }
  };
};
