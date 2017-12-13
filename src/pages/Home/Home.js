import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Statistic,
  Divider,
  Icon,
  Grid,
  Checkbox,
  Button,
  Label,
  Card,
  Form,
} from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoopListData } from 'store/modules';
import { searchLoops, addLoop } from 'store/loopList';
import { upVote, downVote } from 'store/loops';
import CreateLoopModal from 'components/CreateLoopModal/CreateLoopModal';
import { STATUS_CLOSED, STATUS_OPEN } from 'store/loops';

import styles from './Home.css';

let SearchForm = ({
  isCreateTopicModalOpen,
  onCreateTopicSubmit,
  onCreateLoopModalClose,
  onLoopModalOpen,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.searchContainer}>
        <div className={styles.inputContainer}>
          <Form.Input fluid>
            <Field
              name="searchKeywords"
              component="input"
              placeholder="Search or add a loop title here"
            />
          </Form.Input>
        </div>
        <div className={styles.inputButtonContainer}>
          <Button icon="search" type="submit" onClick={handleSubmit} />
          <CreateLoopModal
            onSubmit={onCreateTopicSubmit}
            open={isCreateTopicModalOpen}
            onClose={onCreateLoopModalClose}
          >
            <Button icon="plus" onClick={onLoopModalOpen} />
          </CreateLoopModal>
        </div>
      </div>
    </Form>
  );
};

SearchForm = reduxForm({ form: 'searchList' })(SearchForm);

const Topic = ({ topic, tags, id, status, description, rating }) => {
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
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </div>
      </Card.Content>
    </Card>
  );
};

class Home extends React.Component {
  static propTypes = {
    loops: PropTypes.array.isRequired,
    searchLoops: PropTypes.func.isRequired,
  };

  state = {
    isCreateTopicModalOpen: false,
    myTopic: false,
  };

  toggleMyTopic = () => {
    this.setState({
      myTopic: !this.state.myTopic,
    });
  };

  handleOnCreateTopicSubmit = payload => {
    this.setState({
      isCreateTopicModalOpen: false,
    });
    this.props.addLoop({ ...payload, username: this.props.user.username });
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
  };

  whenUpVote = payload => {
    this.props.upVote({ ...payload, username: this.props.user.username });
  };

  whenDownVote = payload => {
    this.props.downVote({ ...payload, username: this.props.user.username });
  };

  VoteTopic = ({ children, rating, id }) => {
    return (
      <Grid>
        <Grid.Column width="1" className={styles.voteGroup}>
          <Grid.Row className={styles.voteButton}>
            <Icon
              size="large"
              name="chevron up"
              onClick={() => {
                this.whenUpVote({ rating, id });
              }}
            />
          </Grid.Row>
          <Grid.Row>
            <Icon
              size="large"
              name="chevron down"
              onClick={() => {
                this.whenDownVote({ rating, id });
              }}
            />
          </Grid.Row>
          <Divider hidden />
          <Grid.Row>
            <Statistic size="mini" floated="left">
              <Statistic.Value>{rating}</Statistic.Value>
            </Statistic>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width="14">{children}</Grid.Column>
      </Grid>
    );
  };

  render() {
    const { loops, user, searchLoops } = this.props;
    const { isCreateTopicModalOpen, myTopic } = this.state;
    const VoteTopic = this.VoteTopic;
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
                (myTopic && loop.username === user.username)) && (
                <VoteTopic {...loop}>
                  <Topic key={loop.topic} {...loop} />
                </VoteTopic>
              )
          )}
        </div>
        <div className={styles.footerContainer}>
          <SearchForm
            isCreateTopicModalOpen={isCreateTopicModalOpen}
            onCreateTopicSubmit={this.handleOnCreateTopicSubmit}
            onCreateLoopModalClose={this.hideCreateLoopModal}
            onLoopModalOpen={this.showCreateLoopModal}
            onSubmit={searchLoops}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      loops: getLoopListData(state),
      user: state.user,
    }),
    {
      searchLoops,
      addLoop,
      upVote,
      downVote,
    }
  )(Home)
);
