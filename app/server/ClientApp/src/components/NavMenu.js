import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem, Form, FormControl, FormGroup, NavDropdown, MenuItem, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import history from './history'

export class NavMenu extends Component {
    displayName = NavMenu.name
    state = { inputValue: '' };
    render() {
        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'} onClick={() => history.push('/')}>
                            <text className="HeaderText">Vira Coin</text>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/'} exact onClick={() => history.push('/')}>
                            <NavItem>
                                <Glyphicon glyph='home' /> خانه
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                    <Navbar.Form pullRight>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
