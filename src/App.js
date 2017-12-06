import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import Home from 'pages/Home/Home';
import Loop from 'pages/Loop/Loop';

class App extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>The Thinker Hack 2017</title>
                </Helmet>
                <Header />
                <main>
                    <div>
                      <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/loop" component={Loop}/>
                      </Switch>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
