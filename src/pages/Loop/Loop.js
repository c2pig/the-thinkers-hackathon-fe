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
              <Comment.Avatar as="a" src="kong.jpg" />
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
    const posts = [
      {
        postType: 'drop-message',
        userName: 'Kong',
        date: 'Today at 5:42PM',
        message: 'Hello',
        rating: 1,
        totalHired: 10,
        headline: 'i am kong',
        phone: '123',
        email: 'kong@gmail.com'
      },
      {
        postType: 'contact-me',
        cuserName: 'Kong1',
        date: 'Today at 5:42PM',
        message: 'Hello',
        rating: 2,
        totalHired: 99,
        headline: 'i am king kong',
        phone: '123',
        email: 'kong1@gmail.com'
      },
      {
        postType: 'post-jd',
        userName: 'Kong2',
        date: 'Today at 5:42PM',
        message: 'Hello',
        rating: 4,
        totalHired: 5,
        headline: 'i am kong king',
        phone: '123',
        email: 'kong2@gmail.com',
        tags: ['Java', 'NodeJs', 'FrontEnd']
      }
    ];

    const profileCover = {
      description:
        'Hi, I am Jeannie, a sexy and hot lady.  I offer honey massage service...',
      profilePicture: 'jeannie.jpg',
      headline: 'Honey Massage'
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
          <Reply posts={posts} />
        </Container>
        <Container style={{ flex: '0 0 auto' }}>
          <ReplyPanel />
        </Container>
      </div>
    );
  }
}

export default Loop;
