import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import { Web3s } from '../Web3/Web3';
import './Inventory.css';
export class Inventory extends Component {
    displayName = Inventory.name
    constructor(props) {
        super(props);
        Statics.IsLogin();
    }
    render() {
        return (
            <div className='PopUp'>
                <h1>Inventory</h1>
            </div>
        );
    }
}