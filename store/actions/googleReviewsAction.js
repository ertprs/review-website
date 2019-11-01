import {
  FETCH_GOOGLE_REVIEWS_DATA_INIT,
  FETCH_GOOGLE_REVIEWS_DATA_SUCCESS,
  FETCH_GOOGLE_REVIEWS_DATA_FAILURE
} from "./actionTypes";
import { fetchGoogleReviewsApi } from "../../utility/config";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";

export const fetchGoogleReviews = (domain, page, perPage) => {
  const pageNo = page || 1;
  const perPageLimit = perPage || 16;
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_GOOGLE_REVIEWS_DATA_INIT,
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
        url: `${process.env.BASE_URL}${fetchGoogleReviewsApi}?perPage=${perPageLimit}&page=${pageNo}&domain=${domain}`
      });
      let success = false;
      let reviews = _get(result, "data.reviews", []);
      if (!_isEmpty(reviews) && Array.isArray(reviews)) {
        success = true;
      }
      dispatch({
        type: FETCH_GOOGLE_REVIEWS_DATA_SUCCESS,
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
        type: FETCH_GOOGLE_REVIEWS_DATA_FAILURE,
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
