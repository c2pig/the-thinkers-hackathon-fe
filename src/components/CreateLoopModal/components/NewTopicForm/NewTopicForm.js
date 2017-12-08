import React from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import TagInput from '../TagInput/TagInput';

const NewTopicForm = () => (
  <Form>
    <Form.Field>
      <input placeholder="Topic" />
    </Form.Field>
    <Form.Field>
      <textarea placeholder="Description" />
    </Form.Field>
    <Form.Field>
      <TagInput />
    </Form.Field>
    <Button type="submit">Submit</Button>
  </Form>
);

export default NewTopicForm;
