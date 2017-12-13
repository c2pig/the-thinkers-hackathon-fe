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
import { connect } from 'react-redux';
import mockComments from 'common/mocks/comments';
import { Link } from 'react-router-dom';
import { getHighestRatingTagName, getRelatedTag } from 'common/helpers';

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
        {tags.map(({tag}, i) => {
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

const UserComment = ({ posts, topicTags }) => {
  return (
    <Comment.Group size="small">
      {posts.map(
        (
          {
            postType,
            userName,
            date,
            message,
            totalHired,
            headline,
            phone,
            email,
            tags
          },
          i
        ) => {

          const { tag, rating } = getHighestRatingTagName(getRelatedTag(...tags, topicTags), topicTags);
          return (
            <Comment key={'comment-i' + i}>
              <Comment.Avatar as="a" src="/kong.jpg" />
              <Comment.Content>
                <Comment.Author as="a">{userName}</Comment.Author>
                <Comment.Metadata>
                  <span>{date}</span>
                </Comment.Metadata>
              </Comment.Content>
              { tag &&
                <Label>{tag}
                  <Label.Detail>{rating}</Label.Detail>
                </Label>
              }
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
    const { tags } = this.props.loop;

    const topic = {
      description: this.props.loop.description,
      tags: tags,
      headline: this.props.loop.topic
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Container
          style={{ overflowY: 'auto', flexBasis: 'calc(100vh - 160px)' }}
        >
          <Divider hidden />
          <Link to="/">
            <Button color="yellow" fluid>
              Close Topic
            </Button>
          </Link>
          <Segment vertical>
            <Profile {...topic} />
          </Segment>
          <UserComment posts={comments} topicTags={topic.tags} />
        </Container>
        <Container style={{ flex: '0 0 auto' }}>
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
