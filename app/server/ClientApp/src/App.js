import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home/Home';
import { Account } from './components/Account/Account';
import { Inventory } from './components/Inventory/Inventory';
import { Item } from './components/Item/Item';
import { Search } from './components/Search/Search';
import { Submit } from './components/Submit/Submit';
import { Transactions } from './components/Transactions/Transactions';
import { NoMatch } from './components/NoMatch/NoMatch';
import { Admin } from './components/Admin/Admin';
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
                <Route path={'/Account'} component={Account} />
                <Route path={'/Inventory'} component={Inventory} />
                <Route path={'/Item/:ID'} component={Item} />
                <Route path={'/Search'} component={Search} />
                <Route path={'/Submit'} component={Submit} />
                <Route path={'/Transactions'} component={Transactions} />
                <Route path={'/Admin'} component={Admin} />
                <Route component={NoMatch} />
              </Switch>
            </Router>
          </Layout>
        </div>
      </div>
    );
  }
}
