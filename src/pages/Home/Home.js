import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Button, Label, Card, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoopListData } from 'store/modules';
import { searchLoops, updateSearchKeywords, addLoop } from 'store/loopList';
import CreateLoopModal from 'components/CreateLoopModal/CreateLoopModal';

import styles from './Home.css';

const Topic = ({ title, tags }) => {
  return (
    <Card fluid>
      <Card.Content>
        <h3>{title}</h3>
        <Label.Group>
          {tags.map(tag => <Label key={tag}>{tag}</Label>)}
        </Label.Group>
      </Card.Content>
    </Card>
  );
};

class Home extends React.Component {
  propTypes = {
    loops: PropTypes.array.isRequired,
    searchLoops: PropTypes.func.isRequired,
    updateSearchKeywords: PropTypes.func.isRequired,
  };

  state = {
    isCreateTopicModalOpen: false,
  };

  handleOnSearch = e => {
    e.preventDefault();
    this.props.searchLoops();
  };

  handleOnCreateTopicSubmit = payload => {
    this.setState({
      isCreateTopicModalOpen: false,
    });
    this.props.addLoop(payload);
  };

  showCreateLoopModal = () => {
    this.setState({
      isCreateTopicModalOpen: true,
    });
  };

  hideCreateLoopModal = () => {
    this.setState({
      isCreateTopicModalOpen: false,
    });
  }


  render() {
    const { loops, updateSearchKeywords } = this.props;
    const { isCreateTopicModalOpen } = this.state;
    return (
      <div className={styles.rootContainer}>
        <div className={styles.headerContainer}>
          <h1>Loop List</h1>
          <Checkbox toggle label="My topic" />
        </div>
        <div className={styles.cardsContainer}>
          {loops.map(topic => (
            <Topic key={topic.title} title={topic.title} tags={topic.tags} />
          ))}
        </div>
        <div className={styles.footerContainer}>
          <Form onSubmit={this.handleOnSearch}>
            <div className={styles.searchContainer}>
              <div className={styles.inputContainer}>
                <Form.Input
                  placeholder="Search or add a loop title here"
                  type="text"
                  fluid
                  onChange={event => updateSearchKeywords(event.target.value)}
                />
              </div>
              <div className={styles.inputButtonContainer}>
                <Button
                  icon="search"
                  type="submit"
                  onClick={this.handleOnSearch}
                />
                <CreateLoopModal
                  onSubmit={this.handleOnCreateTopicSubmit}
                  open={isCreateTopicModalOpen}
                  onClose={this.hideCreateLoopModal}
                >
                  <Button icon="plus" onClick={this.showCreateLoopModal} />
                </CreateLoopModal>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      loops: getLoopListData(state),
    }),
    {
      searchLoops,
      updateSearchKeywords,
      addLoop,
    }
  )(Home)
);
