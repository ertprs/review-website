import {
  TRUST_VOTE_INIT,
  TRUST_VOTE_SUCCESS,
  TRUST_VOTE_FAILURE,
  SEND_TRUST_DATA_LATER
} from "../actions/actionTypes";

const trustReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRUST_VOTE_INIT:
      return { type: type, payload: { ...payload } };
    case TRUST_VOTE_SUCCESS:
      return { type: type, payload: { ...payload } };
    case TRUST_VOTE_FAILURE:
      return { type: type, payload: { ...payload } };
    case SEND_TRUST_DATA_LATER:
      return { type: type, payload: { ...payload } };
    default:
      return state;
  }
};

export default trustReducer;
