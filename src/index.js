import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import registerServiceWorker from "./registerServiceWorker";

import i18n from './i18n'; // initialized i18next instance using reactI18nextModule
import App from "./App";
import "./index.css";

//alert(window.navigator.language);

ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Router>
      <App />
    </Router>
    </I18nextProvider>,
  document.getElementById("root")
);

registerServiceWorker();