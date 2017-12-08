import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'LookingForJob', text: 'LookingForJob', value: 'LookingForJob' },
  {
    key: 'SoftwareEngineer',
    text: 'SoftwareEngineer',
    value: 'SoftwareEngineer'
  },
  { key: 'Accounting', text: 'Accounting', value: 'Accounting' },
  { key: 'BusinessAdmin', text: 'BusinessAdmin', value: 'BusinessAdmin' },
  { key: 'C++', text: 'C++', value: 'C++' }
];

class TagInput extends Component {
  state = { options };

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options]
    });
  };

  handleChange = (e, { value }) => {
    this.setState({ currentValues: value, error: value.length >= 5 });
  };

  render() {
    const { currentValues } = this.state;

    return (
      <Dropdown
        options={this.state.options}
        placeholder="Choose Languages"
        search
        selection
        fluid
        multiple
        allowAdditions
        value={currentValues}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
        error={this.state.error}
      />
    );
  }
}
export default TagInput;
