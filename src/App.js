import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Container } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Home from 'pages/Home/Home';
import Loop from 'pages/Loop/Loop';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>The Thinker Hack 2017</title>
        </Helmet>
        <Header/>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/loop/:loopId" component={Loop} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile/:username" component={Profile} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
