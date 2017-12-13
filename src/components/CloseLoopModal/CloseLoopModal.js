import React from 'react';
import { Button, Image, Modal, List } from 'semantic-ui-react';
import shakeHand from './assets/shake-hand.jpg';
import styles from './CloseLoopModal.css';
import { connect } from 'react-redux';
import { CLOSE_TOPIC } from 'store/loops';

class CloseLoopModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({
      isModalOpen: true
    });
  }

  handleClose() {
    this.setState({
      isModalOpen: false
    });
  }

  handleOnClickResponder(responderUsername) {
    this.props.closeTopic(responderUsername);
    this.handleClose();
  }

  render() {
    const { isModalOpen } = this.state;
    const { responders } = this.props;
    return (
      <Modal
        trigger={
          <Button
            onClick={this.handleOpen}
            fluid
            style={{
              backgroundColor: '#5d93ff',
              borderColor: '#5d93ff',
              color: 'white'
            }}
          >
            Close Topic
          </Button>
        }
        open={isModalOpen}
        closeIcon
        onClose={this.handleClose}
      >
        <Modal.Header>Which job you accepted ?</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="small" src={shakeHand} />
          <Modal.Description>
            <List
              selection
              verticalAlign="middle"
              className={styles.scrollDesc}
            >
              {responders.map((responder, index) => (
                <List.Item
                  key={index}
                  onClick={() =>
                    this.handleOnClickResponder(responder.username)
                  }
                >
                  <Image avatar src={responder.avatar} />
                  <List.Content>
                    <List.Header>{responder.username}</List.Header>
                    {responder.position}
                    <br />
                    <div className={styles.miniFont}>{responder.company}</div>
                  </List.Content>
                </List.Item>
              ))}
              <br />
            </List>
            <Button
              fluid
              onClick={() => {
                this.handleOnClickResponder();
              }}
            >
              None :(
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    closeTopic: responder => {
      dispatch({
        type: CLOSE_TOPIC,
        payload: {
          loopId: props.loop.id,
          closeTopicResponder: responder
        }
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(CloseLoopModal);
