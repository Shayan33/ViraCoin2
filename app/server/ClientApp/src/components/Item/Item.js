import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import { Statics } from '../Statics';
import Slider from 'react-slick';
import './Item.css';
export class Item extends Component {
    constructor(props) {
        super(props);
        Statics.IsLogin();
    }
    displayName = Item.name
    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className='PopUp'>
                <h1>Item</h1>
                <hr />
                <div className='ComponentBaseStyle'>
                    <Slider {...settings}>
                        <div>
                            <img src={require('../../img/back.jpg')} />
                        </div>
                        <div>
                            <img src={require('../../img/fileicon.svg')} />
                        </div>
                        <div>
                            <img src={require('../../img/png.png')} />
                        </div>
                        <div>
                            <img src={require('../../img/back.jpg')} />
                            <h3>6</h3>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}