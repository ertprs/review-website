import {
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REDIRECT_TO_LOGIN_WITH_EMAIL,
  ACTIVATE_USER_INIT,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAILURE,
  VERIFY_RESET_PASSWORD_TOKEN_INIT,
  VERIFY_RESET_PASSWORD_TOKEN_SUCCESS,
  VERIFY_RESET_PASSWORD_TOKEN_FAILURE,
  RESET_PASSWORD_INIT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  OAUTH_SIGNIN_INIT,
  OAUTH_SIGNIN_END,
  BUSINESS_SIGNUP_INIT,
  BUSINESS_SIGNUP_SUCCESS,
  BUSINESS_SIGNUP_FAILURE,
  BUSINESS_LOGIN_INIT,
  BUSINESS_LOGIN_SUCCESS,
  BUSINESS_LOGIN_FAILURE,
  RESEND_ACTIVATION_LINK_INIT,
  RESEND_ACTIVATION_LINK_SUCCESS,
  RESEND_ACTIVATION_LINK_FAILURE,
  SET_USER_ACTIVATED,
  SET_BUSINESS_SUBSCRIPTION,
  UPDATE_COMPANY_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_DOMAIN_DETAILS_SUCCESS,
  UPDATE_AUTH_SOCIAL_ARRAY,
  SET_GOOGLE_PLACES,
  POST_AUTOMATIC_INVITATION_CONFIG_SUCCESS,
  UPDATE_AUTH_STATE_WITH_CONFIG_DETAILS
} from "../actions/actionTypes";
import { stat } from "fs";

