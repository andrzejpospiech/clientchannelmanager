import React, { Component, Fragment } from "react";
//import ReactLoading from "react-loading";
import { Table, ButtonToolbar, ToggleButtonGroup, ButtonGroup, Button, ToggleButton, Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { translate } from 'react-i18next';
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar';

import * as AppPropertiesClass from "../../../AppProperties";
import "./RealProperty.css";

class RealProperty extends Component {

  state = {
    realPropertyCollection: null,
    tableRowSelectionCollection: []
  };

  constructor(props) {
    super(props);
    
    this.tokenObject = "";
    this.userAuthorizationToken = window.localStorage.getItem(AppPropertiesClass.LOCAL_STORAGE_USER_AUTHORIZATION_TOKEN);
    if (this.userAuthorizationToken !== "") {
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
        if (response.status === AppPropertiesClass.HTTP_STATUS_CODE_OK && response.data != null) {
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
    this.source.cancel();
  }


  handleTableRowSelection = (realPropertyId) => {
    let rowSelectionCollection = [];
    let found = null;

    if (this.state.tableRowSelectionCollection.length === 0) {
      rowSelectionCollection.push(realPropertyId);
    }
    else {
      for (let realPropertyCollectionId of this.state.tableRowSelectionCollection.map((realpropertyId) => realpropertyId)) {
        found = (realPropertyId === realPropertyCollectionId) ? true : false;
      }
      if (found) {
        rowSelectionCollection.push(realPropertyId);
      }
    }

    this.setState({ tableRowSelectionCollection: rowSelectionCollection });
  }
  

  render() {

    const { t } = this.props;
    const yes = t("real-property-common.yes");
    const no = t("real-property-common.no");


    if (this.state.realPropertyCollection == null) {
      loadProgressBar();
      return (null);
    }


    this.realPropertyCollection = JSON.parse(this.state.realPropertyCollection);
    
      this.realProperty = this.realPropertyCollection.data.map((realProperty) => {
        return(
          <div className="RealPropertyButtonGroup" key={realProperty.id}>
            <ButtonToolbar>
              <ButtonGroup>
                <Fragment>
                  <LinkContainer to="/dashboard/properties/newProperty">
                    <Button>{t("real-property-view.button-new")}</Button>
                  </LinkContainer>
                  <Button disabled>{t("real-property-view.button-details")}</Button>
                  <Button disabled>{t("real-property-view.button-edit")}</Button>
                  <Button disabled>{t("real-property-view.button-clone")}</Button>
                  <Button disabled>{t("real-property-view.button-delete")}</Button>
                </Fragment>
              </ButtonGroup>
            </ButtonToolbar>
            <div className="Real Property Table">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>{t("real-property-view.select")}</th>
                    <th>{t("real-property-common.id")}</th>
                    <th>{t("real-property-common.title")}</th>
                    <th>{t("real-property-common.headline")}</th>
                    <th>{t("real-property-common.description")}</th>
                    <th>{t("real-property-common.property-type")}</th>
                    <th>{t("real-property-common.currency-type")}</th>
                    <th>{t("real-property-view.status")}</th>
                    <th>{t("real-property-common.is-instant-bookable")}</th>
                    <th>{t("real-property-view.updated-at")}</th>
                    <th>{t("real-property-view.created-at")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={realProperty.id}>
                    <td>
                      <ToggleButtonGroup
                        type="checkbox"
                        value={this.state.tableRowSelection}
                        onChange={this.handleTableRowSelection}>
                          <ToggleButton value={realProperty.id}>
                            <Glyphicon glyph="glyphicon glyphicon-ok" />
                          </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td>{realProperty.id}</td>
                    <td>{realProperty.title}</td>
                    <td>{realProperty.headline}</td>
                    <td>{realProperty.description}</td>
                    <td>{realProperty.property_type}</td>
                    <td>{realProperty.currency_type}</td>
                    <td>{realProperty.status}</td>
                    <td>{realProperty.is_instant_bookable ? yes : no}</td>
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