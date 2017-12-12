import React from 'react';
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
  state = { options, title: '', description: '' };

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    });
  };

  handleChange = (e, { value }) => {
    this.setState({ currentValues: value, error: value.length >= 5 });
  };

  handleOnTitleChange = e => {
    this.setState({
      title: e.target.value,
    });
  };

  handleOnDescriptionChange = e => {
    this.setState({
      description: e.target.value,
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { title, description, currentValues } = this.state;
    console.log(currentValues);
    // this.props.onSubmit({ title, description, })
  };

  render() {
    const { children } = this.props;
    const { currentValues, options, error } = this.state;
    return (
      <Modal trigger={children}>
        <Modal.Header>New topic</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleOnSubmit}>
            <Form.Field>
              <Input placeholder="Title" onChange={this.handleOnTitleChange} />
            </Form.Field>
            <Form.Field>
              <textarea
                placeholder="Description"
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
                value={currentValues}
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
