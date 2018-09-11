import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import './Submit.css';
export class Submit extends Component {
    displayName = Submit.name
    constructor(props) {
        super(props);
        Statics.IsLogin();
    }
    render() {
        return (
            <div>
                <h1>Submit</h1>
            </div>
        );
    }
}