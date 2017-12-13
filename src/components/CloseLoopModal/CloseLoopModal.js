import React from 'react';
import { Button, Image, Modal, List } from 'semantic-ui-react';
import shakeHand from './assets/shake-hand.jpg';
import styles from './CloseLoopModal.css';

export default class CloseLoopModal extends React.Component {
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

  handlePeopleOnClick(id) {
    console.log(id);
    this.handleClose();
  }

  render() {
    const { isModalOpen } = this.state;
    const responders = this.props.responders.map(responder => {
      return {
        ...responder,
        position: 'Graphic Designer',
        company: 'Linker Co.'
      };
    });
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
              {responders.map((person, index) => (
                <List.Item
                  key={index}
                  onClick={() => this.handlePeopleOnClick(index)}
                >
                  <Image avatar src={person.avatar} />
                  <List.Content>
                    <List.Header>{person.username}</List.Header>
                    {person.position}
                    <br />
                    <div className={styles.miniFont}>{person.company}</div>
                  </List.Content>
                </List.Item>
              ))}
              <br />
            </List>
            <Button fluid onClick={this.handleClose}>
              None :(
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
