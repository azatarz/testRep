import React, { Component } from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import CreateAccount from './components/signup';
import LoginPage from './components/signin';
import searchbrand from './components/searchbybrand';

const Routes = (props) => (
 <Router {...props}>
   <Route path="/" component={App}>
       <Route path="/signup" component={CreateAccount} />
       <Route path="/signin" component={LoginPage} />
   <Route path="/searchbybrand" component={searchbrand} />
   </Route>
 </Router>
);
export default Routes;
