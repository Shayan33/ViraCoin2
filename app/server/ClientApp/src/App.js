import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home/Home';
import { NoMatch } from './components/NoMatch/NoMatch';
import history from './components/history';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <div>
        <div className='BackgroundImage'></div>
        <div className='Content'>
          <Layout>
            <Router history={history}>
              <Switch>
                <Route exact path={'/'} component={Home} />
                <Route component={NoMatch} />
              </Switch>
            </Router>
          </Layout>
        </div>
      </div>
    );
  }
}
