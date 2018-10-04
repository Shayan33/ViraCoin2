import React, { Component } from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { ToastContainer, ToastStore } from 'react-toasts';
import { Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import history from '../history';
import { Web3s, ViraICO } from '../Web3/Web3';
import Modal from 'react-modal';
import './Home.css';
import $ from 'jquery';
import Slider from 'react-slick';
import Pie3D from 'react-pie3d';
Modal.setAppElement('#root');

export class Home extends Component {
    displayName = Home.name;
    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.state = {
            scroll: false, modalIsOpen: false, modalType: 0, CarpetID: {},
            name: '', middleName: '', lastName: '', emailAddress: '', phoneNumber: '', cellNumber: '', address: '',
            id: '', Cdata: [], TotallSuply: 70, SpentSupply: 30, accBalance: 0
        };
        window.onscroll = () => {
            if (window.pageYOffset > 50) this.setState({ scroll: true });
            else this.setState({ scroll: false });
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.Register = this.Register.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.FetchCarpets();
        if (Web3s.CheckWeb3() && Web3s.CheckMainNet()) {
            ViraICO.SpentSupply((r) => {
                this.setState({ SpentSupply: r })
            });
            ViraICO.TotallSupply((r) => {
                this.setState({ TotallSuply: r })
            });
            ViraICO.GetMyBalance((r) => {
                this.setState({ accBalance: (r / 10000000000000000) })
            });
        }
    }
    TotallSuply() {
        let tot = this.state.TotallSuply;
        let spen = this.state.SpentSupply;
        let p = (tot - spen) / 10000000000000000;
        return p;
    }
    SpentSupply() {
        let spen = this.state.SpentSupply;
        let p = (spen) / 10000000000000000;
        return p;
    }
    FetchCarpets() {
        fetch('api/Assets')
            .then(res => res.json())
            .then(d => this.setState({ Cdata: d }))
            .catch(e => console.error(e));
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        fetch('api/Account/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                name: this.state.name,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                phoneNumber: this.state.phoneNumber,
                cellNumber: this.state.cellNumber,
                address: this.state.address,
                personalID: this.state.id,
                pubKey: Web3s.GetAccount()
            })
        }).then(response => {
            if (response.status === 200) {
                ToastStore.success('Changes saved successfully.', 2000);
                this.closeModal();
                response.json()
            }
            else if (response.status === 404) {
                ToastStore.error('You cannot register twice.', 2000);
                this.closeModal();
            }
            else {
                ToastStore.warning('Something unxpected happened. try again!!!', 2000);
            }
        }).then(data => {
            this.setState({
                name: data.name,
                lastName: data.lastName,
                emailAddress: data.emailAddress,
                phoneNumber: data.phoneNumber,
                cellNumber: data.cellNumber,
                address: data.address,
                id: data.personalID
            });
        })
            .catch(r => console.log(r));
        event.preventDefault();
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {

    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    componentDidMount() {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

        $(document).ready(function () {

            var scrollLink = $('.scroll');

            // Smooth scrolling
            scrollLink.click(function (e) {
                e.preventDefault();
                $('body,html').animate({
                    scrollTop: $(this.hash).offset().top
                }, 1000);
            });

            // Active link switching
            $(window).scroll(function () {
                var scrollbarLocation = $(this).scrollTop();

                scrollLink.each(function () {

                    var sectionOffset = $(this.hash).offset().top - 20;

                    if (sectionOffset <= scrollbarLocation) {
                        $(this).parent().addClass('active');
                        $(this).parent().siblings().removeClass('active');
                    }
                })

            })

        })

        //Particles

        window.particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true, "value_area": 800
                    }
                },
                "color":
                    { "value": "#ffffff" },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0, "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100, "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    scrollToTop() {
        scroll.scrollToTop();
    }
    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }
    Register() {
        this.setState({ modalType: 0 });
        this.openModal();
    }
    SetCarpetData(data) {
        this.setState({ modalType: 1, CarpetID: data });
        this.openModal();
    }
    RenderModalData() {
        let Content = this.state.modalType === 0 ?
            Web3s.CheckWeb3() ? Web3s.CheckMainNet() ? Web3s.CheckOnline() ? (String(Web3s.GetAccount()) !== 'undefined') ?
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <Grid fluid>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            ID
                                    </label>
                                        <br />
                                        <input type="text"
                                            placeholder="123456789" value={this.state.id}
                                            onChange={this.handleInputChange} name="id" className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Name
                                    </label>
                                        <br />
                                        <input type="text"
                                            placeholder="Name" value={this.state.name}
                                            onChange={this.handleInputChange} name="name" className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Last Name
                                    </label>
                                        <br />
                                        <input type="text"
                                            placeholder="Last Name" value={this.state.lastName}
                                            onChange={this.handleInputChange} name="lastName" className="form-control"
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Email Address
                                    </label>
                                        <br />
                                        <input type="email"
                                            placeholder="example@gmail.com" value={this.state.emailAddress}
                                            onChange={this.handleInputChange} name="emailAddress" className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Phone Number
                                    </label>
                                        <br />
                                        <input type="tel"
                                            placeholder="123-456-7890" value={this.state.phoneNumber}
                                            onChange={this.handleInputChange} name="phoneNumber" className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Cell Number
                                    </label>
                                        <br />
                                        <input type="tel"
                                            placeholder="123-456-7890" value={this.state.cellNumber}
                                            onChange={this.handleInputChange} name="cellNumber" className="form-control"
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Address
                                    </label>
                                        <br />
                                        <textarea value={this.state.address} name="address" onChange={this.handleInputChange} className="form-control"
                                            rows={8}
                                        />
                                    </div>
                                    <div className="form-group" style={{ float: 'right' }}>
                                        <input type="submit" value="Submit" className="form-control"
                                            className="btn btn-primary btnnnn"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </form>
                </div> :
                <div className="container">
                    <div className='LayoutErrors PopUp'>
                        <h1 className="text-danger text-center" >
                            <Glyphicon glyph="lock" style={{ paddingTop: '20px', fontSize: '130px' }} />
                        </h1>
                        <h1>
                            <p className="text-danger text-center">
                                Please log in to your ethereum account.
              </p>
                        </h1>
                    </div>
                </div>
                :
                <div className="container">
                    <div className='LayoutErrors PopUp'>
                        <h1 className="text-danger text-center" >
                            <Glyphicon glyph="off" style={{ paddingTop: '20px', fontSize: '130px' }} />
                        </h1>
                        <h1>
                            <p className="text-danger text-center">
                                You are not connected to the network!!!
          </p>
                        </h1>
                    </div>
                </div> :
                <div className="container">
                    <div className='LayoutErrors PopUp'>
                        <h1 className="text-danger text-center" >
                            <Glyphicon glyph="warning-sign" style={{ paddingTop: '20px', fontSize: '130px' }} />
                        </h1>
                        <h1>
                            <p className="text-danger text-center">
                                Please switch to main ethereum network!!!
          </p>
                        </h1>
                    </div>
                </div> :
                <div className="container">
                    <div className='LayoutErrors PopUp'>
                        <h1 className="text-danger text-center" >
                            <Glyphicon glyph="remove" style={{ paddingTop: '20px', fontSize: '130px' }} />
                        </h1>
                        <h1>
                            <p className="text-danger text-center">
                                You dont have metamask installed!!!
          </p>
                        </h1>
                        <br />
                        <p className="text-warning text-center">
                            Please check <a href="https://metamask.io">metamask.io</a> to install metamask.
          </p>
                    </div>
                </div>
            : <div>
                {this.RenderSlider(this.state.CarpetID.imgPath)}
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <div className="form-group">
                                <label className="control-label">
                                    Token
                      </label>
                                <br />
                                <label className="form-control">{this.state.CarpetID.token}</label>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="form-group">
                                <label className="control-label">
                                    Data
                      </label>
                                <br />
                                <label className="form-control">{this.state.CarpetID.data}</label>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label className="control-label">
                                    Production Date
                      </label>
                                <br />
                                <label className="form-control">{String(this.state.CarpetID.production).substr(0, 10)}</label>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label className="control-label">
                                    No
                      </label>
                                <br />
                                <label className="form-control">{String(this.state.CarpetID.no).substr(0, 10)}</label>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="form-group">
                                <label className="control-label">
                                    Information
                                    </label>
                                <br />
                                <textarea value={this.state.CarpetID.metaDate} className="form-control"
                                    rows={4}
                                    readOnly
                                />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>;
        return Content;
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

            return (
                <Slider {...settings}>
                    {p.map(i =>
                        <div>
                            <img src={"api/Assets/Down/" + i} className="ImageClass" />
                        </div>)
                    }
                </Slider>)
        }
    }
    renderCarpets(items) {
        return (
            <Grid fluid>
                <Row>
                    {
                        items.map(i =>
                            <Col md={3} sm={4} xsm={6} className="CarpetImageContainer" onClick={() => this.SetCarpetData(i)}>
                                <img src={!i.imgPath.includes(',') ? require('../../img/noimg.png') : "api/Assets/Down/" + i.imgPath.split(',')[1]} alt="img" className="CarpetIMG" />
                                <div className="CarpetDetailes">
                                    <text style={{ float: 'left' }}>Token ID:</text>
                                    <text style={{ float: 'right' }}>{String(i.token).substr(0, 16)}...</text>
                                    <br />
                                    <div>
                                        <text style={{ float: 'left' }}>Production Date:</text>
                                        <text style={{ float: 'right' }}>{String(i.production).substr(0, 10)}</text>
                                    </div>
                                </div>
                            </Col>
                        )}
                </Row>
            </Grid >
        );
    }
    render() {
        let carpetdata = this.renderCarpets(this.state.Cdata);
        let ScNav = this.state.scroll ? "NavBar2" : "NavBar";
        let InnerScroll = this.state.scroll ? "NavItems2" : "NavItems1";
        let Content = Web3s.CheckWeb3() ? Web3s.CheckMainNet() ? Web3s.CheckOnline() ? (String(Web3s.GetAccount()) !== 'undefined') ?
            <div className="SendAndFunds">
                <text> {this.state.accBalance} VC</text>
                <br />
                <Link activeClass="active" className="NavItem Send">
                    <Glyphicon glyph='send' style={{ marginRight: '5px' }} />
                    Send
                  </Link>
            </div> :
            <div className="Errs">Please login to your ethereum account.</div>
            :
            <div className="Errs">You are not connected to the network.</div>
            :
            <div className="Errs">Please switch to main network!</div>
            :
            <div className="Errs">You dont have <a href="https://metamask.io">metamask</a> installed!</div>
            ;
        let Modall = this.RenderModalData();
        return (
            <div>
                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    className="MModal"
                    contentLabel="Example Modal"
                >
                    <div style={{ float: 'right', cursor: 'pointer', fontSize: '23px' }} onclick={this.closeModal}>
                        <Glyphicon glyph="remove" className="text-danger" />
                    </div>
                    <div style={{ marginTop: '33px' }}>
                        {Modall}
                    </div>
                </Modal>
                <div className={ScNav}>
                    <div className="container">
                        <div className={InnerScroll}>
                            <img src={require('../../img/ethereum.png')} className="Logo" />
                            <text className="LogoText">ViraCoin...</text>
                            <Link activeClass="active" to="home" spy={true} smooth={true} duration={500} className="NavItem">
                                <Glyphicon glyph='home' style={{ marginRight: '5px' }} />
                                Home
                </Link>
                            <Link activeClass="active" to="about" spy={true} smooth={true} duration={500} className="NavItem">
                                <Glyphicon glyph='info-sign' style={{ marginRight: '5px' }} />
                                About
                </Link>
                            <Link activeClass="active" to="cp" spy={true} smooth={true} duration={500} className="NavItem">
                                <Glyphicon glyph='th-list' style={{ marginRight: '5px' }} />
                                Carpets
                </Link>
                            <Link activeClass="active" to="ts" spy={true} smooth={true} duration={500} className="NavItem">
                                <Glyphicon glyph='bitcoin' style={{ marginRight: '5px' }} />
                                Token Sale
                </Link>
                            {/* <Link activeClass="active" to="faq" spy={true} smooth={true} duration={500} className="NavItem">
                                <Glyphicon glyph='question-sign' style={{ marginRight: '5px' }} />
                                FAQ
                </Link> */}
                            <Link activeClass="active" spy={true} onClick={this.Register} className="NavItem">
                                <Glyphicon glyph='check' style={{ marginRight: '5px' }} />
                                Register for the ICO
                </Link>
                            {Content}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <Element name="home" className="element" >
                        <div className="BaseComponentClass">
                            <div id="particles-js" className="HomeBack">
                                <div className='container HomeItems'>
                                    <div className="eth">
                                        <div className="bottom">
                                            <div className="left"></div>
                                            <div className="right"></div>
                                            <div className="up"></div>
                                            <div className="down"></div>
                                        </div>
                                        <div className="top">
                                            <div className="left"></div>
                                            <div className="right"></div>
                                            <div className="up"></div>
                                            <div className="down"></div>
                                        </div>
                                    </div>
                                    <div className="HomeTexts">
                                        Fast Growing ICO
                      <br />
                                        Agency for Blockchain
                                  <br />
                                        Investors and Founders
                      <h3>Fast and secure asset managment system on top of ethereum blockchain network resulting in a none-fiat tokens
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      whith carpets as their fund.
                      </h3>
                                        <button className="btn btn-primary btn-lg RegisterButton"
                                            onClick={this.Register}
                                        >Register for the ICO</button>
                                        <button className="btn btn-primary btn-lg">Download white paper</button>
                                    </div>
                                    <div className="HomeTexts2">
                                        <img src={require('../../img/logo0.png')} className="BottomLogos" />
                                        <img src={require('../../img/logo1.png')} className="BottomLogos" />
                                        <img src={require('../../img/logo2.png')} className="BottomLogos" />
                                        <img src={require('../../img/logo3.png')} className="BottomLogos" />
                                        <img src={require('../../img/logo4.png')} className="BottomLogos" />
                                        <img src={require('../../img/logo5.png')} className="BottomLogos" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Element>
                    <div className="Seperator"></div>
                    <Element name="about" className="element BaseComponentClass">

                    </Element>

                    <Element name="cp" className="element BaseComponentClassCarpet">
                        <div className="InnerCarprt">
                            {carpetdata}
                        </div>
                    </Element>

                    <Element name="ts" className="element BaseComponentClass TokenSale">
                        <h1 className='text-center'>Token Disterbution</h1>
                        <div style={{ marginTop: '-60px', width: '100%', height: '83vh' }}>
                            <Pie3D data={[{
                                value: this.TotallSuply(),
                                label: 'Totall Supply'
                            }, {
                                value: this.SpentSupply(),
                                label: 'Spent Supply'
                            }]}
                                config={{ ir: '50', h: '100', angle: '50' }}

                            />
                        </div>
                    </Element>
                    {/* <Element name="faq" className="element BaseComponentClass">
                        test 4
            </Element > */}
                </div >
            </div>
        );
    }
}