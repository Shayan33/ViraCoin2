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
            <div className='container'>
                <div className="eth">
                    <div className="bottom">
                        <div className="left"></div>
                        <div className="right"></div>
                        <div className="up"></div>
                        <div className="down"></div>
                    </div>
                    <div className="top">
                        <div className="left"></div>
                        <div className="right"></div>
                        <div className="up"></div>
                        <div className="down"></div>
                    </div>
                </div>
                <div className="ch404">
                    404
            <br />
                    <div className="Chtetx text-center">
                        Not Found
            </div>
                </div>

            </div>
        );
    }
}