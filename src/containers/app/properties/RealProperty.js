import React, { Component } from "react";
//import ReactLoading from "react-loading";
import { Table, Label } from "react-bootstrap";
import { translate, Trans } from 'react-i18next';
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar';

import * as AppPropertiesClass from "../../../AppProperties";
import "./RealProperty.css";
//import RealPropertyService from "../../../components/properties/RealPropertyService"
//          <RealPropertyService props={this.props}/>

class RealProperty extends Component {

  state = {
    realPropertyCollection: null,
  };

  constructor(props) {
    super(props);
    
    axios.defaults.baseURL = AppPropertiesClass.URL_HOST_BASE_URL;
    
    this.tokenObject = "";
    this.userAuthorizationToken = window.localStorage.getItem(AppPropertiesClass.LOCAL_STORAGE_USER_AUTHORIZATION_TOKEN);
    if (this.userAuthorizationToken != "") {
      this.tokenObject = JSON.parse(this.userAuthorizationToken);
    }

    axios.defaults.headers.common['Authorization'] = "Bearer " + this.tokenObject.access_token;
  }

  getRealProperties() {

    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();
    
    axios({
        method: "get",
        cancelToken: this.source.token,
        url: AppPropertiesClass.URL_HOST_REAL_PROPERTY_COLLECTION
      })
      .then(response => {
        // Get Real Properties Collection
        if (response.status == AppPropertiesClass.HTTP_STATUS_CODE_OK && response.data != null) {
//          window.localStorage.setItem(AppPropertiesClass.LOCAL_STORAGE_REAL_PROPERTY_COLLECTION, JSON.stringify(response.data));
          this.setState({realPropertyCollection : JSON.stringify(response.data)});
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          window.alert("Real Property Collection request failed - server unavailable. Retry in few minutes.");
          console.log(error);
        }
      });
  }

  componentDidMount() {
    this.getRealProperties();
  }


  componentWillUnmount() {
    this.source.cancel;
  }



  render() {

    const { t, i18n } = this.props;


    if (this.state.realPropertyCollection == null) {
      loadProgressBar();
      return (null);
    }


    this.realPropertyCollection = JSON.parse(this.state.realPropertyCollection);
    
      this.realProperty = this.realPropertyCollection.data.map((realProperty) => {
        return(
          <div className="RealProperty">
            <div className="lander">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>headline</th>
                    <th>description</th>
                    <th>property_type</th>
                    <th>currency_type</th>
                    <th>status</th>
                    <th>is_instant_bookable</th>
                    <th>updated_at</th>
                    <th>created_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{realProperty.id}</td>
                    <td>{realProperty.title}</td>
                    <td>{realProperty.headline}</td>
                    <td>{realProperty.description}</td>
                    <td>{realProperty.property_type}</td>
                    <td>{realProperty.currency_type}</td>
                    <td>{realProperty.status}</td>
                    <td>{realProperty.is_instant_bookable ? "yes" : "no"}</td>
                    <td>{realProperty.updated_at}</td>
                    <td>{realProperty.created_at}</td>
                  </tr>
                </tbody>
              </Table>
        </div>
      </div>
      );
  });
      return(this.realProperty);
  }
}
  
export default translate('realProperty')(RealProperty);