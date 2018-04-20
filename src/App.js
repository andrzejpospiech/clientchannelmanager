import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//import i18next from 'i18next';
import { translate, Trans } from 'react-i18next';

import Routes from "./Routes";
import "./App.css";

class App extends Component {
  

  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
  }  
  
  render() {
    
    const { t, i18n } = this.props;

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
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
                {this.state.isAuthenticated
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
//export default App;