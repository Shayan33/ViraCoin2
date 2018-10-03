import React, { Component } from 'react';

export class Layout extends Component {
  displayName = Layout.name
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      {this.props.children}
    </div>);
  }
}
