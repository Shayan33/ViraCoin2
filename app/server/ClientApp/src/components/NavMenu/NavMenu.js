import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReactTooltip from 'react-tooltip';
import history from '../history';
import { Statics } from '../Statics';
import { Web3s } from '../Web3/Web3';
import './NavMenu.css';
export class NavMenu extends Component {
  displayName = NavMenu.name
  constructor(props) {
    super(props);
    this.state = { Collapse: false, IsLogin: Statics.NavMenueLogin() };
  }
  Login() {
    Statics.Login();
    this.setState({ IsLogin: Statics.NavMenueLogin() });
  }
  LogOut() {
    Statics.LogOut();
    this.setState({ IsLogin: Statics.NavMenueLogin() });
    history.push('/');
  }
  render() {
    let LoginView = this.state.IsLogin ?
      <div>
        <div onClick={() => this.LogOut()} className="ToolTipe">
          <Glyphicon glyph='off' style={{ marginRight: '5px', marginTop: '3px' }}
            data-tip="Sign Out"
            data-place="bottom"
            data-type="light"
          />
          <span className='ToolTipeText'>Sign Out</span>
        </div>
        <div onClick={() => history.push('/Account')} className="ToolTipe">
          <Glyphicon glyph='cog' style={{ marginRight: '5px', marginTop: '3px' }}
            data-tip="Account Settings"
            data-place="bottom"
            data-type="light"
          />
          <span className='ToolTipeText'>Account</span>
          <ReactTooltip />
        </div>
        <div onClick={() => this.setState({ IsLogin: !this.state.IsLogin })} className="ToolTipe">
          <Glyphicon glyph='bell' style={{ marginRight: '5px', marginTop: '3px' }}
            data-tip="Notifications"
            data-place="bottom"
            data-type="light"
          />
          <span className='ToolTipeText'>Notifs</span>
        </div>
      </div> :
      <button onClick={() => this.Login()} className="btn btn-success NewButtons">
        <Glyphicon glyph='user' style={{ marginRight: '5px', marginTop: '3px' }} />Register / Sign In
   </button>;
    let DashBord1 = this.state.IsLogin ?
      <LinkContainer to={'/Inventory'} exact onClick={() => history.push('/Inventory')}>
        <NavItem>
          <Glyphicon glyph='inbox' /> Inventory
        </NavItem>
      </LinkContainer> :
      <div></div>;
    let DashBord2 = this.state.IsLogin ?
      <LinkContainer to={'/Submit'} exact onClick={() => history.push('/Submit')}>
        <NavItem>
          <Glyphicon glyph='plus' /> Submit
      </NavItem>
      </LinkContainer> :
      <div></div>;
    let DashBord3 = this.state.IsLogin ?
      <LinkContainer to={'/Transactions'} exact onClick={() => history.push('/Transactions')}>
        <NavItem>
          <Glyphicon glyph='transfer' /> Transactions
    </NavItem>
      </LinkContainer> :
      <div></div>;
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <div className="Logo">
          <img src={require('../../img/ethereum.png')} alt='logo' style={{ width: '50px', height: '45px' }} />
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
            <LinkContainer to={'/Search'} exact onClick={() => history.push('/Search')}>
              <NavItem>
                <Glyphicon glyph='search' /> Search
              </NavItem>
            </LinkContainer>
            {DashBord1}
            {DashBord2}
            {DashBord3}
          </Nav>
          <hr className='ThatHr' />
          <div>
            {LoginView}
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
