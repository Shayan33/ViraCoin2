import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import './Header.css';
export class Header extends Component {
    displayName = Header.name
    render() {
        return (
            <div>
                <header>
                    <h1>Header</h1>
                </header>
            </div>
        );
    }
}