import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import history from './history'
import './NavMenu.css';
export class NavMenu extends Component {
  displayName = NavMenu.name
  constructor(props) {
    super(props);
    this.state = { Collapse: false, IsLogin: true };
  }
  IsLogin() {
    return true;
  }
  render() {
    let LoginView = this.state.IsLogin ?
      <button onClick={() => this.setState({ IsLogin: !this.state.IsLogin })} className="btn btn-success NewButtons">
        <Glyphicon glyph='user' style={{ marginRight: '5px', marginTop: '3px' }} />Sign In
      </button> :
      <button onClick={() => this.setState({ IsLogin: !this.state.IsLogin })} className="btn btn-warning NewButtons">
        <Glyphicon glyph='off' style={{ marginRight: '5px', marginTop: '3px' }} />Sign Out Hamed
      </button>
      ;
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <div className="Logo">
          <img src={require('../img/ethereum.png')} alt='logo' style={{ width: '50px', height: '45px' }} />
        </div>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav>
            <LinkContainer to={'/'} exact onClick={() => history.push('/')}>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
          </Nav>
          <div>
            {LoginView}
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
