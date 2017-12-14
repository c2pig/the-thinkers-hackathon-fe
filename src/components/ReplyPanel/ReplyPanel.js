import React from 'react';
import { Segment, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import AttachJobModal from 'components/AttachJobModal/AttachJobModal';
import { DROP_MESSAGE } from 'store/loops';
import { getCurrentUser, getUserDetailsWithUsername } from 'store/modules';
import { extractTagsByUserName } from 'common/helpers';
import { QUEUE_NOTIFICATION } from 'store/notification';

let MessageForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input fluid>
        <Field
          name="message"
          component="input"
          placeholder="Leave a quick message"
          style={{ marginRight: '10px' }}
        />
        <Button color="blue" icon="arrow right" />
      </Form.Input>
    </Form>
  );
};

MessageForm = reduxForm({ form: 'dropMessageForm' })(MessageForm);

const ReplyPanel = ({
  submitMessage,
  onAttachJobCard,
  onAttachJobLink,
  onAttachContact,
  jobs
}) => {
  return (
    <Segment vertical textAlign="center">
      <div style={{ marginBottom: '15px' }}>
        <MessageForm onSubmit={submitMessage} />
      </div>
      <Button.Group fluid>
        <AttachJobModal
          onAttachJobCard={onAttachJobCard}
          onAttachJobLink={onAttachJobLink}
          jobs={jobs}
        />
        {/* <Button.Or /> */}
        <Button color="blue" onClick={onAttachContact}>
          Leave my contact
        </Button>
      </Button.Group>
    </Segment>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    dropMessage: (data, state) => {
      const regex = /@(.+?)(?:\s|$)/g;
      const mentioned = [];
      let m;
      while ((m = regex.exec(data.message)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        mentioned.push(m[1]);
      }
      const username = getCurrentUser(state.reduxState);
      const commentUserDetails = getUserDetailsWithUsername(state.reduxState)(
        username
      );
      dispatch({
        type: DROP_MESSAGE,
        payload: {
          loopId: props.loopId,
          message: data.message,
          postType: 'drop-message',
          username,
          date: new Date().toString(),
          totalHired: commentUserDetails.peopleHired,
          tags: extractTagsByUserName(username)
        }
      });
      mentioned.forEach(mentionedUser => {
        setTimeout(
          () =>
            dispatch({
              type: QUEUE_NOTIFICATION,
              payload: {
                notification: {
                  sender: state.user.username,
                  receiver: mentionedUser,
                  message: `${state.user.username} mentioned you in a topic`,
                  url: `/loop/${props.loopId}`
                }
              }
            }),
          1000
        );
      });

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
    user: state.user,
    reduxState: state
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ReplyPanel
);
