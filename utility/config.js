export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.thetrustsearch.com"
    : "https://search-api-dev.cryptopolice.com";
export const screenshotURL = "http://api.screenshotlayer.com/api/capture";
export const faviconURL = "http://www.google.com/s2/favicons";
export const flagsURL = "https://www.countryflags.io";
export const shareURL =
  "https://chrome.google.com/webstore/detail/watchdog2-beta/nolhjjgkcpolemkdekaneneefghjahfp";
export const googleClientId =
  "98966487885-jfc24f86o9ht4cmk38gl3g91q2vtgmd0.apps.googleusercontent.com";
// for theTrustSearch = 757926713122-b99qpe0npfm18ko5vek0ch1tgtruei87.apps.googleusercontent.com;
export const facebookAppId = "389995578342806";
export const facebookAppSecret = "f21720e26f3357e4ecbf1c5aa4897587"

//Api

export const registerApi = "/api/register";
export const registerApiOAuth = "/api/register/oauth";
export const loginApi = "/api/login";
export const loginApiOAuth = "/api/login/oauth";
export const forgotPasswordApi = "/api/forgot-password";
export const resetPasswordApi = "/api/reset-password";
export const activateUserApi = "/register/activate";
