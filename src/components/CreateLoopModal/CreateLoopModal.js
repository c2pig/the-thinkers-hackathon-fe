import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Input, Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'LookingForJob', text: 'LookingForJob', value: 'LookingForJob' },
  {
    key: 'SoftwareEngineer',
    text: 'SoftwareEngineer',
    value: 'SoftwareEngineer',
  },
  { key: 'Accounting', text: 'Accounting', value: 'Accounting' },
  { key: 'BusinessAdmin', text: 'BusinessAdmin', value: 'BusinessAdmin' },
  { key: 'C++', text: 'C++', value: 'C++' },
];

class CreateLoopModal extends React.Component {
  propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  defaultProps = {
    open: false,
    onClose: () => {},
  };

  state = { options, topic: '', description: '', tags: [] };

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    });
  };

  handleChange = (e, { value }) => {
    this.setState({ tags: value, error: value.length >= 5 });
  };

  handleOnTopicChange = e => {
    this.setState({
      topic: e.target.value,
    });
  };

  handleOnDescriptionChange = e => {
    this.setState({
      description: e.target.value,
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { topic, description, tags } = this.state;
    this.props.onSubmit({ topic, description, tags });
    this.setState({
      topic: '',
      description: '',
      tags: [],
    })
  };

  render() {
    const { children, open, onClose } = this.props;
    const { tags, options, error } = this.state;
    return (
      <Modal trigger={children} open={open} onClose={onClose}>
        <Modal.Header>New topic</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleOnSubmit}>
            <Form.Field>
              <Input placeholder="Enter your topic here" onChange={this.handleOnTopicChange} />
            </Form.Field>
            <Form.Field>
              <textarea
                placeholder="Describe more about your topic"
                onChange={this.handleOnDescriptionChange}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                options={options}
                placeholder="Tags (Max 5)"
                search
                selection
                fluid
                multiple
                allowAdditions
                value={tags}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
                error={error}
              />
            </Form.Field>
            <Button type="submit" onClick={this.handleOnSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CreateLoopModal;
