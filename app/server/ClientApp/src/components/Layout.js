import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Glyphicon } from 'react-bootstrap';
import {Footer} from './Footer';
export class Layout extends Component {
  displayName = Layout.name
  constructor(props) {
    super(props);
    this.state = { MainNetID: "1" };
  }
  CheckWeb3() {
    if (typeof window.web3 !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }
  CheckMainNet() {
    if (window.web3.version.network === this.state.MainNetID) {
      return true;
    } else {
      return false;
    }
  }
  CheckOnline() {
    return window.web3.isConnected();
  }
  render() {
    let Content = this.CheckWeb3() ? this.CheckMainNet() ? this.CheckOnline() ?
      <div>
        {this.props.children}
      </div> :
      <div>
        <h1 className="text-danger text-center" >
          <Glyphicon glyph="off" style={{ paddingTop: '20px', fontSize: '130px' }} />
        </h1>
        <h1>
          <p className="text-danger text-center">
            You are not connected to the network!!!
        </p>
        </h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div> :
      <div>
        <h1 className="text-danger text-center" >
          <Glyphicon glyph="warning-sign" style={{ paddingTop: '20px', fontSize: '130px' }} />
        </h1>
        <h1>
          <p className="text-danger text-center">
            Please switch to main ethereum network!!!
        </p>
        </h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div> :
      <div>
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>;
    return (
      <div>
        <NavMenu />
        {Content}
        <Footer />
      </div>
    );
  }
}
