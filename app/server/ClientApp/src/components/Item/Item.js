import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import { Web3s, ViraCoinToken, ViraCoinCart } from '../Web3/Web3';
import history from '../history';
import Slider from 'react-slick';
import './Item.css';
export class Item extends Component {
    displayName = Item.name
    constructor(props) {
        super(props);
        Statics.IsLogin();
        this.state = {
            token: '',
            data: '',
            production: '',
            registration: '',
            prevOwner: '',
            firstOwner: '',
            issuer: '',
            attorneyOwner: '',
            forSale: false,
            imgPath: '',
            metaDate: '',
            price: 0,
            id: props.match.params.ID,
            puttinginshop: 0
        };
        this.FetchData(props.match.params.ID);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.Transfer = this.Transfer.bind(this);
        this.Burn = this.Burn.bind(this);
        this.SetAttorny = this.SetAttorny.bind(this);
        this.ClearAttorny = this.ClearAttorny.bind(this);
        this.PutInShop = this.PutInShop.bind(this);
        this.UpdateFee = this.UpdateFee.bind(this);
    }
    PutInShop() {
        if (this.state.inShop) {
            alert('alredy in shop!!!');
            return;
        }
        if (this.state.puttinginshop === 0) {
            alert('first you need to set the shop as your asset attorny owner so it can transfer it instead of you...');
            //          let c = confirm('set ' + ViraCoinCart.GetAddress() + ' as your token attorny??\r once transaction is confirmed in block chain use this button again in order to complete.');
            // if (c) {
            ViraCoinToken.SetAttorny(this.state.token, ViraCoinCart.GetAddress(), this.AttornyServer, this.state.id);
            this.setState({ puttinginshop: 1 });
            //} else {
            //    alert('operation canceld');
            // }
        }
        //else if (this.state.puttinginshop === 1) {
        //     ViraCoinToken.AttorneyGet(this.state.token);
        //     this.setState({ puttinginshop: 2 });
        // } else if (this.state.puttinginshop === 2) {
        //     let p = String(ViraCoinCart.GetData());
        //     if (p !== '' && !p.includes('0x08c379a')) {
        //         this.setState({ puttinginshop: 2 });
        //     } else alert('the shop is not attorny. w8!!!');
        // }
        else if (this.state.puttinginshop === 1) {
            this.state.price = prompt('enter the price in eth');
            ViraCoinCart.NewAsset(this.state.token, this.state.price, this.shopserver, this.state.id, Statics.GetToken());
        }
    }
    shopserver(ID, r, p, acc) {
        fetch('api/api/Shop/', {
            method: 'POST',
            headers: {
                'PubKey': Web3s.GetAccount(),
                'PrivateToken': Statics.GetToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: p,
                assetID: ID,
                tx: r,
                account: acc
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
    SetAttorny() {
        var address = prompt("Enter the recipient wallet address.");
        if (String(address).toUpperCase() === String(Web3s.GetAccount()).toUpperCase()) {
            alert("This asset is already Yours.")
        } else {
            if (Web3s.IsAddress(address)) {
                ViraCoinToken.SetAttorny(this.state.token, address, this.AttornyServer, this.state.id);
            } else {
                alert('Wrong wallet address');
            }
        }
    }
    ClearAttorny() {
        ViraCoinToken.ClearAttorny(this.state.token, this.AttornyServer, this.state.id);
    }
    AttornyServer(ID, Address) {
        fetch('api/api/Assets/', {
            method: 'PATCH',
            headers: {
                'PubKey': Web3s.GetAccount(),
                'PrivateToken': Statics.GetToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                attorneyOwner: Address,
                id: ID
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
    Burn() {
        var res = prompt("Are you sure??!!\r\n type 'YES IM SURE.'");
        if (String(res) === 'YES IM SURE.') {
            ViraCoinToken.Burn(this.state.token, this.ServerBurn, this.state.id);
        } else {
            alert(res + ' is not correct.');
        }
    }
    ServerBurn(ID, r) {
        fetch('api/api/Assets/' + ID, {
            method: 'DELETE',
            headers: {
                'PubKey': Web3s.GetAccount(),
                'PrivateToken': Statics.GetToken(),
                'tx': r
            }
        }).then(res => {
            if (res.status === 200) {
                alert('Changes saved successfully.');
            } else {
                alert('Something went wrong.');
            }
        })
            .catch(err => console.error(err));
    }
    Transfer() {
        var address = prompt("Enter the recipient wallet address.");
        if (String(address).toUpperCase() === String(Web3s.GetAccount()).toUpperCase()) {
            alert("This asset is already Yours.")
        } else {
            if (Web3s.IsAddress(address)) {
                fetch('api/api/Account/pkg/' + address, {
                    method: 'GET',
                    headers: {
                        'PubKey': Web3s.GetAccount(),
                        'PrivateToken': Statics.GetToken(),
                    }
                }).then(res => res.status === 200 ?
                    ViraCoinToken.Transfer(address, this.state.token, this.ServerTransfer, this.state.id, Web3s.GetAccount()) :
                    alert("Wrong wallet address"))

            } else {
                alert('Wrong wallet address');
            }
        }
    }
    ServerTransfer(ID, from, To, Tx) {
        fetch('api/api/Assets/' + ID, {
            method: 'PUT',
            headers: {
                'PubKey': Web3s.GetAccount(),
                'PrivateToken': Statics.GetToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentOwner: To,
                prevOwner: from,
                tx: Tx,
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
    handlePriceChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
            price: value
        });
    }
    FetchData(id) {
        fetch('api/api/Assets/' + id, {
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
                    token: data.token,
                    data: data.data,
                    production: data.production,
                    registration: data.registration,
                    prevOwner: data.prevOwner,
                    firstOwner: data.firstOwner,
                    issuer: data.issuer,
                    attorneyOwner: data.attorneyOwner,
                    forSale: data.forSale,
                    imgPath: data.imgPath,
                    metaDate: data.metaDate,
                    price: data.forSale ? data.inShop.price : 0,
                });
                ViraCoinToken.Mine(this.state.token);
            })
            //.then(d => alert(String(d.imgPath)))
            .catch(r => {
                console.log(r);
                history.push('/');
            });

    }
    ClearShop() {
        this.ClearAttorny();
        fetch('api/api/Shop/' + this.state.id, {
            method: 'DELETE',
            headers: {
                'PubKey': Web3s.GetAccount(),
                'PrivateToken': Statics.GetToken(),
            }
        }).then(res => {
            if (res.status === 200) {
                alert('Changes saved successfully.');
            } else {
                alert('Something went wrong.');
            }
        })
            .catch(err => console.error(err));
    }
    UpdateFee() {
        var value = prompt('enter new fee in eth');
        ViraCoinCart.UpdatePrice(this.state.token, value, this.UpdateFeeServer, this.state.id)
    }
    UpdateFeeServer(ID, Price, r) {
        fetch('api/api/Shop/', {
            method: 'PATCH',
            headers: {
                'PubKey': Web3s.GetAccount(),
                'PrivateToken': Statics.GetToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: ID,
                tx: r,
                price: Price
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
    RenderData() {
        let slider = this.RenderSlider(this.state.imgPath);
        let Shop = this.state.forSale ?
            // <Col md={2}>
            <center>
                <input type="submit" className="btn btn-success Btnnn" value="Clear from shop"
                    onClick={() => this.ClearShop()} />
            </center>
            // </Col> 
            :
            // <Col md={2}>
            <center>
                <input type="submit" className="btn btn-warning Btnnn" value="Put in Shop"
                    onClick={this.PutInShop} />
            </center>
            // </Col>
            ;
        let UpdateFee = this.state.forSale ?
            // <Col md={2}>
            <center>
                <input type="submit" className="btn btn-warning Btnnn" value="Update Price"
                    onClick={this.UpdateFee} />
            </center>
            // </Col>
            :
            <div></div>
            ;
        return (
            <div>
                {slider}
                <div className='ComponentBaseStyle'>
                    <Grid fluid>
                        <Row>
                            <Col md={10}>
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
                                            Data
                      </label>
                                        <br />
                                        <label className="form-control">{this.state.data}</label>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Production Date
                      </label>
                                        <br />
                                        <label className="form-control">{String(this.state.production).substr(0, 10)}</label>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Registration Date
                      </label>
                                        <br />
                                        <label className="form-control">{String(this.state.registration).substr(0, 10)}</label>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Issuer
                                    </label>
                                        <br />
                                        <label className="form-control">{this.state.issuer}</label>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Pervious Owner
                                    </label>
                                        <br />
                                        <label className="form-control">{this.state.prevOwner.length > 0 ? this.state.prevOwner : 'No Pervious Owner'}</label>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Initail Owner
                                    </label>
                                        <br />
                                        <label className="form-control">{this.state.firstOwner}</label>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Attorney Owner
                                    </label>
                                        <br />
                                        <label className="form-control">{this.state.attorneyOwner.length > 0 ?
                                            this.state.attorneyOwner.includes(ViraCoinCart.GetAddress().substr(0, 8)) ?
                                                'Shop' :
                                                this.state.attorneyOwner
                                            : 'No Attorney'}</label>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Information
                                    </label>
                                        <br />
                                        <textarea value={this.state.metaDate} className="form-control"
                                            rows={8}
                                            readOnly
                                        />
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Price In Shop
                                        </label>
                                        <br />
                                        <label className="form-control">{this.state.price} Eth</label>
                                    </div>
                                </Col>
                            </Col>
                            <Col md={2}>
                                <div className="form-group">
                                    <label className="control-label">
                                        Control Panel
                                        </label>
                                    <br />
                                    <div className="form-control BtnContainer">
                                        {/* <Col md={2}> */}
                                        <center>
                                            <input type="submit" className="btn btn-danger Btnnn" value="Transfer" onClick={this.Transfer} />
                                        </center>
                                        <br />
                                        {/* <Col md={2}> */}
                                        <center>
                                            <input type="submit" className="btn btn-danger Btnnn" value="Destroy" onClick={this.Burn} />
                                        </center>
                                        <br />
                                        {/* <Col md={2}> */}
                                        <center>
                                            <input type="submit" className="btn btn-warning Btnnn" value="Set Attorny" onClick={this.SetAttorny} />
                                        </center>
                                        <br />
                                        {/* <Col md={2}> */}
                                        <center>
                                            <input type="submit" className="btn btn-info Btnnn" value="clear Attorny" onClick={this.ClearAttorny} />
                                        </center>
                                        <br />
                                        {Shop}
                                        <br />
                                        {UpdateFee}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div >
        )
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
            <img src={require('../../img/noimg2.png')} className="ImageClass" />);
        else if (!value.includes(',')) return (
            <img src={require('../../img/noimg2.png')} className="ImageClass" />);
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

    render() {
        let content = this.RenderData();
        return (
            <div className='PopUp'>
                {content}
            </div>
        );
    }
}