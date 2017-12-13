import React from 'react';
import {
  Header,
  Icon,
  Button,
  Label,
  Card,
  Image,
  Message,
} from 'semantic-ui-react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import usersMockData from 'common/mocks/users';
import styles from './Profile.css';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      currentEventView: 1000,
    };

    this.handleEventTimelineOnClick = this.handleEventTimelineOnClick.bind(
      this
    );
  }

  handleEventTimelineOnClick(index) {
    const { currentEventView } = this.state;
    this.setState({
      currentEventView: currentEventView === index ? 1000 : index,
    });
  }

  getIconDetails(eventType) {
    switch (eventType) {
      case 'work':
        return {
          name: 'briefcase',
          color: '#243862',
        };
      case 'certificate':
        return {
          name: 'bookmark',
          color: '#539b58',
          //   color: '#5d93ff',
        };
      case 'education':
        return {
          name: 'book',
          color: '#5d93ff',
          //   color: '#f47f24',
        };
      case 'achievement':
        return {
          name: 'winner',
          //   color: '#f47f24',
          color: '#ffcc01',
        };
      default:
        return;
    }
  }

  render() {
    const { currentEventView } = this.state;
    const { match: { params } } = this.props;
    console.log(params.username);
    const profile = usersMockData[params.username];
    return (
      <div>
        <div className={styles.mainContainer}>
          <Image
            src={profile.avatar}
            size="small"
            circular
            style={{
              borderRadius: '50%',
              // border: '2px solid #dbdbdb',
              padding: '5px',
              margin: 'auto',
            }}
          />
          <Header as="h3" textAlign="center" className={styles.titleHeader}>
            <Header.Content>{profile.username}</Header.Content>
          </Header>
          <p className={styles.miniFont}>
            {profile.position} at {profile.company}
          </p>
          <p className={styles.location}>
            <Icon name="point" size="large" /> {profile.location}
          </p>
          <div style={{ textAlign: 'center' }}>
            <Button as="div" labelPosition="right">
              <Button
                color="teal"
                style={{
                  fontSize: '10px',
                  backgroundColor: '#33ccff',
                }}
              >
                <Icon name="diamond" style={{ fontSize: '12px' }} />
                {profile.rank.title}
              </Button>
              <Label
                as="a"
                basic
                pointing="left"
                style={{
                  fontSize: '10px',
                  border: '1px solid #33ccff',
                  color: '#33ccff',
                }}
              >
                {profile.rank.votesCount} votes
              </Label>
            </Button>{' '}
            <Button as="div" labelPosition="right">
              <Button
                color="blue"
                style={{
                  fontSize: '10px',
                  backgroundColor: '#5d93ff',
                }}
              >
                <Icon name="users" style={{ fontSize: '12px' }} />
                People Hired
              </Button>
              <Label
                as="a"
                basic
                pointing="left"
                style={{
                  fontSize: '10px',
                  border: '1px solid #5d93ff',
                  color: '#5d93ff',
                }}
              >
                {profile.peopleHired}
              </Label>
            </Button>
          </div>
          <br />
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <p className={styles.miniFont}>I want to work with</p>
            <Label.Group>
              {profile.requirements.map((requirement, index) => (
                <Label key={index} className={styles.tag} as="a">
                  {requirement}
                </Label>
              ))}
            </Label.Group>
          </div>
          <Message
            style={{
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,.7)',
            }}
          >
            <p style={{ textAlign: 'left' }}>
              <Icon name="quote left" size="small" />
            </p>
            <p className={styles.quote}>{profile.quote}</p>
            <p style={{ textAlign: 'right' }}>
              <Icon name="quote right" size="small" />
            </p>
          </Message>
        </div>

        <Timeline>
          {profile.events.map((event, index) => (
            <TimelineEvent
              key={index}
              title={`${event.position}, ${event.company} | ${event.period}`}
              icon={
                <Icon
                  name={this.getIconDetails(event.type).name}
                  size="large"
                  style={{ margin: 'auto' }}
                />
              }
              iconColor={this.getIconDetails(event.type).color}
              style={{ margin: '10px 0px 20px' }}
              onClick={() => this.handleEventTimelineOnClick(index)}
            >
              {currentEventView === index && (
                <Card.Group>
                  <Card>
                    {event.image && <Image src={event.image} />}
                    <Card.Content>
                      <Card.Header>{event.company}</Card.Header>
                      <Card.Meta>{event.position}</Card.Meta>
                      <Card.Description>{event.desc}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Label.Group>
                        {event.tags.map((tag, index) => (
                          <Label
                            key={index}
                            style={{
                              backgroundColor: this.getIconDetails(event.type)
                                .color,
                              borderColor: this.getIconDetails(event.type)
                                .color,
                              color: 'white',
                            }}
                            as="a"
                          >
                            {tag}
                          </Label>
                        ))}
                      </Label.Group>
                    </Card.Content>
                  </Card>
                </Card.Group>
              )}
            </TimelineEvent>
          ))}
        </Timeline>
      </div>
    );
  }
}
