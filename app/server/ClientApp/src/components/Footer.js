import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import './Footer.css'
export class Footer extends Component {
    displayName = Footer.name
    render() {
        return (
            <div>
                <footer>
                    <div className="container">
                        <Grid fluid>
                            <Row>
                                <Col md={4}>
                                    <h1>F1</h1>
                                    <hr />
                                </Col>
                                <Col md={4}>
                                    <h1>F2</h1>
                                    <hr />
                                </Col>
                                <Col md={4}>
                                    <h1>F3</h1>
                                    <hr />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </footer>
            </div>
        );
    }
}