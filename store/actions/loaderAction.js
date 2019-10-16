import { START_LOADING_ON_ROUTER_PUSH } from "../../store/actions/actionTypes";

export const startLoading = () => {
  return {
    type: START_LOADING_ON_ROUTER_PUSH
  };
};
