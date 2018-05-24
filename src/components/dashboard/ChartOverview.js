import React, { Component } from "react";
import { translate } from 'react-i18next';
import { Doughnut } from 'react-chartjs-2';

import "../../containers/app/Dashboard.css";


class ChartOverview extends Component {

	state = {
		chartDataChanged: 0
	};


	chartProps = {
		portfolio: [{
			labels: [
				'Available',
				'Bookings',
				'Rented'
			],
			datasets: [{
				data: [this.getRandomInt(50, 200), this.getRandomInt(100, 150), this.getRandomInt(150, 250)],
				backgroundColor: [
					'#CCC',
					'#36A2EB',
					'#FFCE56'
				],
				hoverBackgroundColor: [
					'#FF6384',
					'#1DE9B6',
					'#4A148C'
				],
		    options: {
	        layout: {
            padding: {
                left: 50,
                right: 0,
                top: 0,
                bottom: 0
            }
	        }
		    }
			}]
		}]
	}


	constructor(props) {
		super(props);

	}


	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	chartDataUpdate() {
		const getState = () => ({
			datasets: [{
				data: [this.getRandomInt(50, 200), this.getRandomInt(100, 150), this.getRandomInt(150, 250)],
			}],
		});
		return (getState());
	}


	componentDidMount() {
		this.chartProps.portfolio.push(this.chartProps.portfolio[0]);
		this.chartProps.portfolio.push(this.chartProps.portfolio[0]);
		this.chartProps.portfolio.push(this.chartProps.portfolio[0]);

		this.timerExpiryId = setInterval(
			() => {
				this.chartProps.portfolio[0] = this.chartDataUpdate();
				this.chartProps.portfolio[1] = this.chartDataUpdate();
				this.chartProps.portfolio[2] = this.chartDataUpdate();
				this.chartProps.portfolio[3] = this.chartDataUpdate();
				this.setState({ chartDataChanged: this.state.chartDataChanged++ });
			},
			5 * 1000);
	}


	componentWillUnmount() {
		clearInterval(this.timerExpiryId);
	}


	render() {
		this.index = 0;
		this.chartPortfolioElement = this.chartProps.portfolio.map((chartPortfolioElement) => {
			return (
				<div key={this.index++}>
				<div>
        <h2>Dynamicaly refreshed Portfolio {this.index} Overview</h2>
        <div class="shadowbox" id="myChart{this.index}">
        	<Doughnut data={chartPortfolioElement} />
        </div>
        </div>
      </div>
			);
		});
		
		return (this.chartPortfolioElement);
	}
}

export default translate('dashboard')(ChartOverview);