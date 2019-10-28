export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.thetrustsearch.com"
    : "https://search-api-dev.cryptopolice.com";
export const screenshotURL = "http://api.screenshotlayer.com/api/capture";
export const faviconURL = "http://www.google.com/s2/favicons";
export const flagsURL = "https://www.countryflags.io";
export const shareURL =
  "https://chrome.google.com/webstore/detail/watchdog2-beta/nolhjjgkcpolemkdekaneneefghjahfp";

export const googleMapsURL = "https://google.com/maps/search";

export const googleClientId =
  process.env.NODE_ENV === "production"
    ? "757926713122-kfb1hf0ltkpm2ldvitfce2bcsumdue9v.apps.googleusercontent.com"
    : "757926713122-ud5rp4ncj9qnhnsurpclti2j91dphi2a.apps.googleusercontent.com";
export const googleAppSecret =
  process.env.NODE_ENV === "production"
    ? "7u1YFI3vsIiF0mFXsMzOBXUe"
    : "0SJLIjC1HPyygOrPSACsl7Wa";

export const facebookAppId =
  process.env.NODE_ENV === "production" ? "389995578342806" : "547546105995376";
export const facebookAppSecret =
  process.env.NODE_ENV === "production"
    ? "46a81ff982daebb3027d4c9e419af7ef"
    : "a55d321330767af27c4211bd94749809";

//Api

export const registerApi = "/api/register";
export const registerApiOAuth = "/api/register/oauth";
export const loginApi = "/api/login";
export const loginApiOAuth = "/api/login/oauth";
export const forgotPasswordApi = "/api/forgot-password";
export const resetPasswordApi = "/api/reset-password";
export const activateUserApi = "/register/activate";
export const businessRegisterApi = "/api/register-business";
export const locatePlaceApi = "/api/my-business/profile/google-place";
export const resendActivationLinkApi = "/api/me/resend-activation";
export const upgradePremiumApi = "/api/leads";
export const transactionHistoryApi =
  "/api/my-business/invitations/history?perPage=10&page=1";
export const createCampaignApi = "/api/my-business/invitations/invite-manual";
export const fetchCampaignLanguageApi = "/api/my-business/locales";
export const fetchEmailTemplateApi = "/api/my-business/invitation-template";

//How to create review short link
export const getStartedVideoUrl =
  "https://www.loom.com/share/ef51f581d64842a6bcdcd000d2645708";
