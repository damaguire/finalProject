import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

import FileSignature from '../../ui/FileSignature';
import SigMetamask from '../../ui/SignWithMetamask';
import GenerateVC from '../../ui/GenerateVC';
import UserAdmin from '../../ui/UserAdmin';
import EditCollege from '../../ui/EditCollege';
import EditEmployer from '../../ui/EditEmployer';
import EditHealthcare from '../../ui/EditHealthcare';
import CircuitBreaker from '../../ui/CircuitBreaker';

export const renderRoutes = () => {
  return (
      <Router history={browserHistory}>
        <div>
          <Route exact path = "/" component = {FileSignature}/>
          <Route path = "/verify" component = {SigMetamask}/>
          <Route path = "/generate" component = {GenerateVC}/>
          <Route path = "/change" component = {UserAdmin}/>
          <Route path = "/degree" component = {EditCollege}/>
          <Route path = "/job" component = {EditEmployer}/>
          <Route path = "/healthcare" component = {EditHealthcare}/>
          <Route path = "/circuit" component = {CircuitBreaker}/>
        </div>
      </Router>
  )
}
