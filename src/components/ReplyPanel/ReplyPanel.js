import React from 'react';
import { Segment, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { DROP_MESSAGE } from 'store/loops';

let MessageForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input fluid>
        <Field name="message" component="input" placeholder="leave a message" />
        <Button color="teal" icon="arrow right" />
      </Form.Input>
    </Form>
  );
};

MessageForm = reduxForm({ form: 'dropMessageForm' })(MessageForm);

const ReplyPanel = ({ submitMessage }) => {
  return (
    <Segment vertical textAlign="center">
      <MessageForm onSubmit={submitMessage} />
      <Divider horizontal>Or</Divider>
      <Button.Group fluid>
        <Button>Attach a Job</Button>
        {/* <Button.Or /> */}
        <Button positive>Left my contact</Button>
      </Button.Group>
    </Segment>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    dropMessage: (data, state) => {
      console.log(state);
      dispatch({
        type: DROP_MESSAGE,
        payload: {
          loopId: props.loopId,
          message: data.message,
          postType: 'drop-message',
          username: state.user.username
        }
      });
      dispatch(reset('dropMessageForm'));
    }
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    submitMessage: data => {
      dispatchProps.dropMessage(data, stateProps);
    }
  };
};

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ReplyPanel
);
