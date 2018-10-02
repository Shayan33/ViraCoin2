import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import history from '../history';
import './Home.css';

export class Home extends Component {
    displayName = Home.name;
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='PopUp'>
                <h1>Nomatch</h1>
            </div>
        );
    }
}