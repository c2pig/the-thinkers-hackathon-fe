import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label, Item, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import CloseLoopModal from 'components/CloseLoopModal/CloseLoopModal';
import ReplyPanel from 'components/ReplyPanel/ReplyPanel';
import UserComment from 'components/UserComment/UserComment';
import mockJobs, { mockJobstreetJob } from 'common/mocks/jobs';
import {
  STATUS_OPEN,
  attachJobMessage,
  attachContactMessage,
} from 'store/loops';

import styles from './Loop.css';

const Topic = ({ description, tags, headline }) => {
  return (
    <Item.Group>
      <Item style={{ margin: '0' }}>
        <Item.Content>
          <Item.Header as="a" style={{ marginBottom: '10px' }}>
            {headline}
          </Item.Header>
          <Tags tags={tags} />
          <Item.Description>
            <p>{description}</p>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

const Tags = ({ tags }) => {
  return (
    <Label.Group>{tags.map((x, i) => <Label key={i}>{x}</Label>)}</Label.Group>
  );
};

class Loop extends React.Component {
  static propTypes = {
    attachJobMessage: PropTypes.func.isRequired,
    attachContactMessage: PropTypes.func.isRequired,
    loop: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { open: false, jobs: mockJobs, likes: {} };
  }

  close = () => this.setState({ open: false });

  handleOnAttachJobLink = e => {
    e.preventDefault();
    this.setState({
      jobs: [...this.state.jobs, mockJobstreetJob],
    });
  };

  handleOnAttachJobCard = id => {
    const { loop } = this.props;
    const { jobs } = this.state;
    this.props.attachJobMessage(loop.id, jobs[id]);
  };

  handleOnAttachContact = () => {
    this.props.attachContactMessage(this.props.loop.id);
  }

  render() {
    const { user, loop } = this.props;
    const { comments } = loop;
    const { jobs } = this.state;
    const { tags } = loop;
    const _this = this;
    const responders = comments
      .map(comment => {
        return {
          avatar: `/${comment.username}.jpg`,
          username: comment.username,
        };
      })
      .filter((obj, pos, arr) => {
        return (
          (obj.username !== user.username &&
            arr.map(mapObj => mapObj['username']).indexOf(obj['username'])) ===
          pos
        );
      });

    const topic = {
      description: this.props.loop.description,
      tags: tags,
      headline: this.props.loop.topic,
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Container
          className={styles.loopContainer}
          style={{
            overflowY: 'auto',
            padding: '0 2px',
          }}
        >
          {user.username &&
            user.username === loop.username && (
              <Segment
                vertical
                textAlign="center"
                className={styles.closeLoopContainer}
              >
                {(loop.status === STATUS_OPEN && (
                  <CloseLoopModal responders={responders} loop={loop} />
                )) || <strong>Topic Closed</strong>}
              </Segment>
            )}
          <Segment vertical>
            <Topic {...topic} />
          </Segment>
          <UserComment
            comments={comments}
            topicTags={topic.tags}
            parentContext={_this}
          />
        </Container>
        {loop.status === STATUS_OPEN && (
          <Container className={styles.replyPanelContainer}>
            <ReplyPanel
              loopId={this.props.loop.id}
              onAttachJobCard={this.handleOnAttachJobCard}
              onAttachJobLink={this.handleOnAttachJobLink}
              onAttachContact={this.handleOnAttachContact}
              jobs={jobs}
            />
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = (states, props) => {
  return {
    loop: states.loops.data[props.match.params.loopId],
    user: states.user,
  };
};

export default connect(mapStateToProps, {
  attachJobMessage,
  attachContactMessage,
})(Loop);
