import {
  FETCH_PROFILE_REVIEWS_INIT,
  FETCH_PROFILE_REVIEWS_SUCCESS,
  FETCH_PROFILE_REVIEWS_FAILURE
} from "../actions/actionTypes";

const googleReviewsReducer = (state = {}, action) => {
  const { type, reviews } = action;
  switch (type) {
    case FETCH_PROFILE_REVIEWS_INIT:
      return {
        //!will be changed
        ...state,
        type,
        reviews
      };
    case FETCH_PROFILE_REVIEWS_SUCCESS:
      return {
        ...state,
        type,
        reviews
      };
    case FETCH_PROFILE_REVIEWS_FAILURE:
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
