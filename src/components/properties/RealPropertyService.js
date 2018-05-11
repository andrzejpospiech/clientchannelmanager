import React,{ Component } from "react";
import axios from "axios";

import * as AppPropertiesClass from "../../AppProperties";


class RealPropertyService extends Component {

  constructor(props) {
    super(props);
    
    axios.defaults.baseURL = AppPropertiesClass.URL_HOST_BASE_URL;
    
    var tokenObject = "";
    var userAuthorizationToken = window.localStorage.getItem(AppPropertiesClass.LOCAL_STORAGE_USER_AUTHORIZATION_TOKEN);
    if (userAuthorizationToken != "") {
      tokenObject = JSON.parse(userAuthorizationToken);
    }

    axios.defaults.headers.common['Authorization'] = "Bearer " + tokenObject.access_token;
  }


  static getRealProperties() {

    axios({
        method: "get",
        url: AppPropertiesClass.URL_HOST_REAL_PROPERTY_COLLECTION
      })
      .then(function(response) {

        // Store the Authorization token
        if (response.status == AppPropertiesClass.HTTP_STATUS_CODE_OK && response.data != null) {
          window.localStorage.setItem(AppPropertiesClass.LOCAL_STORAGE_REAL_PROPERTY_COLLECTION, JSON.stringify(response.data));
          
        }
      })
      .catch(function(error) {
        window.alert("Real Property Collection request failed - server unavailable. Retry in few minutes.");
        console.log(error);
      });
  }
  
  
  componentDidMount() {
    RealPropertyService.getRealProperties();
  }


  render() {
    return (null
/*      <div className="Login Progress Indicator">
      <h3>Login status = {this.state.loginProgressIndicator}</h3>
      </div>
*/    );

  }
}

export default RealPropertyService;