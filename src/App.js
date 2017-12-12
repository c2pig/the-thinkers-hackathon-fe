import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Container } from 'semantic-ui-react';

import Home from 'pages/Home/Home';
import Loop from 'pages/Loop/Loop';
import CloseLoopModal from 'pages/CloseLoopModal/CloseLoopModal';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>The Thinker Hack 2017</title>
        </Helmet>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/loop" component={Loop} />
            <Route exact path="/close" component={CloseLoopModal}/>
          </Switch>
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