const authReducer = (state = {}, action) => {
  const {
    type,
    logIn,
    signUp,
    signUpTemp,
    logInTemp,
    tempEmail,
    activateUserTemp,
    verifyTokenTemp,
    resetPasswordTemp,
    businessSignUp,
    businessSignUpTemp,
    resendActivation,
    userActivated,
    isSubscriptionExpired,
    companyDetails,
    userDetails,
    domainDetails,
    socialArray,
    googlePlaces,
    ecommerceIntegrations,
    updatedSocialArray
  } = action;
  switch (type) {
    case SIGNUP_INIT:
      return {
        ...status,
        type: type,
        signUp: { ...signUp },
        signUpTemp: { ...signUpTemp }
      };
    case SIGNUP_SUCCESS:
      return {
        type: type,
        signUp: { ...signUp },
        signUpTemp: { ...signUpTemp }
      };
    case SIGNUP_FAILURE:
      return {
        type: type,
        signUp: { ...signUp },
        signUpTemp: { ...signUpTemp }
      };
    case LOGIN_INIT:
      return { type: type, logIn: { ...logIn }, logInTemp: { ...logInTemp } };
    case LOGIN_SUCCESS:
      return { type: type, logIn: { ...logIn }, logInTemp: { ...logInTemp } };
    case LOGIN_FAILURE:
      return { type: type, logIn: { ...logIn }, logInTemp: { ...logInTemp } };

    case REDIRECT_TO_LOGIN_WITH_EMAIL:
      return { type, tempEmail: { ...tempEmail } };
    case ACTIVATE_USER_INIT:
      return {
        ...state,
        type,
        activateUserTemp: { ...activateUserTemp },
        userActivated
      };
    case ACTIVATE_USER_SUCCESS:
      return {
        ...state,
        type,
        activateUserTemp: { ...activateUserTemp },
        userActivated
      };
    case ACTIVATE_USER_FAILURE:
      return {
        ...state,
        type,
        activateUserTemp: { ...activateUserTemp },
        userActivated
      };
    case VERIFY_RESET_PASSWORD_TOKEN_INIT:
      return {
        ...state,
        type,
        verifyTokenTemp: { ...verifyTokenTemp }
      };
    case VERIFY_RESET_PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        type,
        verifyTokenTemp: { ...verifyTokenTemp }
      };
    case VERIFY_RESET_PASSWORD_TOKEN_FAILURE:
      return {
        ...state,
        type,
        verifyTokenTemp: { ...verifyTokenTemp }
      };
    case RESET_PASSWORD_INIT:
      return {
        ...state,
        type,
        resetPasswordTemp: { ...resetPasswordTemp }
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        type,
        resetPasswordTemp: { ...resetPasswordTemp }
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        type,
        resetPasswordTemp: { ...resetPasswordTemp }
      };
    case OAUTH_SIGNIN_INIT:
      return {
        ...state,
        type
      };
    case OAUTH_SIGNIN_END:
      return {
        ...state,
        type
      };
    case BUSINESS_SIGNUP_INIT:
      return {
        ...state,
        type,
        businessSignUp: { ...businessSignUp },
        businessSignUpTemp: { ...businessSignUpTemp }
      };
    case BUSINESS_SIGNUP_SUCCESS:
      return {
        ...state,
        type,
        businessSignUp: { ...businessSignUp },
        businessSignUpTemp: { ...businessSignUpTemp }
      };
    case BUSINESS_SIGNUP_FAILURE:
      return {
        ...state,
        type,
        businessSignUp: { ...businessSignUp },
        businessSignUpTemp: { ...businessSignUpTemp }
      };
    case BUSINESS_LOGIN_INIT:
      return {
        ...state,
        type,
        logIn: { ...logIn },
        logInTemp: { ...logInTemp }
      };
    case BUSINESS_LOGIN_SUCCESS:
      return {
        ...state,
        type,
        logIn: { ...logIn },
        logInTemp: { ...logInTemp }
      };
    case BUSINESS_LOGIN_FAILURE:
      return {
        ...state,
        type,
        logIn: { ...logIn },
        logInTemp: { ...logInTemp }
      };
    case RESEND_ACTIVATION_LINK_INIT:
      return {
        ...state,
        type,
        resendActivation: { ...resendActivation }
      };
    case RESEND_ACTIVATION_LINK_SUCCESS:
      return {
        ...state,
        type,
        resendActivation: { ...resendActivation }
      };
    case RESEND_ACTIVATION_LINK_FAILURE:
      return {
        ...state,
        type,
        resendActivation: { ...resendActivation }
      };
    case SET_USER_ACTIVATED:
      return {
        ...state,
        type,
        userActivated
      };
    case SET_BUSINESS_SUBSCRIPTION: {
      return {
        ...state,
        type,
        isSubscriptionExpired: isSubscriptionExpired || false
      };
    }
    case UPDATE_COMPANY_DETAILS_SUCCESS: {
      return {
        ...state,
        logIn: {
          ...state.logIn,
          userProfile: {
            ...state.logIn.userProfile,
            company: {
              ...state.logIn.userProfile.company,
              ...companyDetails.data
            }
          }
        },
        type
      };
    }
    case UPDATE_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        logIn: {
          ...state.logIn,
          userProfile: {
            ...state.logIn.userProfile,
            ...userDetails.data,
            company: {
              ...state.logIn.userProfile.company
            }
          }
        },
        type
      };
    }
    case UPDATE_DOMAIN_DETAILS_SUCCESS: {
      return {
        ...state,
        logIn: {
          ...state.logIn,
          userProfile: {
            ...state.logIn.userProfile,
            business_profile: {
              ...state.logIn.userProfile.business_profile,
              ...domainDetails.data
            }
          }
        },
        type
      };
    }
    case UPDATE_AUTH_SOCIAL_ARRAY: {
      return {
        ...state,
        logIn: {
          ...state.logIn,
          userProfile: {
            ...state.logIn.userProfile,
            business_profile: {
              ...state.logIn.userProfile.business_profile,
              social: [...socialArray]
            }
          }
        },
        type
      };
    }
    case SET_GOOGLE_PLACES: {
      return {
        ...state,
        logIn: {
          ...state.logIn,
          userProfile: {
            ...state.logIn.userProfile,
            business_profile: {
              ...state.logIn.userProfile.business_profile,
              google_places: {
                ...state.logIn.userProfile.business_profile.google_places,
                ...googlePlaces
              }
            }
          }
        }
      };
    }
    case UPDATE_AUTH_STATE_WITH_CONFIG_DETAILS: {
      return {
        ...state,
        logIn: {
          ...state.logIn,
          userProfile: {
            ...state.logIn.userProfile,
            business_profile: {
              ...state.logIn.userProfile.business_profile,
              integrations: {
                ...state.logIn.userProfile.business_profile.integrations,
                ecommerce: [...ecommerceIntegrations]
              }
            }
          }
        }
      };
    }
    case LOGOUT:
      state = undefined;
      return { type: type, payload: {} };
    default:
      return state;
  }
};

export default authReducer;
