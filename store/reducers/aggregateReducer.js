import {
  GET_AGGREGATE_DATA_INIT,
  GET_AGGREGATE_DATA_SUCCESS,
  GET_AGGREGATE_DATA_FAILURE,
  SET_AGGREGATE_DATA_SUCCESS,
  REMOVE_AGGREGATE_DATA
} from "../actions/actionTypes";

const aggregateReducer = (state = {}, action) => {
  const { type, aggregateData } = action;
  switch (type) {
    case GET_AGGREGATE_DATA_INIT:
      return { ...state, type, ...aggregateData };
    case GET_AGGREGATE_DATA_SUCCESS:
      return { ...state, type, ...aggregateData };
    case GET_AGGREGATE_DATA_FAILURE:
      return { ...state, type, ...aggregateData };
    case SET_AGGREGATE_DATA_SUCCESS:
      return { ...state, type, ...aggregateData };
    case REMOVE_AGGREGATE_DATA:
      return {};
    default:
      return state;
  }
};

export default aggregateReducer;
