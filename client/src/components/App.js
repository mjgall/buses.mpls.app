import React from 'react';
import './Home.css';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Menu from './Menu';
import history from '../history';
import * as actions from '../actions/index'

class App extends React.Component {


  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="ui main container">
        <Router history={history}>
          <Menu />
          <Switch>
            <Route component={Home} path="/" exact />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
   };
}

export default connect(
  mapStateToProps, actions
)(App);
