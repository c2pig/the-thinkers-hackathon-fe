import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Container } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Notification from 'components/Notification/Notification';
import Home from 'pages/Home/Home';
import Loop from 'pages/Loop/Loop';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';

class App extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh'
        }}
      >
        <Helmet>
          <title>The Thinker Hack 2017</title>
        </Helmet>
        <Header />
        <Container style={{ height: 'calc(100vh - 60px)', paddingTop: '1rem'}}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/loop/:loopId" component={Loop} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile/:username" component={Profile} />
          </Switch>
          <Notification />
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
