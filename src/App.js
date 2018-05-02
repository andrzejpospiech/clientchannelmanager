import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//import i18next from 'i18next';
import { translate, Trans } from 'react-i18next';

import Routes from "./Routes";
import UserAuthenticator from "./components/UserAuthenticator";
import "./App.css";

class App extends Component {
  
  constructor(props) {
    super(props);

    UserAuthenticator.userHasAuthenticated = this.userHasAuthenticated; // Required for status updates
    
    this.state = {
      userId: "",
      userPassword: "",
      email: "",
      userAuthenticationIndicator: UserAuthenticator.isUserAuthenticated()
    };
  }
  userHasAuthenticated = (userAuthenticationIndicator) => {
    this.setState({ userAuthenticationIndicator: userAuthenticationIndicator });
  }

  handleLogout = (event) => {
    this.userHasAuthenticated(false);
    
    UserAuthenticator.logoutUser();
  }  
  
  render() {
    
    const { t, i18n } = this.props;

    const childProps = {
      userAuthenticationIndicator: this.state.userAuthenticationIndicator,      // User Authentication indicator 
      userHasAuthenticated: this.userHasAuthenticated  // Function to call to set User Authentication state = {true, false}
    };


    return (
      <React.StrictMode>
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">{t('home.nav-bar-home')}</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.userAuthenticationIndicator
                  ? <Fragment>
                      <LinkContainer to="/">
                        <NavItem onClick={this.handleLogout}>{t('home.nav-bar-logout')}</NavItem>
                      </LinkContainer>
                    </Fragment>
                  : <Fragment>
                      <LinkContainer to="/signup">
                        <NavItem>{t('home.nav-bar-signup')}</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <NavItem>{t('home.nav-bar-login')}</NavItem>
                      </LinkContainer>
                    </Fragment>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      </React.StrictMode>
    );
  }

}
export default translate(['home'])(App);