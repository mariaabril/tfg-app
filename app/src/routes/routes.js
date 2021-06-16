import React from 'react';
import { Route, Switch } from 'react-router-dom';
//import App from '../pages/App';
import Main from "../components/main/Main";
import Charts from "../components/charts/Charts";

const Routes = (params) => {

  return (
    <Switch>
      <Route 
        exact path="/"
        render={() => (<Main {...params} />)} />
      <Route
        path="/Charts"
        render={() => (<Charts {...params} />)} />
    </Switch>
  );
};

export default Routes;
