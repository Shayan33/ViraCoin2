import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import './Account.css'
export class Account extends Component {
    displayName = Account.name
    render() {
        return (
            <div>
                <h1>Account</h1>
            </div>
        );
    }
}