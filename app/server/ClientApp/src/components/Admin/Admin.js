import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import './Admin.css';
import { Statics } from '../Statics';
import { Web3s, ViraCoinToken, ViraCoinCart } from '../Web3/Web3';
import history from '../history';
export class Admin extends Component {
    displayName = Admin.name
    constructor(props) {
        super(props);
        Statics.IsLogin();
    }
    render() {
        return (
            <div className='PopUp'>
                <div className='ComponentBaseStyle'>
                    <Grid fluid>
                        <Row>
                            <Col md={6} className="AdminCol">
                                <div className="AdminItem">
                                    <h3>
                                        Vira Token
                                </h3>
                                    <hr />
                                </div>
                            </Col>
                            <Col md={6} className="AdminCol">
                                <div className="AdminItem">
                                    <h3>
                                        Vira Cart
                                </h3>
                                    <hr />
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}