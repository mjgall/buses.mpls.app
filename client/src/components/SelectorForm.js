import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Input } from 'semantic-ui-react';

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
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)} style={{maxWidth: "50%", margin: "0 auto"}}>
        <Field name="input" component={this.renderInput} />
      </Form>
    );
  }
}

export default reduxForm({
  form: 'SelectorForm'
})(SelectorForm);
