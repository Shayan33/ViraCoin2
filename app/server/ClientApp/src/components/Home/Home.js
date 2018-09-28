import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import history from '../history';
import { Statics } from '../Statics';
import './Home.css';
import Slider from 'react-slick';
export class Home extends Component {
  displayName = Home.name
  constructor(props) {
    super(props);
    this.state = { items: [] };
    fetch('papi/papi/Public')
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
              <Col md={3} sm={4} xsm={6} className="InventoryItem" onClick={() => {
                Statics.SetShopToken(i);
                history.push('/Token')
              }}>
                <div className={i.available ? "AvailableItem" : "NotAvailableItem"}>
                  <img src={!i.imgPath.includes(',') ? require('../../img/noimg.png') : "papi/papi/Public/Down/" + i.imgPath.split(',')[1]} alt="img" className="InventoryImgStyle" />
                  <div className="InventoryDetailes">
                    <small>Token ID:</small>
                    <br />
                    <small className="OverFlowwText">{String(i.token).substr(0, 16)}...</small>
                    <br />
                    <div>
                      <small style={{ float: 'left' }}>Production Date :</small>
                      <small style={{ float: 'right' }}
                      >{String(i.production).substr(0, 10)}</small>
                    </div>
                    <br />
                    <div>
                      <small style={{ float: 'left' }}>Price :</small>
                      <small style={{ float: 'right' }}
                      >{String(i.price)}</small>
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
    let content = this.renderData(this.state.items);
    return (
      <div className="PopUp">
        <Slider {...settings}>
          <div>
            <img src={require('../../img/back.jpg')} className="ImageClass" />
          </div>
          <div>
            <img src={require('../../img/png.png')} className="ImageClass" />
          </div>
        </Slider>
        <div className="ComponentBaseStyle">
          {content}
        </div>
      </div>
    );
  }
}
