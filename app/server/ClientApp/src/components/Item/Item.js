import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import './Item.css'
export class Item extends Component {
    displayName = Item.name
    render() {
        return (
            <div>
                <h1>Item</h1>
            </div>
        );
    }
}