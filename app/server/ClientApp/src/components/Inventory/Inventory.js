import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import './Inventory.css';
export class Inventory extends Component {
    displayName = Inventory.name
    constructor(props) {
        super(props);
        Statics.IsLogin();
    }
    render() {
        return (
            <div>
                <h1>Inventory</h1>
            </div>
        );
    }
}