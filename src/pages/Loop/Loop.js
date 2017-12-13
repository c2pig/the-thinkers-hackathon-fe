import React from 'react';
import {
  Container,
  Message,
  Card,
  Icon,
  Rating,
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

import { withRouter, Link } from 'react-router-dom';
import { getLoopsData } from 'store/modules';

const Profile = ({ description, tags, headline }) => {
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

const TextPost = () => {
  const text = 'Hello...You are so beautiful.  May i be your friend?';
  return (
    <Item.Group relaxed>
      <Item>
        <Item.Image size="small" src="/kong.jpg" />
        <Item.Content verticalAlign="middle">
          <Item.Header>Content A</Item.Header>
          <Item.Description>{text}</Item.Description>
          <Item.Extra>
            <Button floated="right">Action</Button>
          </Item.Extra>
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
        {tags.map((tag, i) => {
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

const UserComment = ({ comments }) => {
  return (
    <Comment.Group size="small">
      {comments.map(
        (
          {
            postType,
            username,
            date,
            message,
            rating,
            totalHired,
            headline,
            phone,
            email,
            tags
          },
          i
        ) => {
          return (
            <Comment key={'comment-i' + i}>
              <Comment.Avatar as="a" src="/kong.jpg" />
              <Comment.Content>
                <Comment.Author as="a">{username}</Comment.Author>
                <Comment.Metadata>
                  <span>{date}</span>
                </Comment.Metadata>
              </Comment.Content>
              <Rating icon="star" defaultRating={rating} maxRating={5} />
              <Label>
                <Icon name="user" />
                {totalHired} Hired
              </Label>
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
                  jobTitle="Graphic Designer"
                  company="abc co"
                  tags={tags}
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
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  close = () => this.setState({ open: false });

  render() {
    const comments = [...mockComments, ...(this.props.loop.comments || [])];

    const responders = comments.map(comment => {
      return {
        avatar: `/${comment.username}.jpg`,
        username: comment.username
      };
    });

    const { id, tags, title } = this.props.loop;

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
        <Container>
          <Segment vertical>
            <CloseLoopModal />
          </Segment>
        </Container>
        <Container
          style={{
            overflowY: 'auto',
            padding: '0 2px'
          }}
        >
          <Segment vertical>
            <Profile {...topic} />
          </Segment>
          <UserComment comments={comments} />
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
    loop: states.loops.data[props.match.params.loopId]
  };
};

export default connect(mapStateToProps)(Loop);
