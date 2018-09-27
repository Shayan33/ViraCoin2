import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import { Web3s, ViraCoinToken } from '../Web3/Web3';
import './Inventory.css';
import history from '../history';
export class Inventory extends Component {
    displayName = Inventory.name
    constructor(props) {
        super(props);
        Statics.IsLogin();
        this.state = { items: [] };
        fetch('api/api/Assets/GetAssets/' + Statics.GetToken(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'PrivateToken': Statics.GetToken(),
                'PubKey': Web3s.GetAccount()
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    items: data
                });
            }).catch(r => console.log(r));
    }
    renderData(items) {
        return (
            <Grid fluid>
                <Row>
                    {
                        items.map(i =>
                            <Col md={3} sm={4} xsm={6} className="InventoryItem" onClick={() => history.push('/Item/' + String(i.id))}>
                                <div className={i.available ? "AvailableItem" : "NotAvailableItem"}>
                                    <img src={!i.imgPath.includes(',') ? require('../../img/ethereum.png') : "papi/papi/Public/Down/" + i.imgPath.split(',')[1]} alt="img" className="InventoryImgStyle" />
                                    <div className="InventoryDetailes">
                                        <small>Token ID:</small>
                                        <br />
                                        <small className="OverFlowwText">{String(i.token).substr(0, 16)}...</small>
                                        <br />
                                        <div>
                                            <small style={{ float: 'left' }}>Production Date :</small>
                                            <small style={{ float: 'right' }}>{String(i.production).substr(0, 10)}</small>
                                        </div>
                                        <br />
                                        <div>
                                            <small style={{ float: 'left', marginTop: '10px' }}>In Shop :</small>
                                            <small style={{ float: 'right' }}
                                                className={i.forSale ? 'text-danger' : 'text-success'}
                                            >{i.forSale ? "Yes" : "No"}</small>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )}
                </Row>
            </Grid>
        );
    }
    render() {
        let content = this.renderData(this.state.items);
        return (
            <div className='PopUp'>
                <h1>Inventory</h1>
                <hr />
                <div className='ComponentBaseStyle'>
                    {content}
                </div>
            </div>
        );
    }
}