import React from 'react';
import { getHighestRatingTagName, getRelatedTag } from 'common/helpers';
import {
  Message,
  Card,
  Icon,
  Label,
  Comment,
  Divider
} from 'semantic-ui-react';

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

export default ({ comments, topicTags, parentContext}) => {
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
            tags
          },
          i
        ) => {
          const { tag, rating } = getHighestRatingTagName(
            getRelatedTag(...tags, topicTags),
            topicTags
          );

          const userLike = parentContext.state.likes[username];
          console.log(userLike);
          const iconName = userLike && userLike.liked  ? "thumbs up" : "thumbs outline up";
          const newRating = userLike && userLike.liked ? rating + 1 : rating;
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
                  <Label.Detail>{newRating}</Label.Detail>
                </Label>
              )}
              <Label>
                <Icon name="user" />
                {totalHired} Hired
              </Label>
              <Icon name={iconName} onClick={() => {
                let obj = {};
                if(userLike && userLike.liked)  {
                  obj[username] = { liked: false };
                  parentContext.state.likes = Object.assign(parentContext.state.likes, obj);
                } else {
                  obj[username] = { liked: true };
                  parentContext.state.likes = Object.assign(parentContext.state.likes, obj);
                }
                console.log(parentContext.state.likes);
                parentContext.setState({...parentContext.state});
              }}/>
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
