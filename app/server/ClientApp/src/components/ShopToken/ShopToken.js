import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import { Web3s, ViraCoinToken, ViraCoinCart } from '../Web3/Web3';
import history from '../history';
import Slider from 'react-slick';
import './ShopToken.css';

export class ShopToken extends Component {
    displayName = ShopToken.name
    constructor(props) {
        super(props);
        if (Statics.GetShopToken().id === undefined) history.push('/');
        this.state = {
            id: Statics.GetShopToken().id,
            imgPath: Statics.GetShopToken().imgPath,
            token: Statics.GetShopToken().token,
            production: Statics.GetShopToken().production,
            price: Statics.GetShopToken().price
        }
    }
    RenderSlider(value) {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            accessibility: true,
            adaptiveHeight: true,
            autoplay: true,
            pauseOnDotsHover: true,
            pauseOnFocus: true
        };
        if (value === undefined) return (
            <img src={require('../../img/ethereum.png')} className="ImageClass" />);
        else if (!value.includes(',')) return (
            <img src={require('../../img/ethereum.png')} className="ImageClass" />);
        else {
            var p = value.split(',');
            p.shift();
            return (
                <Slider {...settings}>
                    {p.map(i =>
                        <div>
                            <img src={"papi/papi/Public/Down/" + i} className="ImageClass" />
                        </div>)
                    }
                </Slider>)
        }
    }
    CallBack(ID, Owner, r) {
        fetch('api/api/Shop', {
            method: 'PUT',
            headers: {
                'PubKey': Web3s.GetAccount(),
                'PrivateToken': Statics.GetToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: ID,
                account: Owner,
                tx: r,
            })
        }).then(res => {
            if (res.status === 200) {
                alert('Changes saved successfully.');
            } else {
                alert('Something went wrong.');
            }
        })
            .catch(err => console.error(err));
    }
    render() {
        let Slider = this.RenderSlider(this.state.imgPath);
        return (
            <div className='PopUp'>
                <div>
                    {Slider}
                    <div className='ComponentBaseStyle'>
                        <Grid fluid>
                            <Row>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Token
                                            </label>
                                        <br />
                                        <label className="form-control">{this.state.token}</label>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Price
                                            </label>
                                        <br />
                                        <label className="form-control">{this.state.price}</label>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Production Date
                                            </label>
                                        <br />
                                        <label className="form-control">{String(this.state.production).substr(0, 10)}</label>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <input type="submit" className="btn btn-primary btnnnn" value="buy"
                                        style={{ float: 'right' }}
                                        onClick={() => {
                                            Statics.IsLogin() ?
                                                ViraCoinCart.Buy(this.state.token, this.state.price, this.CallBack, this.state.id, Statics.GetToken())
                                                : alert('you should login to buy!!!')
                                        }} />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}