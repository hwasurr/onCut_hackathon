import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RegistStepper from './pages/Regist/Stepper';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard/layouts/DashboardLayout';
import * as serviceWorker from './serviceWorker';


const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Route exact path="/" component={Main} history={history} />
    <Route exact path="/regist" component={RegistStepper} />
    <Route path="/dashboard" component={Dashboard} history={history} />
  </Router>,

  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
