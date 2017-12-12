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
import { connect } from 'react-redux';
import mockComments from 'common/mocks/comments';

const Profile = ({ description, profilePicture, headline }) => {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="small" src={profilePicture} />
        <Item.Content>
          <Item.Header as="a">{headline}</Item.Header>
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

const Reply = ({ posts }) => {
  return (
    <Comment.Group size="small">
      {posts.map(
        (
          {
            postType,
            userName,
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
                <Comment.Author as="a">{userName}</Comment.Author>
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
    const tags = ['Honey Massage', 'Royale Massage', 'FireWind Wheel Massage'];
    const comments = [...this.props.loop.comments, ...mockComments];

    const profileCover = {
      description: this.props.loop.description,
      profilePicture: '/jeannie.jpg',
      headline: this.props.loop.topic
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Container
          style={{ overflowY: 'auto', flexBasis: 'calc(100vh - 160px)' }}
        >
          <Divider hidden />
          <Segment>
            <Label attached="top right" icon="close" />
            <Tags tags={tags} />
          </Segment>
          <Segment vertical>
            <Profile {...profileCover} />
          </Segment>
          <Reply posts={comments} />
        </Container>
        <Container style={{ flex: '0 0 auto' }}>
          <ReplyPanel />
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
