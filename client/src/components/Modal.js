import React from 'react';
import { Header, Modal, Input, Form, Button } from 'semantic-ui-react';

export default class UserModal extends React.Component {
  state = { value: '' };

  catchSubmit = () => {
    this.props.handleModalInput(this.state.value, false);
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <Modal open={this.props.modalOpen} basic size="mini">
        <Header icon="mail" content="Enter Email to Continue" />
        <Modal.Content>
          <Form onSubmit={this.catchSubmit}>
            <Input
              onChange={this.handleChange}
              placeholder={this.state.value}
            />
            <Button
              disabled={!/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
                this.state.value
              )}>
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
