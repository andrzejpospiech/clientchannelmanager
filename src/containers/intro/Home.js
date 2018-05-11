import React, { Component } from "react";
import { translate, Trans } from 'react-i18next';

import "./Home.css";

class Home extends Component {
  render() {
    
    const { t, i18n } = this.props;
    
    return (
      <div className="Home">
        <div className="lander">
          <h1>{t('home.lander-title')}</h1>
          <p>{t('home.lander-text')}</p>
        </div>
      </div>
    );
  }
}

export default translate('home')(Home);