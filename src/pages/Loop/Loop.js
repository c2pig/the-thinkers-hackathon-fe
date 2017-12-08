import React from 'react'
import { Message, Image, Feed, Card, Icon, Rating, Label, Comment, Form, Header, Item, Segment, Button, Divider } from 'semantic-ui-react'
import jeannie from './assets/jeannie.jpg'
import kong from './assets/kong.jpg'

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

const ContactMe = ({headline, description, phone, email}) => {
  return <Card fluid>
   <Card.Content>
     <Card.Meta>I am talent warrior</Card.Meta>
     <Card.Description>asdfasdfasdf</Card.Description>
   </Card.Content>
   <Card.Content>
     <Icon name='mail outline' />{email}
     <Icon name='phone' />{phone}
   </Card.Content>
 </Card>
}

const DropMessage = ({msg}) => {
  return <Message>{msg}</Message>
}

const PostJD = ({jobTitle, company, tags}) => {
  return <Card fluid>
   <Card.Content>
     <Card.Header>{jobTitle}</Card.Header>
     <Card.Meta>{company}</Card.Meta>
     {tags.map(tag => {
      return <Label>{tag}</Label>
     })}
   </Card.Content>
 </Card>
}

const Tags = ({tags}) => {
  return <Label.Group>{tags.map(x => <Label>{x}</Label>)}</Label.Group>
}

const Reply = () => {
  const posts = [
    { postType: 'drop-message', userName: 'Kong', date: 'Today at 5:42PM', message: 'Hello', rating: 1, totalHired: 10, headline:'i am kong', phone:'123', email:'kong@gmail.com' },
    { postType: 'contact-me', cuserName: 'Kong1', date: 'Today at 5:42PM', message: 'Hello', rating: 2, totalHired: 99, headline:'i am king kong', phone:'123', email:'kong1@gmail.com' },
    { postType: 'post-jd', userName: 'Kong2', date: 'Today at 5:42PM', message: 'Hello', rating: 4, totalHired: 5, headline:'i am kong king', phone:'123', email:'kong2@gmail.com', tags:['Java', 'NodeJs', 'FrontEnd'] }
  ];
  return <Comment.Group size='small'>
    {posts.map(({postType, userName, date, message, rating, totalHired, headline, phone, email, tags }) => {
      return <Comment>
            <Comment.Avatar as='a' src={kong} />
            <Comment.Content>
              <Comment.Author as='a'>{userName}</Comment.Author>
              <Comment.Metadata>
                <span>{date}</span>
              </Comment.Metadata>
            </Comment.Content>
            <Rating icon='star' defaultRating={rating} maxRating={5} />
            <Label><Icon name='user' />{totalHired} Hired</Label>
            { postType === 'contact-me' && <ContactMe headline={headline} description={message}
              phone={phone} email={email} />
            }
            { postType === 'drop-message' && <DropMessage msg={message} /> }
            { postType === 'post-jd' && <PostJD jobTitle="Graphic Designer" company="abc co" tags={tags}/> }
            <Divider hidden />
          </Comment>

    })}
  </Comment.Group>

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
    <Reply />
  </Segment>
  <Segment>
    <div>Reply..</div>
  </Segment>
  </div>
}


export default Loop;
