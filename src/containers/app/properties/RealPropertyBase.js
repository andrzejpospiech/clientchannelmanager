import React, { Component, Fragment } from "react";
import { translate } from 'react-i18next';
import { PanelGroup } from "react-bootstrap";
import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import RealPropertyPortfolio from "./RealPropertyPortfolio";
import "./RealProperty.css";

class RealPropertyBase extends Component {

  state = {
    activePanelId: "0"
  };


  constructor(props) {
    super(props);

    this.handlePanelSelect = this.handlePanelSelect.bind(this);
   }


  handlePanelSelect(activePanelId) {
    this.setState({ activePanelId });
  }
  
  
  render() {
    
    const { t, i18n } = this.props;
    
    const childProps = {
      t: t,
      i18n: i18n,
      history: this.props.history
    };
    
    return (
      <div className="RealPropertyPortfolioCollection">
        <ButtonToolbar>
          <ButtonGroup>
            <Fragment>
              <LinkContainer to="/dashboard/properties/newPortfolio">
                <Button>{t("real-property-view.button-new")}</Button>
              </LinkContainer>
              <Button disabled>{t("real-property-view.button-edit")}</Button>
              <Button disabled>{t("real-property-view.button-clone")}</Button>
              <Button disabled>{t("real-property-view.button-delete")}</Button>
            </Fragment>
          </ButtonGroup>
        </ButtonToolbar>
        <PanelGroup
          accordion
          id="accordion-controlled-example"
          activeKey={this.state.activePanelId}
          onSelect={this.handlePanelSelect}
        >
					<RealPropertyPortfolio/>
        </PanelGroup>
      </div>
    );
  }
}

export default translate('realProperty')(RealPropertyBase);