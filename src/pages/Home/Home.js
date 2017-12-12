import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Button, Label, Card, Form } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoopListData } from 'store/modules';
import { searchLoops, updateSearchKeywords, addLoop } from 'store/loopList';
import CreateLoopModal from 'components/CreateLoopModal/CreateLoopModal';

import styles from './Home.css';

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

const Home = ({ loops, searchLoops, updateSearchKeywords, addLoop }) => (
  <div className={styles.rootContainer}>
    <div className={styles.headerContainer}>
      <h1>Loop List</h1>
      <Checkbox toggle label="My topic" />
    </div>
    <div className={styles.cardsContainer}>
      {loops.map(topic => (
        <Link to={`/loop/${topic.id}`}>
          <Topic key={topic.title} title={topic.title} tags={topic.tags} />
        </Link>
      ))}
    </div>
    <div className={styles.footerContainer}>
      <Form onSubmit={() => searchLoops()}>
        <div className={styles.searchContainer}>
          <div className={styles.inputContainer}>
            <Form.Input
              placeholder="Search or add a loop title here"
              type="text"
              fluid
              onChange={event => updateSearchKeywords(event.target.value)}
            />
          </div>
          <div className={styles.inputButtonContainer}>
            <Button icon="search" type="submit" onClick={() => searchLoops()} />
            <CreateLoopModal onSubmit={addLoop}>
              <Button
                icon="plus"
                // onClick={e => {
                //   // addLoop();
                //   e.preventDefault();
                // }}
              />
            </CreateLoopModal>
          </div>
        </div>
      </Form>
    </div>
  </div>
);

Home.propTypes = {
  loops: PropTypes.array.isRequired,
  searchLoops: PropTypes.func.isRequired,
  updateSearchKeywords: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    state => ({
      loops: getLoopListData(state)
    }),
    {
      searchLoops,
      updateSearchKeywords,
      addLoop
    }
  )(Home)
);
