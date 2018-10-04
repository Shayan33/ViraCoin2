import React, { Component } from 'react';
import { Footer } from './Footer/Footer'
export class Layout extends Component {
  displayName = Layout.name
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      {this.props.children}
      <Footer />
    </div>);
  }
}
