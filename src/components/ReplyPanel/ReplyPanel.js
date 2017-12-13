import React from 'react';
import { Segment, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import AttachJobModal from 'components/AttachJobModal/AttachJobModal';
import { DROP_MESSAGE } from 'store/loops';
import { QUEUE_NOTIFICATION } from 'store/notification';

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

const ReplyPanel = ({
  submitMessage,
  onAttachJobCard,
  onAttachJobLink,
  jobs
}) => {
  return (
    <Segment vertical textAlign="center">
      <MessageForm onSubmit={submitMessage} />
      <Divider horizontal>Or</Divider>
      <Button.Group fluid>
        <AttachJobModal
          onAttachJobCard={onAttachJobCard}
          onAttachJobLink={onAttachJobLink}
          jobs={jobs}
        />
        {/* <Button.Or /> */}
        <Button positive>Left my contact</Button>
      </Button.Group>
    </Segment>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    dropMessage: (data, state) => {
      dispatch({
        type: DROP_MESSAGE,
        payload: {
          loopId: props.loopId,
          message: data.message,
          postType: 'drop-message',
          username: state.user.username
        }
      });
      setTimeout(
        () =>
          dispatch({
            type: QUEUE_NOTIFICATION,
            payload: {
              notification: {
                sender: state.user.username,
                receiver: 'kong',
                message: `${state.user.username} mentioned you in a topic`,
                url: `/loop/${props.loopId}`
              }
            }
          }),
        1000
      );

      dispatch(reset('dropMessageForm'));
    }
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    submitMessage: data => {
      dispatchProps.dropMessage(data, stateProps);
    },
    ...ownProps
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
