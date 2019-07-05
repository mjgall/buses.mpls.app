import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Form, Input, Popup } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';
import * as actions from '../actions';
import axios from 'axios';

//0160000209344452

class SelectorForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    return (
      <div className="field">
        <Input
          {...input}
          autoComplete="off"
          action="Submit"
          placeholder="Serial for balance or stop number"
        />
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
    if (formValues.input.length === 16) {
      this.props.saveSerial(formValues.input);
    }
  };

  saveSerialUser = async () => {
    await axios.post('/api/serial', {
      serial: this.props.selector.serial
    });
  };

  render() {
    if (this.props.auth && this.props.auth.serial) {
      this.props.fetchBalance(this.props.auth.serial);

      return (
        <Grid>
          <Grid.Column width={12}>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field name="input" component={this.renderInput} />
            </Form>
          </Grid.Column>
          <Grid.Column style={{ lineHeight: '2.5rem', fontSize: '2rem' }}>
            {this.props.balance}
          </Grid.Column>
        </Grid>
      );
    } else if (this.props.balance && this.props.auth) {
      return (
        <Grid>
          <Grid.Column width={12}>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field name="input" component={this.renderInput} />
            </Form>
          </Grid.Column>
          <Popup
            content="Click to save"
            trigger={
              <Grid.Column
                onClick={this.saveSerialUser}
                style={{
                  lineHeight: '2.5rem',
                  fontSize: '2rem',
                  cursor: 'pointer'
                }}>
                {this.props.balance}
              </Grid.Column>
            }
          />
        </Grid>
      );
    } else if (this.props.balance) {
      return (
        <Grid>
          <Grid.Column width={12}>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field name="input" component={this.renderInput} />
            </Form>
          </Grid.Column>
          <Grid.Column style={{ lineHeight: '2.5rem', fontSize: '2rem' }}>
            {this.props.balance}
          </Grid.Column>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Grid.Column width={16}>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field name="input" component={this.renderInput} />
            </Form>
          </Grid.Column>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    balance: state.selector.balance,
    form: state.form.SelectorForm,
    selector: state.selector,
    auth: state.auth
  };
};

SelectorForm = connect(
  mapStateToProps,
  actions
)(SelectorForm);

export default reduxForm({
  form: 'SelectorForm'
})(SelectorForm);
