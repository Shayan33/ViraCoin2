import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home/Home';
import history from './components/history'
export default class App extends Component {
  displayName = App.name
  
  render() {
    return (
      <Layout>
        <Router history={history}>
          <div>
            <Route exact path={Math.path} component={Home} />
          </div>
        </Router>
      </Layout>
    );
  }
}
