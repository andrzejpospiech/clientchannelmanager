import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { translate, Trans } from 'react-i18next';

import UserAuthenticator from "../../components/UserAuthenticator";
import "./Login.css";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginFormSubmitted: false
    };
  }

  validateForm() {
    return ((this.state.email.length > 0) && (this.state.password.length > 0));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    
    this.setState({
      loginFormSubmitted: true
    });
    
    this.props.history.push("/login");
  }


  render() {

    const { t, i18n } = this.props;

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>{t('home.email')}</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>{t('home.password')}</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            {t('home.submit-login')}
          </Button>
        </form>
          {this.state.loginFormSubmitted
            ? <UserAuthenticator props={this.props}/>
            : null
          }
      </div>
    );
      }
}
    
export default translate(['home'])(Login);