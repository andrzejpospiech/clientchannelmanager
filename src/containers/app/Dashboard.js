import React, { Component } from "react";
import { translate } from 'react-i18next';
import { Panel, PanelGroup, Glyphicon } from "react-bootstrap";

import ChartOverview from "../../components/dashboard/ChartOverview";
import "./Dashboard.css";

class Dashboard extends Component {

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
      <div className="Dashboard">
        <PanelGroup
          accordion
          id="accordion-controlled-example"
          activeKey={this.state.activePanelId}
          onSelect={this.handlePanelSelect}
        >
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>
              <Glyphicon glyph="glyphicon glyphicon-blackboard" />
              Click for Portfolio indicators
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
            <p>The following Charts illustrate your Property Portfolio performance. </p>
            { this.state.activePanelId == "1"
              ? <ChartOverview/>
              : null
            }
            </Panel.Body>
          </Panel>
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>
              <Glyphicon glyph="glyphicon glyphicon-home" />
              Click for Rental indicators
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>Rental Indicators
            </Panel.Body>
          </Panel>
          <Panel eventKey="3">
            <Panel.Heading>
              <Panel.Title toggle>
              <Glyphicon glyph="glyphicon glyphicon-piggy-bank" />
              Click for Booking indicators</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
            Booking Indicators
            </Panel.Body>
          </Panel>
        </PanelGroup>
        <h1>{t('dashboard.title')}</h1>
        <p>{t('dashboard.content')}</p>
        <p>{t('dashboard.functionality')}</p>
        <p>{t('dashboard.privilegedFunctionality')}</p>
        <p>{t('dashboard.adminFuncionality')}</p>
      </div>
    );
  }
}

export default translate('dashboard')(Dashboard);