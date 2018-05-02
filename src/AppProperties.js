// This file contains constant definitions.


// Server interaction
export const URL_HOST_BASE_URL = "https://8b5eb822.ngrok.io/api/v1";
export const URL_HOST_LOGIN = "login";
export const URL_HOST_TOKEN_REFRESH = "login/refresh";
export const EMAIL_LOGIN = "admin@syncmate.ca";
export const PASSWORD_LOGIN = "secret";
export const COOKIE_TOKEN_REFRESH = "refresh_token";
export const TOKEN_EXPIRATION_NOTIFICATION_TIMEOUT = 60 * 5;    // Notification timeout before the Token expires (sec)
export const TOKEN_REFRESH_RETRY_COUNT = 5;                     // Retries attempts to refresh Token
export const TOKEN_REFRESH_RETRY_WAIT_INTERVAL = 60 * 5;        // Interval to wait before attempting to refresh Token

export const HTTP_STATUS_CODE_OK = "200";
export const HTTP_STATUS_CODE_ERROR_SERVER_DOWN = "404";
