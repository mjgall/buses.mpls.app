import React from 'react';

import BusCard from './Card';

import Quote from './Quote';
import { Grid } from 'semantic-ui-react';
import SelectorForm from './SelectorForm';
import { connect } from 'react-redux';

import { submitSelector } from '../actions';

class Home extends React.Component {
  
  onSubmit = (formInput, auth) => {
    this.props.submitSelector(formInput.input, auth);
  };

  render() {
    //turn user/non-user views into their own components
    //store default stop ids when user is not registered
    //store user stop ids
    return (
      <div>
        <div className="ui vertical segment">
          <SelectorForm
            onSubmit={values => this.onSubmit(values, this.props.auth)}
          />
          <Grid columns="equal">
            <Grid.Column />
            <Grid.Column width={8}>
              <Quote />
            </Grid.Column>
            <Grid.Column />
          </Grid>
          <div id="" className="ui centered cards">
            {this.props.buses.map((stop, index) => {
              return (
                <BusCard
                  stopId={stop.id}
                  location={stop.location}
                  key={index}
                  inArray={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { buses: state.selector.stops, auth: state.auth };
};

export default connect(
  mapStateToProps,
  { submitSelector }
)(Home);
