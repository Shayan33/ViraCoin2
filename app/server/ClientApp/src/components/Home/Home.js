import React, { Component } from 'react';
import './Home.css';
export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div className="HomePage container">
        <h1>Home</h1>
      </div>
    );
  }
}
