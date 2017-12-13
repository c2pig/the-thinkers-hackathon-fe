import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Message,
  Card,
  Icon,
  Label,
  Comment,
  Item,
  Segment,
  Divider,
} from 'semantic-ui-react';

import ReplyPanel from 'components/ReplyPanel/ReplyPanel';
import CloseLoopModal from 'components/CloseLoopModal/CloseLoopModal';
import { connect } from 'react-redux';
import mockComments from 'common/mocks/comments';
import mockJobs, { mockJobstreetJob } from 'common/mocks/jobs';
import { getHighestRatingTagName, getRelatedTag } from 'common/helpers';
import { attachJobMessage } from 'store/loops';
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

const ContactMe = ({ headline, description, phone, email }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Meta>I am talent warrior</Card.Meta>
        <Card.Description>asdfasdfasdf</Card.Description>
      </Card.Content>
      <Card.Content>
        <Icon name="mail outline" />
        {email}
        <Icon name="phone" />
        {phone}
      </Card.Content>
    </Card>
  );
};

const DropMessage = ({ msg }) => {
  return <Message>{msg}</Message>;
};

const PostJD = ({ jobTitle, company, tags }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{jobTitle}</Card.Header>
        <Card.Meta>{company}</Card.Meta>
        {tags.map(({ tag }, i) => {
          return <Label key={'label-' + i}>{tag}</Label>;
        })}
      </Card.Content>
    </Card>
  );
};

const Tags = ({ tags }) => {
  return (
    <Label.Group>{tags.map((x, i) => <Label key={i}>{x}</Label>)}</Label.Group>
  );
};

const UserComment = ({ comments, topicTags }) => {
  return (
    <Comment.Group size="small">
      {comments.map(
        (
          {
            postType,
            username,
            date,
            message,
            totalHired,
            headline,
            phone,
            email,
            tags,
            job,
          },
          i
        ) => {
          const { tag, rating } = getHighestRatingTagName(
            getRelatedTag(...tags, topicTags),
            topicTags
          );
          return (
            <Comment key={'comment-i' + i}>
              <Comment.Avatar as="a" src={`/${username}.jpg`} />
              <Comment.Content>
                <Comment.Author as="a">{username}</Comment.Author>
                <Comment.Metadata>
                  <span>{date}</span>
                </Comment.Metadata>
              </Comment.Content>
              {tag && (
                <Label>
                  {tag}
                  <Label.Detail>{rating}</Label.Detail>
                </Label>
              )}
              <Label>
                <Icon name="user" />
                {totalHired} Hired
              </Label>
              <Icon name="thumbs outline up" />
              {postType === 'contact-me' && (
                <ContactMe
                  headline={headline}
                  description={message}
                  phone={phone}
                  email={email}
                />
              )}
              {postType === 'drop-message' && <DropMessage msg={message} />}
              {postType === 'post-jd' && (
                <PostJD
                  {...job}
                />
              )}
              <Divider hidden />
            </Comment>
          );
        }
      )}
    </Comment.Group>
  );
};

class Loop extends React.Component {
  static propTypes = {
    attachJobMessage: PropTypes.func.isRequired,
    loop: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { open: false, jobs: mockJobs };
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

  render() {
    const { user, loop } = this.props;
    const { jobs } = this.state;
    const { tags } = loop;
    const comments = [...mockComments, ...(this.props.loop.comments || [])];
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
          height: '100vh',
        }}
      >
        {user.username &&
          user.username === loop.username && (
            <Container className={styles.closeLoopContainer}>
              <Segment vertical>
                <CloseLoopModal responders={responders} loop={loop} />
              </Segment>
            </Container>
          )}
        <Container
          style={{
            overflowY: 'auto',
            padding: '0 2px',
          }}
        >
          <Segment vertical>
            <Topic {...topic} />
          </Segment>
          <UserComment comments={comments} topicTags={topic.tags} />
        </Container>
        <Container className={styles.replyPanelContainer}>
          <ReplyPanel
            loopId={this.props.loop.id}
            onAttachJobCard={this.handleOnAttachJobCard}
            onAttachJobLink={this.handleOnAttachJobLink}
            jobs={jobs}
          />
        </Container>
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
  attachJobMessage
})(Loop);
