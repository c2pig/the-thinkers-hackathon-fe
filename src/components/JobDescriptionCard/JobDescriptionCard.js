import React from 'react';
import { Card, Label } from 'semantic-ui-react';

const JobDescriptionCard = ({ jobTitle, company, tags }) => {
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

export default JobDescriptionCard;
