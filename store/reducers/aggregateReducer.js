import {
  GET_AGGREGATE_DATA_INIT,
  GET_AGGREGATE_DATA_SUCCESS,
  GET_AGGREGATE_DATA_FAILURE,
  SET_AGGREGATE_DATA_SUCCESS
} from "../actions/actionTypes";

const aggregateReducer = (state = {}, action) => {
  const { type, aggregateData } = action;
  switch (type) {
    case GET_AGGREGATE_DATA_INIT:
      return { ...state, type, ...aggregateData };
    case GET_AGGREGATE_DATA_SUCCESS : 
      return {...state, type, ...aggregateData};
    case GET_AGGREGATE_DATA_FAILURE:
      return {...state, type, ...aggregateData}
    case SET_AGGREGATE_DATA_SUCCESS : 
      return {...state, type, ...aggregateData}
    default:
      return state;
  }
};

export default aggregateReducer;
