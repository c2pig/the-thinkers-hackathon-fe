import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import NewTopicForm from './components/NewTopicForm/NewTopicForm';

const CreateLoopModal = () => (
  <Modal trigger={<Button>Create Model</Button>}>
    <Modal.Header>New topic</Modal.Header>
    <Modal.Content>
      <NewTopicForm />
    </Modal.Content>
  </Modal>
);

export default CreateLoopModal;
