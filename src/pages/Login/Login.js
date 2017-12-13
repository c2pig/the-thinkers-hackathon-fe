import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Image
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { LOGIN } from 'store/user';

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <Form size="large" onSubmit={handleSubmit}>
      <Segment stacked>
        <Form.Input fluid iconPosition="left">
          <Field name="username" component="input" placeholder="username" />
          <Icon name="user" />
        </Form.Input>

        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
        />
        <Button
          fluid
          size="large"
          type="submit"
          color="blue"
          // style={{
          //   backgroundColor: '#33ccff',
          //   borderColor: '#33ccff',
          //   color: 'white'
          // }}
        >
          Login
        </Button>
      </Segment>
    </Form>
  );
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: data => {
      dispatch({ type: LOGIN, payload: { username: data.username } });
      props.history.push('/');
    }
  };
};

const Login = ({ onSubmit }) => {
  return (
    <div className="login-form" style={{ paddingTop: '100px' }}>
      <Image
        size="small"
        src="/LogoLoop.png"
        style={{ margin: 'auto' }}
      />
      <br />
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center" style={{ color: '#33ccff' }}>
            CrowdLoop
          </Header>
          <LoginForm onSubmit={onSubmit} />
          <Message>
            New to us? <a color="blue">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default withRouter(connect(state => {}, mapDispatchToProps)(Login));
