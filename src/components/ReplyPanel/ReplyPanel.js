import React from 'react';
import { Segment, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { DROP_MESSAGE } from 'store/loops';

const mapDispatchToProps = dispatch => {
  return {
    dropMessage: data => {
      dispatch({
        type: DROP_MESSAGE,
        payload: {
          loopId: 1,
          message: data.message,
          postType: 'drop-message'
        }
      });
      dispatch(reset('dropMessageForm'));
    }
  };
};

let MessageForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input fluid action={{ color: 'teal', icon: 'arrow right' }}>
        <Field name="message" component="input" placeholder="leave a message" />
        <Button color="teal" icon="arrow right" />
      </Form.Input>
    </Form>
  );
};

MessageForm = reduxForm({ form: 'dropMessageForm' })(MessageForm);

const ReplyPanel = ({ dropMessage }) => {
  return (
    <Segment vertical textAlign="center">
      <MessageForm onSubmit={dropMessage} />
      <Divider horizontal>Or</Divider>
      <Button.Group fluid>
        <Button>Attach a Job</Button>
        {/* <Button.Or /> */}
        <Button positive>Left my contact</Button>
      </Button.Group>
    </Segment>
  );
};

export default connect(null, mapDispatchToProps)(ReplyPanel);
