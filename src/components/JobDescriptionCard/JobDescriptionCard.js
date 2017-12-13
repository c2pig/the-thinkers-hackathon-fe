import React from 'react';
import { Card, Label } from 'semantic-ui-react';

import IconWithDescription from 'components/IconWithDescription/IconWithDescription';

import styles from './JobDescriptionCard.css';

const JobDescriptionCard = ({
  jobTitle,
  company,
  tags,
  yearsOfExperience,
  location,
  onClick
}) => {
  return (
    <Card fluid style={{position: 'relative'}}>
    {
      onClick &&
      <div className={styles.onClickContainer} onClick={onClick} />
    }
      <Card.Content className={styles.contentContainer}>
        <Card.Header>{jobTitle}</Card.Header>
        <Card.Meta>{company}</Card.Meta>
        <IconWithDescription
          description={yearsOfExperience}
          icon="briefcase"
          className={styles.descriptionContainer}
        />
        <IconWithDescription
          description={location}
          icon="point"
          className={styles.descriptionContainer}
        />
        <div className={styles.tagContainer}>
          {tags.map((tag, i) => {
            return (
              <Label
                key={'label-' + i}
                style={{ backgroundColor: '#5d93ff', color: 'white' }}
              >
                {tag}
              </Label>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
};

export default JobDescriptionCard;
