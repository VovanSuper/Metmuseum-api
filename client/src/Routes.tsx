/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Slides from './components/Slides';
import ObjectData from './components/ObjectData';

export default () => (
  <Router>
    <Switch>
      <Route path="/" render={() => <Redirect to="/slides" />} exact />
      <Route path="/slides">
        <Slides />
      </Route>
      <Route path="/object/:id">
        <ObjectData />
      </Route>
    </Switch>
  </Router>
);