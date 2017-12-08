import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import CreateLoopModal from 'components/CreateLoopModal/CreateLoopModal';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <CreateLoopModal />
        <h2>Home page</h2>
        <Button>Click Here</Button>
      </Container>
    );
  }
}

export default Home;
