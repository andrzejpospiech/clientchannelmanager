import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { Panel } from "react-bootstrap";
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
              <Nav>
                <Fragment>
                  <LinkContainer to="/">
                    <NavDropdown eventKey={3} title={t("home.nav-bar-rental-properties")} id="basic-nav-dropdown">
                      <MenuItem eventKey={3.1}>Subscription Options</MenuItem>
                      <MenuItem eventKey={3.2}>Integration options</MenuItem>
                      <MenuItem eventKey={3.3}>Testimonials</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey={3.4}>Examples</MenuItem>
                    </NavDropdown>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <NavDropdown eventKey={3} title={t("home.nav-bar-pricing")} id="basic-nav-dropdown">
                      <MenuItem eventKey={3.1}>Basic</MenuItem>
                      <MenuItem eventKey={3.2}>Advanced</MenuItem>
                      <MenuItem eventKey={3.3}>Delux</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey={3.4}>Examples</MenuItem>
                    </NavDropdown>
                  </LinkContainer>
                </Fragment>
              </Nav>
              <Nav pullRight>
                {this.state.userAuthenticationIndicator
                  ? <Fragment>
                      <LinkContainer to="/dashboard">
                        <NavDropdown title={t("home.nav-bar-management")} id="basic-nav-dropdown">
                          <LinkContainer to="/dashboard/properties">
                            <MenuItem >Properties</MenuItem>
                          </LinkContainer>
                          <MenuItem>Bookings</MenuItem>
                          <MenuItem>Travellers</MenuItem>
                          <MenuItem>Inquiries</MenuItem>
                          <MenuItem divider />
                          <MenuItem>Preferences</MenuItem>
                        </NavDropdown>
                      </LinkContainer>
                      <LinkContainer to="/">
                        <NavItem onClick={this.handleLogout}>{t('home.nav-bar-logout')}</NavItem>
                      </LinkContainer>
                    </Fragment>
                  : <Fragment>
                      <LinkContainer to="/login">
                        <NavItem>{t('home.nav-bar-login')}</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/signup">
                        <NavItem>{t('home.nav-bar-signup')}</NavItem>
                      </LinkContainer>
                    </Fragment>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Panel>
            <Panel.Body>Panel content</Panel.Body>
              <Routes childProps={childProps} />
            <Panel.Footer>Panel footer</Panel.Footer>
          </Panel>
        </div>
      </React.StrictMode>
    );
  }

}
export default translate(['home'])(App);