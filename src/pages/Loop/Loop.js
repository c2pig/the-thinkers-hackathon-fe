import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Label,
  Item,
  Segment,
  Button,
  Icon,
  Card,
  Divider,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import ReplyPanel from 'components/ReplyPanel/ReplyPanel';
import CloseLoopModal from 'components/CloseLoopModal/CloseLoopModal';
import UserComment from 'components/UserComment/UserComment';
import {
  STATUS_OPEN,
  attachJobMessage,
  attachContactMessage,
} from 'store/loops';
import { getUsersData } from 'store/modules';
import mockJobs, { mockJobstreetJob } from 'common/mocks/jobs';
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
    users: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      jobs: mockJobs,
      likes: {},
      isViewProfileClicked: false,
    };
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

  handleViewProfileOnClicked = () => {
    const { isViewProfileClicked } = this.state;
    this.setState({
      isViewProfileClicked: !isViewProfileClicked,
    });
  };

  getQuestioner = () => {
    const { users, loop } = this.props;
    return users[loop.username];
  };

  getExperienceDetails = (type, events) => {
    let num = 0;
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === type) {
        num = num + 1;
      }
    }
    switch (type) {
      case 'work':
        if (num > 1) {
          return num + ' different organizations';
        } else if (num > 0) {
          return num + ' organization';
        } else {
          return 'none';
        }
      case 'certificate':
        if (num > 1) {
          return num + ' certifications';
        } else if (num > 0) {
          return num + ' certification';
        } else {
          return 'none';
        }
      case 'achievement':
        if (num > 1) {
          return num + ' achievements';
        } else if (num > 0) {
          return num + ' achievement';
        } else {
          return 'none';
        }
      default:
        return 'unknown';
    }
  };

  getWorkingExperience = questioner => {
    let diffCompany = this.getExperienceDetails('work', questioner.events);
    if (questioner.yearsOfExperience > 1) {
      return questioner.yearsOfExperience + ' years with ' + diffCompany;
    } else if (questioner.yearsOfExperience > 0) {
      return questioner.yearsOfExperience + ' year with ' + diffCompany;
    } else {
      return 'none';
    }
  };

  handleOnAttachContact = () => {
    this.props.attachContactMessage(this.props.loop.id);
  };

  render() {
    const { user, loop } = this.props;
    const { jobs, isViewProfileClicked } = this.state;
    const { tags, comments } = loop;
    const questioner = this.getQuestioner();
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
            {!isViewProfileClicked && (
              <Button
                basic
                fluid
                color="blue"
                onClick={this.handleViewProfileOnClicked}
                // className={styles.profileBtn}
              >
                View questioner's profile summary
              </Button>
            )}
            {isViewProfileClicked && (
              <Button
                fluid
                color="blue"
                onClick={this.handleViewProfileOnClicked}
                // className={styles.profileBtn}
              >
                <Icon name="close" /> Close questioner's profile summary
              </Button>
            )}
            {isViewProfileClicked && (
              <Card fluid className={styles.profileContainer}>
                <Card.Content>
                  <Card.Header textAlign="center">Profile Summary</Card.Header>
                  <Divider />
                  <Card.Description>Position</Card.Description>
                  <Card.Meta>{questioner.position}</Card.Meta>
                  <Card.Description>Working Experience</Card.Description>
                  <Card.Meta>{this.getWorkingExperience(questioner)}</Card.Meta>
                  <Card.Description>Extra</Card.Description>
                  <Card.Meta>
                    <Icon name="trophy" />{' '}
                    {this.getExperienceDetails(
                      'achievement',
                      questioner.events
                    )}
                  </Card.Meta>
                  <Card.Meta>
                    <Icon name="bookmark" />{' '}
                    {this.getExperienceDetails(
                      'certificate',
                      questioner.events
                    )}
                  </Card.Meta>
                  <Card.Description>Requirements</Card.Description>
                  <Card.Meta>
                    {questioner.skills.map((req, index) => (
                      <Label key={index} size="small" color="blue">
                        {req}
                      </Label>
                    ))}
                  </Card.Meta>
                </Card.Content>
              </Card>
            )}
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
    users: getUsersData(states),
  };
};

export default connect(mapStateToProps, {
  attachJobMessage,
  attachContactMessage,
})(Loop);
