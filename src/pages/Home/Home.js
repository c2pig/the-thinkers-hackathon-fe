import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Button, Label, Card, Form } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoopListData } from 'store/modules';
import { searchLoops, updateSearchKeywords, addLoop } from 'store/loopList';
import CreateLoopModal from 'components/CreateLoopModal/CreateLoopModal';
import { STATUS_CLOSED, STATUS_OPEN } from 'store/loops';

import styles from './Home.css';

const Topic = ({ topic, tags, id, status }) => {
  const url = `/loop/${id}`;
  return (
    <Card fluid style={{ position: 'relative' }}>
      <Link
        to={url}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <Card.Content>
        <h3>
          {status === STATUS_CLOSED && (
            <Label color="red">{STATUS_CLOSED}</Label>
          )}
          {topic}
        </h3>
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
    updateSearchKeywords: PropTypes.func.isRequired
  };

  state = {
    isCreateTopicModalOpen: false,
    myTopic: false
  };

  toggleMyTopic = () => {
    this.setState({
      myTopic: !this.state.myTopic
    });
  };

  handleOnSearch = e => {
    e.preventDefault();
    this.props.searchLoops();
  };

  handleOnCreateTopicSubmit = payload => {
    this.setState({
      isCreateTopicModalOpen: false
    });
    this.props.addLoop({ ...payload, username: this.props.user.username });
  };

  showCreateLoopModal = () => {
    this.setState({
      isCreateTopicModalOpen: true
    });
  };

  hideCreateLoopModal = () => {
    this.setState({
      isCreateTopicModalOpen: false
    });
  };

  render() {
    const { loops, updateSearchKeywords, user } = this.props;
    const { isCreateTopicModalOpen, myTopic } = this.state;
    return (
      <div className={styles.rootContainer}>
        <div className={styles.headerContainer}>
          <h1>Loop List</h1>
          <Checkbox
            toggle
            label="My topic"
            checked={myTopic}
            onClick={this.toggleMyTopic}
          />
        </div>
        <div className={styles.cardsContainer}>
          {loops.map(
            loop =>
              ((!myTopic && loop.status === STATUS_OPEN) ||
                loop.username === user.username) && (
                <Topic key={loop.topic} {...loop} />
              )
          )}
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
      user: state.user
    }),
    {
      searchLoops,
      updateSearchKeywords,
      addLoop
    }
  )(Home)
);
