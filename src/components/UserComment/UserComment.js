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
import JobDescriptionCard from 'componnets/JobDescriptionCard/JobDescriptionCard';

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

export default ({ comments, topicTags, parentContext }) => {
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
            job
          },
          i
        ) => {
          const { tag, rating } = getHighestRatingTagName(
            getRelatedTag(...tags, topicTags),
            topicTags
          );

          const userLike = parentContext.state.likes[username];
          const iconName =
            userLike && userLike.liked ? 'thumbs up' : 'thumbs outline up';
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
              <Icon
                name={iconName}
                onClick={() => {
                  let obj = {};
                  if (userLike && userLike.liked) {
                    obj[username] = { liked: false };
                    parentContext.state.likes = Object.assign(
                      parentContext.state.likes,
                      obj
                    );
                  } else {
                    obj[username] = { liked: true };
                    parentContext.state.likes = Object.assign(
                      parentContext.state.likes,
                      obj
                    );
                  }
                  console.log(parentContext.state.likes);
                  parentContext.setState({ ...parentContext.state });
                }}
              />
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
                <JobDescriptionCard
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
