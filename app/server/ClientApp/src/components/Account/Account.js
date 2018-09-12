import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import './Account.css';
export class Account extends Component {
    displayName = Account.name
    constructor(props) {
        super(props);
        Statics.IsLogin();
    }
    render() {
        return (
            <div className='PopUp'>
                <h1>Account</h1>
            </div>
        );
    }
}