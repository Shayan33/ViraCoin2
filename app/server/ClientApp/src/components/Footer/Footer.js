import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import './Footer.css';
export class Footer extends Component {
    displayName = Footer.name
    render() {
        return (
            <div>
                <footer>
                    <div style={{ padding: '5px' }}>
                        <Grid fluid>
                            <Row>
                                <Col md={3}>
                                    <h3>F1</h3>
                                    <hr />
                                </Col>
                                <Col md={4}>
                                    <h3>About US</h3>
                                    <hr />
                                    <p>
                                        Company Sumery
                                    </p>
                                </Col>
                                <Col md={3}>
                                    <h3>Contact US</h3>
                                    <hr />
                                    <address>
                                        Company Name<br />
                                        Visit us at: &nbsp; &nbsp;
                                        <a>Example.com</a><br />
                                        Box 564, Disneyland, USA<br />
                                        Phone Number: +98210000000 <br />
                                        Fax Number: +98210000000 <br />
                                    </address>
                                </Col>
                                <Col md={2}>
                                    <h3>Follow US</h3>
                                    <hr />
                                    <div style={{ float: 'right' }}>
                                        <img src={require('../../img/twitter.svg')} alt='twitter' className="logos"
                                            onClick={() => window.location.href = 'google.com'}
                                        />
                                        <img src={require('../../img/telegram.svg')} alt='telegram' className="logos"
                                            onClick={() => window.location.href = 'google.com'}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                        <hr />
                        <p className='text-center' style={{ margin: 'auto' }}>&copy; 2018 Name</p>
                    </div>
                </footer>
            </div>
        );
    }
}