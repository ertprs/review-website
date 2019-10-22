//AUTH ACTION TYPES

export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const BUSINESS_LOGIN_INIT = "BUSINESS_LOGIN_INIT";
export const BUSINESS_LOGIN_SUCCESS = "BUSINESS_LOGIN_SUCCESS";
export const BUSINESS_LOGIN_FAILURE = "BUSINESS_LOGIN_FAILURE";

export const SIGNUP_INIT = "SIGNUP_INIT";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const BUSINESS_SIGNUP_INIT = "BUSINESS_SIGNUP_INIT";
export const BUSINESS_SIGNUP_SUCCESS = "BUSINESS_SIGNUP_SUCCESS";
export const BUSINESS_SIGNUP_FAILURE = "BUSINESS_SIGNUP_FAILURE";

export const TRUST_VOTE_INIT = "TRUST_VOTE_INIT";
export const TRUST_VOTE_SUCCESS = "TRUST_VOTE_SUCCESS";
export const TRUST_VOTE_FAILURE = "TRUST_VOTE_FAILURE";

export const OAUTH_SIGNIN_INIT = "OAUTH_SIGNIN_INIT";
export const OAUTH_SIGNIN_END = "OAUTH_SIGNIN_END";

export const LOGOUT = "LOGOUT";

export const SEND_TRUST_DATA_LATER = "SEND_TRUST_DATA_LATER";
export const REDIRECT_TO_LOGIN_WITH_EMAIL = "REDIRECT_TO_LOGIN_WITH_EMAIL";

export const ACTIVATE_USER_INIT = "ACTIVATE_USER_INIT";
export const ACTIVATE_USER_SUCCESS = "ACTIVATE_USER_SUCCESS";
export const ACTIVATE_USER_FAILURE = "ACTIVATE_USER_FAILURE";

export const VERIFY_RESET_PASSWORD_TOKEN_INIT =
  "VERIFY_RESET_PASSWORD_TOKEN_INIT";
export const VERIFY_RESET_PASSWORD_TOKEN_SUCCESS =
  "VERIFY_RESET_PASSWORD_TOKEN_SUCCESS";
export const VERIFY_RESET_PASSWORD_TOKEN_FAILURE =
  "VERIFY_RESET_PASSWORD_TOKEN_FAILURE";

export const RESET_PASSWORD_INIT = "RESET_PASSWORD_INIT";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

//DOMAIN DATA TYPES
export const SET_DOMAIN_DATA_IN_REDUX = "SET_DOMAIN_DATA_IN_REDUX";
export const SET_DOMAIN_PROFILE_LOADER = "SET_DOMAIN_PROFILE_LOADER";

//DASHBOARD DATA TYPES
export const SET_GET_REVIEWS_DATA = "SET_GET_REVIEWS_DATA";

export const FETCH_REVIEWS_DATA_INIT = "FETCH_REVIEWS_DATA_INIT";
export const FETCH_REVIEWS_DATA_SUCCESS = "FETCH_REVIEWS_DATA_SUCCESS";
export const FETCH_REVIEWS_DATA_FAILURE = "FETCH_REVIEWS_DATA_FAILURE";

export const SEND_GET_REVIEWS_INIT = "SEND_GET_REVIEWS_INIT";
export const SEND_GET_REVIEWS_SUCCESS = "SEND_GET_REVIEWS_SUCCESS";
export const SEND_GET_REVIEWS_FAILURE = "SEND_GET_REVIEWS_FAILURE";

export const LOCATE_PLACE_INIT = "LOCATE_PLACE_INIT";
export const LOCATE_PLACE_SUCCESS = "LOCATE_PLACE_SUCCESS";
export const LOCATE_PLACE_FAILURE = "LOCATE_PLACE_FAILURE";

//Start Loading on Router.push
export const START_LOADING_ON_ROUTER_PUSH = "START_LOADING_ON_ROUTER_PUSH";
export const STOP_LOADING_ON_ROUTER_PUSH = "STOP_LOADING_ON_ROUTER_PUSH";

//Resent Activation Link
export const RESEND_ACTIVATION_LINK_INIT = "RESEND_ACTIVATION_LINK_INIT";
export const RESEND_ACTIVATION_LINK_SUCCESS = "RESEND_ACTIVATION_LINK_SUCCESS";
export const RESEND_ACTIVATION_LINK_FAILURE = "RESEND_ACTIVATION_LINFAILURE";

export const SET_USER_ACTIVATED = "SET_USER_ACTIVATED";

//UPGRADE TO PREMIUM
export const UPGRADE_TO_PREMIUM_INIT = "UPGRADE_TO_PREMIUM_INIT";
export const UPGRADE_TO_PREMIUM_SUCCESS = "UPGRADE_TO_PREMIUM_SUCCESS";
export const UPGRADE_TO_PREMIUM_FAILURE = "UPGRADE_TO_PREMIUM_FAILURE";
