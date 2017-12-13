import React from 'react';
import {
  Container,
  Message,
  Card,
  Icon,
  Label,
  Comment,
  Item,
  Segment,
  Button,
  Divider
} from 'semantic-ui-react';

import ReplyPanel from 'components/ReplyPanel/ReplyPanel';
import CloseLoopModal from 'components/CloseLoopModal/CloseLoopModal';
import { connect } from 'react-redux';
import mockComments from 'common/mocks/comments';
import { Link } from 'react-router-dom';
import { STATUS_OPEN } from 'store/loops';
import UserComment from 'components/UserComment/UserComment';

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

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      likes: []
     };
  }

  close = () => this.setState({ open: false });

  render() {
    const { user, loop } = this.props;
    const { tags } = loop;
    const comments = [...mockComments, ...(this.props.loop.comments || [])];
    const responders = comments
      .map(comment => {
        return {
          avatar: `/${comment.username}.jpg`,
          username: comment.username
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
      headline: this.props.loop.topic
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh'
        }}
      >
        {user.username &&
          user.username === loop.username && (
            <Container textAlign="center">
              <Segment vertical>
                {(loop.status === STATUS_OPEN && (
                  <CloseLoopModal responders={responders} loop={loop} />
                )) || <strong>Topic Closed</strong>}
              </Segment>
            </Container>
          )}
        <Container
          style={{
            overflowY: 'auto',
            padding: '0 2px'
          }}
        >
          <Segment vertical>
            <Topic {...topic} />
          </Segment>
          <UserComment comments={comments} topicTags={topic.tags} parentState={this.state}/>
        </Container>
        <Container>
          <ReplyPanel loopId={this.props.loop.id} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (states, props) => {
  return {
    loop: states.loops.data[props.match.params.loopId],
    user: states.user
  };
};

export default connect(mapStateToProps)(Loop);
