import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import './Item.css';
export class Item extends Component {
    constructor(props) {
        super(props);
        Statics.IsLogin();
    }
    displayName = Item.name
    render() {
        return (
            <div className='PopUp'>
                <h1>Item</h1>
            </div>
        );
    }
}