import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import './Transactions.css';
export class Transactions extends Component {
    displayName = Transactions.name
    constructor(props) {
        super(props);
        Statics.IsLogin();
    }
    render() {
        return (
            <div className='PopUp'>
                <h1>Transactions</h1>
            </div>
        );
    }
}