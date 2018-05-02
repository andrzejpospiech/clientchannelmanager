import React,{ Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import * as AppPropertiesClass from "../AppProperties";


class UserAuthenticator extends Component {

  static tokenTimerExpiryId = 0;
  static userHasAuthenticated;
  static history;
  
  constructor(props) {
    super(props);
    
    this.state = {
      loginProgressIndicator: "waiting for login to start"
    };

    // Initialize UserAuthorizationToken to empty string if it does not exist
    if (window.localStorage.getItem("UserAuthorizationToken") == null) {
      window.localStorage.setItem("UserAuthorizationToken", "");
    }
    
    axios.defaults.baseURL = AppPropertiesClass.URL_HOST_BASE_URL;
  }

/*
  loginProgress = (loginProgressStatus) => {
    this.setState({ loginProgressIndicator: loginProgressStatus });
  }
*/

  static tokenExpirationNotification = () => {

    console.log("Token expired");
    
    clearInterval(UserAuthenticator.tokenTimerExpiryId);
    
    var tokenRefreshRetryCount = window.localStorage.getItem("tokenRefreshRetryCount");
    
    if (tokenRefreshRetryCount == null) {
      window.localStorage.setItem("tokenRefreshRetryCount", AppPropertiesClass.TOKEN_REFRESH_RETRY_COUNT);
    } else {
      if ((tokenRefreshRetryCount != null) && (tokenRefreshRetryCount > 0)) {
        window.localStorage.setItem("tokenRefreshRetryCount", --tokenRefreshRetryCount);
      }
    }

    axios({
        method: "post",
        url: AppPropertiesClass.URL_HOST_TOKEN_REFRESH,
        data: {
          email: AppPropertiesClass.EMAIL_LOGIN,
          password: AppPropertiesClass.PASSWORD_LOGIN
        }
      })
      .then(function(response) {

        // Store the Authorization token
        if (response.status == AppPropertiesClass.HTTP_STATUS_CODE_OK && response.data != null) {
          window.localStorage.setItem("UserAuthorizationToken", JSON.stringify(response.data));
          if (UserAuthenticator.isUserAuthenticated()) {

            // Set timer to expire before the token expires in order to send token refresh request
            var tokenTimeout = response.data.expires_in - AppPropertiesClass.TOKEN_EXPIRATION_NOTIFICATION_TIMEOUT;
            UserAuthenticator.tokenTimerExpiryId = setInterval(UserAuthenticator.tokenExpirationNotification, tokenTimeout * 1000); // convert timeout to msecs
            //UserAuthenticator.tokenTimerExpiryId = setInterval(UserAuthenticator.tokenExpirationNotification, 15 * 1000); // test timeout in 15 sec

            if (window.localStorage.getItem("tokenRefreshRetryCount") != null) {
              window.localStorage.removeItem("tokenRefreshRetryCount"); // Success, no need for Refresh Token retries
            }
            
            axios.defaults.headers.common['Authorization'] = response.data.access_token;

            window.alert("Login successfull\nToken expiry (sec)\n" + response.data.expires_in + "\n\n\nAccess Token\n" + response.data.access_token);
          }
          else {
            
            window.alert("Login unsuccessfull");
            var tokenRefreshRetryCount = window.localStorage.getItem("tokenRefreshRetryCount");
            
            if (tokenRefreshRetryCount == null) {
              window.localStorage.setItem("tokenRefreshRetryCount", AppPropertiesClass.TOKEN_REFRESH_RETRY_COUNT);
              UserAuthenticator.tokenTimerExpiryId = setInterval(UserAuthenticator.tokenExpirationNotification, AppPropertiesClass.TOKEN_REFRESH_RETRY_WAIT_INTERVAL); // Wait before sending Token refresh
            } else {
              if (tokenRefreshRetryCount > 0) {
                window.localStorage.setItem("tokenRefreshRetryCount", --tokenRefreshRetryCount);
                UserAuthenticator.tokenTimerExpiryId = setInterval(UserAuthenticator.tokenExpirationNotification, AppPropertiesClass.TOKEN_REFRESH_RETRY_WAIT_INTERVAL); // Wait before sending Token refresh
              } else {
                if (tokenRefreshRetryCount == 0) {
                  window.localStorage.removeItem("tokenRefreshRetryCount"); // Give up obtaining Refresh Token
                }
              }
            }
           }
        }
      })
      .catch(function(error) {
        
        window.alert("Token Refresh failed");
        console.log(error);
        
        var tokenRefreshRetryCount = window.localStorage.getItem("tokenRefreshRetryCount");
        
        if (tokenRefreshRetryCount == null) {
          window.localStorage.setItem("tokenRefreshRetryCount", AppPropertiesClass.TOKEN_REFRESH_RETRY_COUNT);
          UserAuthenticator.tokenTimerExpiryId = setInterval(UserAuthenticator.tokenExpirationNotification, AppPropertiesClass.TOKEN_REFRESH_RETRY_WAIT_INTERVAL); // Wait before sending Token refresh
        } else {
          if (tokenRefreshRetryCount > 0) {
            window.localStorage.setItem("tokenRefreshRetryCount", --tokenRefreshRetryCount);
            UserAuthenticator.tokenTimerExpiryId = setInterval(UserAuthenticator.tokenExpirationNotification, AppPropertiesClass.TOKEN_REFRESH_RETRY_WAIT_INTERVAL); // Wait before sending Token refresh
          } else {
            if (tokenRefreshRetryCount == 0) {
              window.localStorage.removeItem("tokenRefreshRetryCount"); // Give up obtaining Refresh Token
            }
          }
        }
      });
  }


  // Determines if the user is logged in
  static isUserAuthenticated() {
    
    var UserAuthorizationToken = window.localStorage.getItem("UserAuthorizationToken");

    if (UserAuthorizationToken != "") {
      var tokenObject = JSON.parse(UserAuthorizationToken);
      //window.alert(this.tokenObject.expires_in);
      // User is Authorized
      return true;
    } else {
      return false;
    }
  }


  /*  Authorization Token properties
      access_token,
      refresh_token,
      expires_in
  */

  static loginUser(history) {

    UserAuthenticator.history = history;
    
    axios({
        method: "post",
        url: AppPropertiesClass.URL_HOST_LOGIN,
        data: {
          email: AppPropertiesClass.EMAIL_LOGIN,
          password: AppPropertiesClass.PASSWORD_LOGIN
        }
      })
      .then(function(response) {

        // Store the Authorization token
        if (response.status == AppPropertiesClass.HTTP_STATUS_CODE_OK && response.data != null) {
          window.localStorage.setItem("UserAuthorizationToken", JSON.stringify(response.data));
          
          if (UserAuthenticator.isUserAuthenticated()) {
            
            UserAuthenticator.userHasAuthenticated(true);

            // Redirect to App landing page
            UserAuthenticator.history.push("/main");

            // Set timer to expire before the token expires in order to send token refresh request
            var tokenTimeout = response.data.expires_in - AppPropertiesClass.TOKEN_EXPIRATION_NOTIFICATION_TIMEOUT;
            UserAuthenticator.tokenTimerExpiryId = setInterval(UserAuthenticator.tokenExpirationNotification, tokenTimeout * 1000); // convert timeout to msecs
            //UserAuthenticator.tokenTimerExpiryId = setInterval(UserAuthenticator.tokenExpirationNotification, 15 * 1000); // test timeout in 15 sec

            axios.defaults.headers.common['Authorization'] = response.data.access_token;


            window.alert("Login successfull\nToken expiry (sec)\n" + response.data.expires_in + "\n\n\nAccess Token\n" + response.data.access_token);
          }
          else {
            UserAuthenticator.userHasAuthenticated(false);
            window.alert("Login unsuccessfull");
          }
        }
      })
      .catch(function(error) {
        window.alert("Login failed - server unavailable. Retry in few minutes.");
        console.log(error);
      });
  }
  
  
  componentDidMount() {
    UserAuthenticator.loginUser(this.props.props.history);
  }


  static logoutUser() {
    clearInterval(UserAuthenticator.tokenTimerExpiryId);
    window.localStorage.setItem("UserAuthorizationToken", "");
  }
  

  render() {
    return (null
/*      <div className="Login Progress Indicator">
      <h3>Login status = {this.state.loginProgressIndicator}</h3>
      </div>
*/    );

  }
}

export default UserAuthenticator;