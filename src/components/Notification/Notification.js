import React from 'react';
import { connect } from 'react-redux';
import { Container, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { READ_NOTIFICATION, STATUS_UNREAD } from 'store/notification';

const Notification = ({ handleClose, notification }) => {
  return (
    <div>
      {notification && (
        <Container style={{ position: 'fixed', bottom: '15px', right: '15px' }}>
          <Segment style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to={notification.url}>
              <div
                style={{ marginRight: '10px' }}
                onClick={() => {
                  handleClose(notification.id);
                }}
              >
                {notification.message}
              </div>
            </Link>
            <div>
              <Button
                icon="close"
                size="mini"
                onClick={() => {
                  handleClose(notification.id);
                }}
              />
            </div>
          </Segment>
        </Container>
      )}
    </div>
  );
};

const getUserNotification = (notifications, username) => {
  const item = notifications
    .filter(item => {
      return item.status == STATUS_UNREAD;
    })
    .filter((item, index, arr) => {
      return (
        item.receiver === username &&
        arr.map(obj => obj.receiver).indexOf(item.receiver) === index
      );
    });
  if (item.length) return { ...item[0] };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleClose: queueId => {
      dispatch({
        type: READ_NOTIFICATION,
        payload: {
          queueId
        }
      });
    }
  };
};

const mapStateToProps = state => {
  return {
    notification: getUserNotification(
      state.notification.queue,
      state.user.username
    )
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
