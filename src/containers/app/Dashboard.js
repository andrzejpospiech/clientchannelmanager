import React, { Component } from "react";
import { translate } from 'react-i18next';

import "./Dashboard.css";

class Dashboard extends Component {
  
  constructor(props) {
    super(props);

  //   this.state = {
  //     email: "",
  //     password: "",
  //     loginFormSubmitted: false
  //   };
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