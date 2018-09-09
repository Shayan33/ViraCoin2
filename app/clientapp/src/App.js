import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import './App.css';
import history from './components/history';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

class App extends Component {
  displayName = App.name
  render() {
    return (
      <Layout>
        <Router history={history}>
          <div>
            <Route exact path={Math.url} component={Home}/>
          </div>
        </Router>
      </Layout>
    );
  }
}

export default App;
