import React, { Component } from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { Glyphicon } from 'react-bootstrap';
import history from '../history';
import { Web3s } from '../Web3/Web3';
import './Home.css';
import $ from 'jquery';

export class Home extends Component {
    displayName = Home.name;
    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.state = { scroll: false };
        window.onscroll = () => {
            if (window.pageYOffset > 50) this.setState({ scroll: true });
            else this.setState({ scroll: false });
        }
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
    render() {
        let ScNav = this.state.scroll ? "NavBar2" : "NavBar";
        let InnerScroll = this.state.scroll ? "NavItems2" : "NavItems1";
        let Content = Web3s.CheckWeb3() ? Web3s.CheckMainNet() ? Web3s.CheckOnline() ? (String(Web3s.GetAccount()) !== 'undefined') ?
            <div className="SendAndFunds">
                <text> 0.000 VC</text>
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
        return (
            <div>
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
                            <Link activeClass="active" to="faq" spy={true} smooth={true} duration={500} className="NavItem">
                                <Glyphicon glyph='question-sign' style={{ marginRight: '5px' }} />
                                FAQ
                </Link>
                            <Link activeClass="active" to="contact" spy={true} smooth={true} duration={500} className="NavItem">
                                <Glyphicon glyph='check' style={{ marginRight: '5px' }} />
                                Register for the ICO
                </Link>
                            {Content}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <Element name="home" className="element" >
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
                                    <button className="btn btn-primary btn-lg RegisterButton">Register for the ICO</button>
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
                    </Element>
                    <div className="Seperator"></div>
                    <Element name="about" className="element BaseComponentClass">
                        <button >an</button>
                    </Element>

                    <Element name="cp" className="element BaseComponentClass">
                        test 3
            </Element>

                    <Element name="ts" className="element BaseComponentClass">
                        test 4
            </Element>
                    <Element name="faq" className="element BaseComponentClass">
                        test 4
            </Element>

                    <Element name="contact" className="element BaseComponentClass">
                        test 4
            </Element>
                </div>
            </div>
        );
    }
}