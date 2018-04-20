import React, { Component } from "react";
import { translate, Trans } from 'react-i18next';

import "./Main.css";

class Main extends Component {
  render() {
    
    const { t, i18n } = this.props;
    
    return (
      <div className="Main">
        <div className="lander">
          <h1>{t('lander.title')}</h1>
          <p>{t('lander.text')}</p>
        </div>
      </div>
    );
  }
}

export default translate(['main', 'common'])(Main);