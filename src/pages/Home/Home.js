import React from 'react';
import {
  Checkbox,
  Button,
  Label,
  Container,
  Card,
  Form,
} from 'semantic-ui-react';
import styles from './Home.css';

const topics = [
  {
    title: 'Software Engineer',
    tags: ['javascript', 'react', 'jsx'],
  },
  {
    title: 'Senior Massager',
    tags: ['massage', 'back', 'shoulder', '5years'],
  },
  {
    title: 'Drain Cleaner (Expert)',
    tags: ['drain', 'cleaner', 'expert'],
  },
  {
    title: 'Drain Cleaner 1 (Expert)',
    tags: ['drain', 'cleaner', 'expert'],
  },
  {
    title: 'Drain Cleaner 2 (Expert)',
    tags: ['drain', 'cleaner', 'expert'],
  },
  {
    title: 'Drain Cleaner 3 (Expert)',
    tags: ['drain', 'cleaner', 'expert'],
  },
  {
    title: 'Drain Cleaner 4 (Expert)',
    tags: ['drain', 'cleaner', 'expert'],
  },
  {
    title: 'Drain Cleaner 5 (Expert)',
    tags: ['drain', 'cleaner', 'expert'],
  },
];
const Topic = ({ title, tags }) => {
  return (
    <Card fluid>
      <Card.Content>
        <h3>{title}</h3>
        <Label.Group>
          {tags.map(tag => <Label key={tag}>{tag}</Label>)}
        </Label.Group>
      </Card.Content>
    </Card>
  );
};

class Home extends React.Component {
  state = {
    topics,
    searchKeyword: '',
  };

  handleOnSearchChange = event => {
    this.setState({ searchKeyword: event.target.value });
  };

  handleOnSearch = () => {
    const { searchKeyword } = this.state;
    this.setState({
      topics: searchKeyword
        ? topics.filter(
            topic =>
              topic.title.toLowerCase().indexOf(searchKeyword.toLowerCase()) >
              -1
          )
        : topics,
    });
  };
  render() {
    const { topics } = this.state;
    return (
      <div className={styles.rootContainer}>
        <Container>
          <div className={styles.headerContainer}>
            <h1>Loop List</h1>
            <Checkbox toggle label="My topic" />
          </div>
          <Form onSubmit={this.handleOnSearch}>
            <div className={styles.searchContainer}>
              <div className={styles.inputContainer}>
                <Form.Input
                  placeholder="Search or add a title here"
                  type="text"
                  fluid
                  onChange={this.handleOnSearchChange}
                />
              </div>
              <div className={styles.inputButtonContainer}>
                <Button
                  icon="search"
                  type="submit"
                  onClick={this.handleOnSearch}
                />
                <Button icon="plus" />
              </div>
            </div>
          </Form>
          {topics.map(topic => (
            <Topic key={topic.title} title={topic.title} tags={topic.tags} />
          ))}
        </Container>
      </div>
    );
  }
}

export default Home;
