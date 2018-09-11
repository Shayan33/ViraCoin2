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
import history from './components/history';
export default class App extends Component {
  displayName = App.name

  render() {
    return (
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
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}
