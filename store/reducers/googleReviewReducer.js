import {
  FETCH_GOOGLE_REVIEWS_DATA_INIT,
  FETCH_GOOGLE_REVIEWS_DATA_SUCCESS,
  FETCH_GOOGLE_REVIEWS_DATA_FAILURE
} from "../actions/actionTypes";

const googleReviewsReducer = (state = {}, action) => {
  const { type, reviews } = action;
  switch (type) {
    case FETCH_GOOGLE_REVIEWS_DATA_INIT:
      return {
        //!will be changed
        ...state,
        type,
        reviews
      };
    case FETCH_GOOGLE_REVIEWS_DATA_SUCCESS:
      return {
        ...state,
        type,
        reviews
      };
    case FETCH_GOOGLE_REVIEWS_DATA_FAILURE:
      return {
        ...state,
        type,
        reviews
      };
    default:
      return state;
  }
};

export default googleReviewsReducer;
