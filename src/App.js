import React, { Component } from 'react';
import './App.css';
import BoardBuilder from './Container/BoardBuilder';
import Board from './Container/Board';
import {withRouter, Route, Switch, Link} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <div className="container">
        <header className="text-center m-4 p-4">
          <Link to="/">
            <div className="logo p-2">
              <i className="fab fa-angrycreative fa-3x"></i>
            </div>
          </Link>
        </header>
        <Switch>
          <Route path="/" exact component={BoardBuilder} />
          <Route path="/b/:id" component={Board} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
