import {
  START_LOADING_ON_ROUTER_PUSH,
  STOP_LOADING_ON_ROUTER_PUSH
} from "../actions/actionTypes";

const loaderReducer = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case START_LOADING_ON_ROUTER_PUSH:
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADING_ON_ROUTER_PUSH:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default loaderReducer;
