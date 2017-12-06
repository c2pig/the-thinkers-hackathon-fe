import React from 'react'
import { Label, Comment, Form, Header, Item, Segment, Button, Divider } from 'semantic-ui-react'
import jeannie from './assets/jeannie.jpg'
import kong from './assets/kong.jpg'

const CommentExampleMinimal = () => (
  <Comment.Group minimal>
    <Header as='h3' dividing>Comments</Header>

    <Comment>
      <Comment.Avatar as='a' src={kong} />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <span>Today at 5:42PM</span>
        </Comment.Metadata>
        <Comment.Text>Cheaper Please!</Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar as='a' src={kong} />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <span>Yesterday at 12:30AM</span>
        </Comment.Metadata>
        <Comment.Text>
          <p>If you offer me cheaper, i look nowhere!</p>
        </Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>

      <Comment.Group>
        <Comment>
          <Comment.Avatar as='a' src={jeannie} />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <span>Just now</span>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar as='a' src={jeannie} />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <span>5 days ago</span>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
)


const Profile = ({desc}) => {

  const description = "Hi, I am Jeannie, a sexy and hot lady.  I offer honey massage service..."

  return <Item.Group><Item>
    <Item.Image size='small' src={jeannie} />
    <Item.Content>
      <Item.Header as='a'>Honey Massage</Item.Header>
      <Item.Description>
        <p>{description}</p>
      </Item.Description>
    </Item.Content>
  </Item></Item.Group>
}

const TextPost = () => {
  const text = "Hello...You are so beautiful.  May i be your friend?"
  return  <Item.Group relaxed>
    <Item>
      <Item.Image size='small' src={kong} />
      <Item.Content verticalAlign='middle'>
        <Item.Header>Content A</Item.Header>
        <Item.Description>{text}</Item.Description>
        <Item.Extra>
          <Button floated='right'>
            Action
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
    </Item.Group>
}

const ContactPost = () => {
  return <div />
}

const JobOfferPost = () => {
  return <div />
}

const Tags = ({tags}) => {
  return <Label.Group>{tags.map(x => <Label>{x}</Label>)}</Label.Group>
}

const Loop = () => {
  const tags = ['Honey Massage', 'Royale Massage', 'FireWind Wheel Massage'];
  return <div>
  <Segment>
    <Tags tags={tags} />
  </Segment>
  <Segment>
    <Profile />
  </Segment>
  <Segment>
    <CommentExampleMinimal />
    <ContactPost />
    <JobOfferPost />
  </Segment>
  <Segment>
    <div>Reply..</div>
  </Segment>
  </div>
}


export default Loop;
