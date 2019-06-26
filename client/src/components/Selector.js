import React from 'react';
import { Input, Form } from 'semantic-ui-react';

export default class Selector extends React.Component {
  state = { stops: [], value: '' };

  handleChange = e => {
    this.setState({ value: e.target.value });

  };

  handleSubmit = () => {

    this.props.handleSelectorSubmit(this.state.value);
  };

  render() {
    return (
      <div className="item">
        <Form className="centered" onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            action="Submit"
            placeholder="Serial for balance or stop number"
          />
        </Form>
      </div>
    );
  }
}
