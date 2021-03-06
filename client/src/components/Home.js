import React from 'react';

import BusCard from './Card';

import Quote from './Quote';
import { Grid, Message } from 'semantic-ui-react';
import SelectorForm from './SelectorForm';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Home extends React.Component {
  state = { error: false };

  handleError = () => {
    this.setState({ error: true });
  };

  onSubmit = (formInput, auth) => {
    this.props.submitSelector(formInput.input, auth);
  };

  renderCards = () => {
    if (!this.props.auth) {
      return (
        <div id="" className="ui centered cards">
          {this.props.buses.map((stop, index) => {
            return (
              <BusCard
                handleError={this.handleError}
                stopId={stop.id}
                location={stop.location}
                key={index}
                inArray={index}
                type="default"
              />
            );
          })}
        </div>
      );
    } else if (this.props.auth) {
      return (
        <div id="" className="ui centered cards">
          {this.props.auth.stops.map((stop, index) => {
            return (
              <BusCard
                handleError={this.handleError}
                stopId={stop.id}
                location={stop.location}
                key={index}
                inArray={index}
                type="user"
              />
            );
          })}
        </div>
      );
    }
  };

  render() {
    //turn user/non-user views into their own components
    //store default stop ids when user is not registered
    //store user stop ids
    return (
      <div>
        { this.state.error ? (
          <Message negative>
          <Message.Header>There's something wrong with the Metro Transit API at the moment.</Message.Header>
          <p> Please try again later.</p>
        </Message>
   
        ) : (
          <div className="ui vertical segment">
            <SelectorForm
              onSubmit={(values) => this.onSubmit(values, this.props.auth)}
            />
            <Grid columns="equal">
              <Grid.Column />
              <Grid.Column width={12} style={{ textAlign: 'center' }}>
                <Quote />
              </Grid.Column>
              <Grid.Column />
            </Grid>
            {this.renderCards()}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { buses: state.selector.stops, auth: state.auth };
};

export default connect(mapStateToProps, actions)(Home);
