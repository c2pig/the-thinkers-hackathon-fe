import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Header } from 'semantic-ui-react';
import JobDescriptionCard from 'components/JobDescriptionCard/JobDescriptionCard';
import DropMessage from 'components/DropMessage/DropMessage';

const ModalTriggerContainer = ({ job, message }) => (
  <div style={{margin: '1em 0'}}>
    {message && <DropMessage msg={message} />}
    <JobDescriptionCard onClick={this.handleOpen} {...job} />
  </div>
);

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
    const { job, message } = this.props;
    const { isModalOpen } = this.state;
    return (
      <Modal
        closeIcon
        open={isModalOpen}
        onClose={this.handleClose}
        trigger={<ModalTriggerContainer job={job} message={message} />}
      >
        <Modal.Header>{job.jobTitle}</Modal.Header>
        <Modal.Content>
          <Header as="h2">Job Description</Header>
          <Modal.Description
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default JobDetailsModal;
