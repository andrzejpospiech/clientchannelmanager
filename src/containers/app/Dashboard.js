import React, { Component } from "react";
import { translate, Trans } from 'react-i18next';

import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    
    const { t, i18n } = this.props;
    
    return (
      <div className="Dashboard">
        <div className="dashboard">
          <h1>{t('dashboard.title')}</h1>
          <p>{t('dashboard.content')}</p>
          <p>{t('dashboard.functionality')}</p>
          <p>{t('dashboard.privilegedFunctionality')}</p>
          <p>{t('dashboard.adminFuncionality')}</p>
        </div>
      </div>
    );
  }
}

export default translate(['dashboard', 'common'])(Dashboard);