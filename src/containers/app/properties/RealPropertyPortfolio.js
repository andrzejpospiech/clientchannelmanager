import React, { Component } from "react";
import { translate } from 'react-i18next';
import { Panel, PanelGroup, Glyphicon } from "react-bootstrap";

import RealProperty from "./RealProperty";
import "./RealProperty.css";

class RealPropertyPortfolio extends Component {

	state = {
		activePanelId: "0",
	};

	realPropertyPortfolioCollection = {
		realPropertyPortfolioCollection: []
	}


	constructor(props) {
		super(props);

		this.realPropertyPortfolioCollection.realPropertyPortfolioCollection.push("Properties Portfolio 1");
		this.realPropertyPortfolioCollection.realPropertyPortfolioCollection.push("Properties Portfolio 2");
		this.realPropertyPortfolioCollection.realPropertyPortfolioCollection.push("Properties Portfolio 3");
		this.realPropertyPortfolioCollection.realPropertyPortfolioCollection.push("Properties Portfolio 4");
	}


	componentDidMount() {}


	render() {

		const { t, i18n } = this.props;

		const childProps = {
			t: t,
			i18n: i18n,
			history: this.props.history
		};

		this.index = 1;
		this.realPropertyPortfolio = this.realPropertyPortfolioCollection.realPropertyPortfolioCollection.map((realPropertyPortfolio) => {
			return (
				<Panel eventKey={this.index}>
            <Panel.Heading>
              <Panel.Title toggle>
              <Glyphicon glyph="glyphicon glyphicon-folder-open" />
              	Click for Property Portfolio {this.index}
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>Property Portfolio
							<div id="realPropertyPortfolio{this.index}" key={this.index++}>
			           <RealProperty/>
			        </div>
            </Panel.Body>
          </Panel>

			);
		});

		return (this.realPropertyPortfolio);
	}
}

export default translate('realProperty')(RealPropertyPortfolio);