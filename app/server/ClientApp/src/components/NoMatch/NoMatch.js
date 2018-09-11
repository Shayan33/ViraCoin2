import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import history from '../history';
import './NoMatch.css';
export class NoMatch extends Component {
    displayName = NoMatch.name
    constructor(props) {
        super(props);
        setTimeout(
            function () {
                history.push('/');
            }
                .bind(this),
            3000
        );
    }
    render() {
        return (
            <div>
                <h1>Nomatch</h1>
            </div>
        );
    }
}