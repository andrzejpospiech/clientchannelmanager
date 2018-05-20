import React, { Component } from "react";
//import ReactLoading from "react-loading";
import { FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import { Button, HelpBlock, } from "react-bootstrap";
import { translate } from 'react-i18next';
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar';

import * as AppPropertiesClass from "../../../AppProperties";
import { getTitleValidationState, getHeadlineValidationState }  from "../../../components/properties/RealPropertyValidator";
import "./RealPropertyNew.css";

class RealPropertyNew extends Component {

  state = {
    title: "",
    headline: "",
    description: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Canada",
    latitude: 0,
    longitude: 0,
    propertyType: "HOUSE",
    currencyType: "CAD",
    isInstantBookable: false,
    realPropertyNewFormSubmitted: false,
    realPropertyNewFormSubmitError: false
  };

  realPropertyNewData = {
    data: [{
      title: "New Title",
      headline: "New Headline",
      description: "New Description",
      address: "129 Main",
      city: "Ottawa",
      province: "On",
      postal_code: "K1L 3O2",
      country: "Canada",
      latitude: 0,
      longitude: 0,
      property_type: "HOUSE",
      currency_type: "CAD",
      is_instant_bookable: false
    }]
  };


  constructor(props) {
    super(props);

    this.tokenObject = "";
    this.userAuthorizationToken = window.localStorage.getItem(AppPropertiesClass.LOCAL_STORAGE_USER_AUTHORIZATION_TOKEN);
    if (this.userAuthorizationToken !== "") {
      this.tokenObject = JSON.parse(this.userAuthorizationToken);
    }

    axios.defaults.headers.common['Authorization'] = "Bearer " + this.tokenObject.access_token;
    
    this.formSubmitErrorNotification = this.formSubmitErrorNotification.bind(this);
    this.handleRemainOnRealPropertyNew = this.handleRemainOnRealPropertyNew.bind(this);
    this.handleReturnToRealProperties = this.handleReturnToRealProperties.bind(this);
  }


  formSubmitErrorNotification = (errorIndicator) => {
    this.setState({ realPropertyNewFormSubmitError: errorIndicator });
  }


  postRealProperty() {

    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();

    axios({
        method: "post",
        cancelToken: this.source.token,
        url: AppPropertiesClass.URL_HOST_REAL_PROPERTY_COLLECTION,
        data: JSON.stringify(this.realPropertyNewData)
      })
      .then(response => {
        // Get Real Properties Collection
        if (response.status !== AppPropertiesClass.HTTP_STATUS_CODE_OK) {
          console.log('Failure: Real Property New Rewquest failed', response);
        } 
      })
      .catch(error => {
        this.formSubmitErrorNotification(true);

        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        }
        else {
          console.log(error);
        }
      });
      
  }


  componentDidMount() {
    //this.postRealProperty();
  }


  componentWillUnmount() {
    this.source.cancel();
  }


  validateForm() {
    return (
      (this.state.title.length > 0)
      && (this.state.headline.length > 0)
      && (this.state.description.length > 0)
      && (this.state.address.length > 0)
      && (this.state.city.length > 0)
      && (this.state.province.length > 0)
      && (this.state.postalCode.length > 0)
      );
  }


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


setRealPropertyNewData() {
  this.realPropertyNewData = {
    data: [{
      title: this.state.title,
      headline: this.state.headline,
      description: this.state.description,
      address: this.state.address,
      city: this.state.city,
      province: this.state.province,
      postal_code: this.state.postalCode,
      country: this.state.country,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      property_type: this.state.propertyType,
      currency_type: this.state.currencyType,
      is_instant_bookable: this.state.isInstantBookable
    }]
  };
}

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      realPropertyNewFormSubmitted: true
    });

    this.setRealPropertyNewData();
    
    this.postRealProperty();
    
  }


  handleRemainOnRealPropertyNew() {
    this.formSubmitErrorNotification(false);
  }


  handleReturnToRealProperties() {
    this.props.history.goBack();
    this.formSubmitErrorNotification(false);
  }


  render() {

    const {t} = this.props;

    if (this.state.realPropertyNewFormSubmitError) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleReturnToRealProperties}>
          <h4>You experienced a Server error!</h4>
          <p>
            Error occurred on submitting New Rental Request,
            due to Channel Manager server being unavailable.
            Please, attempt to return to
            New Rental form again at a later time.
          </p>
          <p>
            <Button onClick={this.handleReturnToRealProperties} bsStyle="success">Return to Properties View</Button>
            <span> or </span>
            <Button onClick={this.handleRemainOnRealPropertyNew} bsStyle="danger">Retry Form Submit</Button>
          </p>
        </Alert>
      );
    }

    
    return (
      <div className="RealPropertyNew">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title" bsSize="small" validationState={getTitleValidationState(this.state.title)}>
            <ControlLabel>{t("real-property-common.title")}</ControlLabel>
            <FormControl
              autoFocus
              autoComplete="on"
              type="text"
              placeholder={t("real-property-common.title-placeholder")}
              value={this.state.title}
              onChange={this.handleChange}
            />
          <FormControl.Feedback />
          <HelpBlock>{t("real-property-common.title-help")}</HelpBlock>            
          </FormGroup>
          <FormGroup controlId="headline" bsSize="small" validationState={getHeadlineValidationState(this.state.headline)}>
            <ControlLabel>{t("real-property-common.headline")}</ControlLabel>
            <FormControl
              autoComplete="on"
              type="text"
              placeholder={t("real-property-common.headline-placeholder")}
              value={this.state.headline}
              onChange={this.handleChange}
            />
          <FormControl.Feedback />
          <HelpBlock>{t("real-property-common.headline-help")}</HelpBlock>            
          </FormGroup>
          <FormGroup controlId="description" bsSize="small">
            <ControlLabel>{t("real-property-common.description")}</ControlLabel>
            <FormControl
              autoComplete="on"
              componentClass="textarea"
              placeholder={t("real-property-common.description-placeholder")}
              value={this.state.description}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="address" bsSize="small">
            <ControlLabel>{t("real-property-new.address")}</ControlLabel>
            <FormControl
              autoComplete="street-address"
              type="text"
              placeholder={t("real-property-new.address-placeholder")}
              value={this.state.address}
              onChange={this.handleChange}
            />
          </FormGroup>
         <FormGroup controlId="city" bsSize="small">
            <ControlLabel>{t("real-property-new.city")}</ControlLabel>
            <FormControl
              autoComplete="on"
              type="text"
              placeholder={t("real-property-new.city-placeholder")}
              value={this.state.city}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="province" bsSize="small">
            <ControlLabel>{t("real-property-new.province")}</ControlLabel>
            <FormControl
              autoComplete="on"
              type="text"
              placeholder={t("real-property-new.province-placeholder")}
              value={this.state.province}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="postalCode" bsSize="small">
            <ControlLabel>{t("real-property-new.postal-code")}</ControlLabel>
            <FormControl
              autoComplete="postal-code"
              type="text"
              placeholder={t("real-property-new.postal-code-placeholder")}
              value={this.state.postalCode}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="country" bsSize="small">
            <ControlLabel>{t("real-property-new.country")}</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.state.country}
              onChange={this.handleChange}
            >
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
          </FormControl>
          </FormGroup>
          <FormGroup controlId="latitude" bsSize="small">
            <ControlLabel>{t("real-property-new.latitude")}</ControlLabel>
            <FormControl
              type="text"
              placeholder={t("real-property-new.latitude-placeholder")}
              value={this.state.latitude}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="longitude" bsSize="small">
            <ControlLabel>{t("real-property-new.longitude")}</ControlLabel>
            <FormControl
              type="text"
              placeholder={t("real-property-new.longitude-placeholder")}
              value={this.state.longitude}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="propertyType" bsSize="small">
            <ControlLabel>{t("real-property-common.property-type")}</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.state.propertyType}
              onChange={this.handleChange}
            >
            <option value="HOUSE">House</option>
            <option value="CONDO">Condo</option>
          </FormControl>
          </FormGroup>
          <FormGroup controlId="currencyType" bsSize="small">
            <ControlLabel>{t("real-property-common.currency-type")}</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.state.currencyType}
              onChange={this.handleChange}
            >
            <option value="CAD">CAD</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </FormControl>
          </FormGroup>
          <FormGroup controlId="isInstantBookable" bsSize="small">
            <ControlLabel>{t("real-property-common.is-instant-bookable")}</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.state.isInstantBookable}
              onChange={this.handleChange}
            >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </FormControl>
          </FormGroup>
          <Button
            block
            bsSize="small"
            className="RealPropertyNew"
            disabled={!this.validateForm()}
            type="submit"
          >
            {t("real-property-new.button-submit")}
          </Button>
        </form>
        {this.state.loginFormSubmitted
          ? null
          : null
        }
      </div>
    );
  }
}

export default translate('realProperty')(RealPropertyNew);