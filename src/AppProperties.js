// This file contains constant definitions.


// ***** LOGIN and AUTHENTICATION
export const URL_HOST_BASE_URL = "https://46ec78f0.ngrok.io/api/v1";
export const URL_HOST_LOGIN = "login";
export const URL_HOST_TOKEN_REFRESH = "login/refresh";
export const LOCAL_STORAGE_USER_AUTHORIZATION_TOKEN = "UserAuthorizationToken";
export const EMAIL_LOGIN = "admin@syncmate.ca";
export const PASSWORD_LOGIN = "secret";
export const COOKIE_TOKEN_REFRESH = "refresh_token";
export const TOKEN_EXPIRATION_NOTIFICATION_TIMEOUT = 60 * 5;    // Notification timeout before the Token expires (sec)
export const TOKEN_REFRESH_RETRY_COUNT = 5;                     // Retries attempts to refresh Token
export const TOKEN_REFRESH_RETRY_WAIT_INTERVAL = 60 * 5;        // Interval to wait before attempting to refresh Token

export const HTTP_STATUS_CODE_OK = 200;
export const HTTP_STATUS_CODE_ERROR_SERVER_DOWN = 404;

// ***** USERS
export const URL_HOST_USER_COLLECTION = "users";

// Subscriptions
export const URL_HOST_USER_SUBSCRIPTION_COLLECTION = "user/(id)/subscriptions";


// ***** RENTALS
export const URL_HOST_REAL_PROPERTY_COLLECTION = "rentals";        // {Get (index), Post (create)}
export const URL_HOST_REAL_PROPERTY_COLLECTION_ID = "rentals/id";  // {Get(id), Put (update), Delete (delete)}
export const LOCAL_STORAGE_REAL_PROPERTY_COLLECTION = "RealPropertyCollection"; // Collection of Real Properities

//  /register and /subscriptions
