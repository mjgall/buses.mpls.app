import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { submitSelector } from '../actions';

class Menu extends React.Component {
  renderAuthItems() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <a href="/auth/google" className="item">
            <div className="header">Log In</div>
          </a>
        );
      default:
        return (
          <React.Fragment>
            <div className="item">
              <a href="#">{this.props.auth.email}</a>
            </div>
            <a href="/api/logout" className="item">
              <div className="header">Log Out</div>
            </a>
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <div className="ui inverted menu fixed">
        <div className="ui container">
          <Link to="/" className="item">
            <div className="header">MPLS Buses</div>
          </Link>
          {this.renderAuthItems()}
          {this.props.balance && (
            <div className="item" id="balance-area">
              {this.props.balance}
            </div>
          )}
          <div className="right menu">
            <div />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buses: state.selector.stops,
    balance: state.selector.balance,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { submitSelector }
)(Menu);
