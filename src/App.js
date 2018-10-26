import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import BoardBuilder from './Container/BoardBuilder';
import Board from './Container/Board';
import {withRouter, Route, Switch, Link} from 'react-router-dom';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.getBoards();
  }
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

const mapDispatchToProps = dispatch => {
  return {
    getBoards:()=> dispatch(actions.getBoards())
  };
};



export default withRouter(connect(null,mapDispatchToProps)(App));
