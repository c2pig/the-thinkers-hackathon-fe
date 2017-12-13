import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, List, Header } from 'semantic-ui-react';
import JobDescriptionCard from 'components/JobDescriptionCard/JobDescriptionCard';
import styles from './JobDetailsModal.css';

class JobDetailsModal extends React.Component {
  static propTypes = {
    job: PropTypes.object.isRequired,
    trigger: PropTypes.node.isRequired,
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
    const { job } = this.props;
    const { isModalOpen } = this.state;
    return (
      <Modal
        closeIcon
        open={isModalOpen}
        onClose={this.handleClose}
        trigger={<JobDescriptionCard onClick={this.handleOpen} {...job} />}
      >
        <Modal.Header>{job.jobTitle}</Modal.Header>
        <Modal.Content>
          <Header as="h2">Job Description</Header>
          <Modal.Description dangerouslySetInnerHTML={{__html: job.description}}></Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default JobDetailsModal;
