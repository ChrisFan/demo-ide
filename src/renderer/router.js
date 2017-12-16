import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import MainPage from './components/Main';

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Router>
  );
}
