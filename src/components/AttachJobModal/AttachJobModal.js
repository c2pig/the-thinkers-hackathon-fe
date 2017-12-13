import React from 'react';
import { Button, Modal, Form, List } from 'semantic-ui-react';
import JobDescriptionCard from 'components/JobDescriptionCard/JobDescriptionCard';
import styles from './AttachJobModal.css';

const listOfJobs = [
  {
    jobTitle: 'Software Engineer',
    company: 'A-Z company',
    tags: ['react', 'javascript'],
  },
  {
    jobTitle: 'Software Engineer',
    company: 'A-Z company',
    tags: ['react', 'javascript'],
  },
  {
    jobTitle: 'Software Engineer',
    company: 'A-Z company',
    tags: ['react', 'javascript'],
  },
  {
    jobTitle: 'Software Engineer',
    company: 'A-Z company',
    tags: ['react', 'javascript'],
  },
  {
    jobTitle: 'Software Engineer',
    company: 'A-Z company',
    tags: ['react', 'javascript'],
  },
];

const mockJobstreetJob = {
  jobTitle: 'Front-End Engineer',
  company: 'SEEK International - Global Delivery Pod',
  tags: ['react', 'javascript', 'nodeJS', 'ES6'],
};

class AttachJobModal extends React.Component {
  state = {
    isModalOpen: false,
    jobs: listOfJobs,
  }

  handleOpen = () => {
    this.setState({
      isModalOpen: true,
    });
  }

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  handleOnJob = (id) => {
    this.handleClose();
  }

  handleOnAttachJobLink = (e) => {
    console.log('called');
    e.preventDefault();
    this.setState({
      jobs: [...this.state.jobs, mockJobstreetJob],
    });
  }

  render() {
    const { isModalOpen } = this.state;
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Attach a Job</Button>}
        open={isModalOpen}
        closeIcon
        onClose={this.handleClose}
      >
        <Modal.Header>Please select a job to attach</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <List
              selection
              verticalAlign="middle"
              className={styles.scrollDesc}
            >
              {listOfJobs.map((job, index) => (
                <List.Item
                  key={index}
                  onClick={() => this.handlePeopleOnClick(index)}
                >
                  <JobDescriptionCard key={index} {...job} />
                </List.Item>
              ))}
              <br />
            </List>
            <div className={styles.addNewJobContainer}>
              <Form className={styles.newJobForm} onSubmit={this.handleOnAttachJobLink}>
                <div className={styles.jobLinkInputContainer}>
                  <Form.Field>
                    <input placeholder="Paste a job link here" />
                  </Form.Field>
                </div>
                <div className={styles.addNewJobButtonContainer}>
                  <Button icon="linkify" type="submit" onClick={this.handleOnAttachJobLink} />
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
