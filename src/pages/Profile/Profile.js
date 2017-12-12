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
import styles from './Profile.css';
import img from '../Loop/assets/jeannie.jpg';
import grabImg from './assets/grab.jpg';
import cehImg from './assets/ceh.png';

const profile = {
  avatar: img,
  username: 'Jeannie',
  position: 'Software Engineer',
  company: 'AXD Company',
  location: 'Setia Alam, Shah Alam, Selangor, Malaysia.',
  requirements: [
    'exciting people',
    'javascript',
    'react',
    'node js',
    'nice environment',
  ],
  quote: 'Coding is my life. I eat, live, and breathe codes.',
  rank: {
    title: 'IT Apprentice',
    votesCount: 10,
  },
  peopleHired: 12,
  events: [
    {
      type: 'work',
      period: 'Feb, 2016 - Current',
      position: 'Software Engineer',
      company: 'AXD Company',
      desc:
        'Completed frontend project and currently, working on new project which involve machine learning.',
      tags: ['machine learning', 'react', 'AWS', 'IT', 'voice recognition'],
    },
    {
      type: 'achievement',
      period: 'April, 2017',
      position: '1st Runner Up',
			company: 'Grab Hackathon',
			image: grabImg,
      desc:
        'A hackathon organized to unearth new solutions and ideas for traffic problems and road safety.',
      tags: ['safety', 'Grab', 'hackathon', 'MYTrafficHack'],
    },
    {
      type: 'certificate',
      period: 'July, 2016 - September, 2016',
      company: 'Certification of Project Management',
      position: 'CPM 2016',
      desc: 'Certification that involves testing on managing project skills.',
      tags: ['project management', 'CPM 2016'],
    },
    {
      type: 'work',
      period: 'Jan, 2015 - Jan, 2016',
      position: 'Full-Stack Software Engineer',
      company: 'Shoopper',
      desc: 'Building up e-commerce website.',
      tags: ['PHP', 'Laravel', 'SQL'],
    },
    {
      type: 'certificate',
      period: 'March, 2014 - June, 2014',
      company: 'Certified Ethical Hacker',
			position: 'CEH',
			image: cehImg,
      desc:
        'Master the advanced concepts on Ethical hacking such as corporate espionage, writing virus codes, exploit writing, and reverse engineering. You will understand advanced network packet analysis, securing IIS and Apache web servers, Windows system administration using PowerShell, Hacking SQL & Oracle database.',
      tags: ['security', 'CEH'],
    },
    {
      type: 'education',
      period: 'March, 2011 - March, 2014',
      position: 'Bachelor of Information Technology',
      company: 'Multimedia University',
      desc:
        'Degree in Information technology, specializing in Communication and Networking.',
      tags: ['MMU', 'IT', 'Bachelor', 'Networking', 'Communication'],
    },
  ],
};

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

    return (
      <div>
        <div className={styles.mainContainer}>
          <Image
            src={img}
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
            <Icon name="point" size="medium" /> {profile.location}
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
            color="white"
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
