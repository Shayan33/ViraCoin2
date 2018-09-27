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
        ViraCoinToken.Owner();

    }
    CartUpdateFee() {
        var newValue = prompt('enter new fund in wei');
        ViraCoinCart.UpdateFee(newValue);
    }
    CartKill() {
        var res = prompt("Are you sure??!!\r\n type 'YES IM SURE.'");
        if (String(res) === 'YES IM SURE.') {
            ViraCoinCart.Kill();
        } else {
            alert(res + ' is not correct.');
        }
    }
    TTokenUpdateFee() {
        var newValue = prompt('enter new fund in wei');
        ViraCoinToken.UpdateFee(newValue);
    }
    TokenKill() {
        var res = prompt("Are you sure??!!\r\n type 'YES IM SURE.'");
        if (String(res) === 'YES IM SURE.') {
            ViraCoinToken.Kill();
        } else {
            alert(res + ' is not correct.');
        }
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
                                    <center>
                                        <input type='submit' className='btn btn-primary Btnn' value='Withdraw'
                                            onClick={() => ViraCoinToken.Withdraw()} />
                                    </center>
                                    <br />
                                    <center>
                                        <input type='submit' className='btn btn-primary Btnn' value='GetFunds'
                                            onClick={() => ViraCoinToken.GetFunds()} />
                                    </center>
                                    <br />
                                    <center>
                                        <input type='submit' className='btn btn-warning Btnn' value='UpdateFee'
                                            onClick={() => this.TTokenUpdateFee()} />
                                    </center>
                                    <br />
                                    <center>
                                        <input type='submit' className='btn btn-danger Btnn' value='Kill'
                                            onClick={() => this.TokenKill()} />
                                    </center>
                                </div>
                            </Col>
                            <Col md={6} className="AdminCol">
                                <div className="AdminItem">
                                    <h3>
                                        Vira Cart
                                </h3>
                                    <hr />
                                    <center>
                                        <input type='submit' className='btn btn-primary Btnn' value='Withdraw'
                                            onClick={() => ViraCoinCart.GetFunds()} />
                                    </center>
                                    <br />
                                    <center>
                                        <input type='submit' className='btn btn-primary Btnn' value='GetFunds'
                                            onClick={() => ViraCoinCart.GetFunds()} />
                                    </center>
                                    <br />
                                    <center>
                                        <input type='submit' className='btn btn-warning Btnn' value='UpdateFee'
                                            onClick={() => this.CartUpdateFee()} />
                                    </center>
                                    <br />
                                    <center>
                                        <input type='submit' className='btn btn-danger Btnn' value='Kill'
                                            onClick={() => this.CartKill()} />
                                    </center>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}