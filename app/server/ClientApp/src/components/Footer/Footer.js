import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-scroll';
import './Footer.css';
export class Footer extends Component {
    displayName = Footer.name
    render() {
        return (
            <div>
                <footer>
                    <div style={{ padding: '5px' }} className="container">
                        <Grid fluid>
                            <Row>
                                <Col md={3}>
                                    <h3>Vira Coin</h3>
                                    <p>Fast and secure asset managment system on top of ethereum blockchain network resulting in a none-fiat tokens whith carpets as their fund.</p>
                                </Col>
                                <Col md={1}>
                                    <br />
                                    <br />
                                    <Link activeClass="active" to="home" spy={true} smooth={true} duration={500} className="NavItem">
                                        Home
        </Link>
                                    <br />
                                    <br />
                                    <Link activeClass="active" to="about" spy={true} smooth={true} duration={500} className="NavItem">
                                        About
                </Link>
                                    <br />
                                    <br />
                                    <Link activeClass="active" to="cp" spy={true} smooth={true} duration={500} className="NavItem">
                                        Carpets
                </Link>
                                    <br />
                                    <br />
                                    <Link activeClass="active" to="ts" spy={true} smooth={true} duration={500} className="NavItem">
                                        Tokens
                </Link>
                                </Col>
                                <Col md={3}>
                                    <br />
                                    <br />
                                    <button className="btn btn-primary btn-lg Btnss">Download white paper</button>
                                    <br />
                                    <img src={require('../../img/enamad.jpg')} className='enamad' />
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
                    </div>
                    <hr />
                    <p className='text-center FooterDown' style={{ margin: 'auto', padding: '10px' }}>&copy; 2018 Name</p>
                </footer>
            </div>
        );
    }
}