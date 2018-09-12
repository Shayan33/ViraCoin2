import React, { Component } from 'react';
import { Glyphicon, Col, Grid, Row } from 'react-bootstrap';
import './Admin.css';
import { CartAdmin } from './Cart/CartAdmin';
import { TokenAdmin } from './Token/TokenAdmin';
export class Admin extends Component {
    displayName = Admin.name
    constructor(props) {
        super(props);
        this.state = { ToknOrCart: 0 };
    }
    render() {
        let Content = <h1>None</h1>;
        if (this.state.ToknOrCart === 1) Content = <TokenAdmin />;
        else if (this.state.ToknOrCart === 2) Content = <CartAdmin />;
        else Content = <h1>None</h1>;
        return (
            <div>
                <button onClick={() => this.setState({ ToknOrCart: 1 })}>Token</button>
                <button onClick={() => this.setState({ ToknOrCart: 2 })}>Cart</button>
                {Content}
            </div>
        );
    }
}