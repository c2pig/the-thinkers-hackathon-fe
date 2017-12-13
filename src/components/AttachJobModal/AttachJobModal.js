import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, List } from 'semantic-ui-react';
import JobDescriptionCard from 'components/JobDescriptionCard/JobDescriptionCard';
import styles from './AttachJobModal.css';

class AttachJobModal extends React.Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    onAttachJobCard: PropTypes.func.isRequired,
    onAttachJobLink: PropTypes.func.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { jobs, onAttachJobCard, onAttachJobLink } = this.props;
    const { isModalOpen } = this.state;
    return (
      <Modal
        closeIcon
        open={isModalOpen}
        onClose={this.handleClose}
        trigger={<Button onClick={this.handleOpen}>Attach a Job</Button>}
      >
        <Modal.Header>Please select a job to attach</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <List
              selection
              verticalAlign="middle"
              className={styles.scrollDesc}
            >
              {jobs.map((job, index) => (
                <List.Item
                  key={index}
                  onClick={() => {
                    onAttachJobCard(index);
                    this.handleClose();
                  }}
                >
                  <JobDescriptionCard key={index} {...job} />
                </List.Item>
              ))}
              <br />
            </List>
            <div className={styles.addNewJobContainer}>
              <Form className={styles.newJobForm} onSubmit={onAttachJobLink}>
                <div className={styles.jobLinkInputContainer}>
                  <Form.Field>
                    <input placeholder="Paste a job link here" />
                  </Form.Field>
                </div>
                <div className={styles.addNewJobButtonContainer}>
                  <Button
                    icon="linkify"
                    type="submit"
                    onClick={onAttachJobLink}
                  />
                  <Button icon="plus" />
                </div>
              </Form>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AttachJobModal;
