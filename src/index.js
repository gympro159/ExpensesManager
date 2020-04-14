import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './screens/Home/Home';
import Radio from './screens/Radio/Radio';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
          path="/"
          exact
          render={props => <Home {...props} />} />
      <Route
          path="/radio-page"
          exact
          render={props => <Radio {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
