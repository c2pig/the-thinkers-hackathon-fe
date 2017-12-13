import React from 'react';
import { Card, Label, Icon } from 'semantic-ui-react';
import styles from './JobDescriptionCard.css';

const JobDescriptionCard = ({
  jobTitle,
  company,
  tags,
  yearsOfExperience,
  location,
}) => {
  return (
    <Card fluid>
      <Card.Content className={styles.contentContainer}>
        <Card.Header>{jobTitle}</Card.Header>
        <Card.Meta>{company}</Card.Meta>
        <div className={styles.descriptionContainer}>
          <Icon name="briefcase" />
          <span>{yearsOfExperience}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <Icon name="point" />
          <span>{location}</span>
        </div>
        <div className={styles.tagContainer}>
          {tags.map((tag, i) => {
            return <Label key={'label-' + i}>{tag}</Label>;
          })}
        </div>
      </Card.Content>
    </Card>
  );
};

export default JobDescriptionCard;
