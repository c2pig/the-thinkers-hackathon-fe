import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { logoutUser } from 'store/user';
import { getCurrentUser } from 'store/modules';

import styles from './Header.css';

class Header extends Component {
  static propTypes = {
    currentUserName: PropTypes.string.isRequired,
    logoutUser: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      activeItem: ''
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    const { currentUserName, logoutUser, history } = this.props;
    this.setState({ activeItem: name });
    switch (name) {
      case 'profile':
        history.push('/profile/' + currentUserName);
        break;
      case 'loop':
        history.push('/');
        break;
      case 'logout':
        logoutUser();
        history.push('/login');
        break;
      default:
        if (currentUserName !== '') {
          history.push('/');
        } else {
          history.push('/login');
        }
    }
  }

  render() {
    const { currentUserName } = this.props;
    const { activeItem } = this.state;
    return (
      <Menu
        className={styles.headerBar}
      >
        <Menu.Item
          header
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          className={styles.logoMenu}
        >
          <Image src="/LogoLoop_White.png" alt="logo" size="tiny" avatar />
        </Menu.Item>

        {currentUserName !== '' && (
          <Menu.Item
            className={styles.menuItem}
            name="loop"
            active={activeItem === 'loop'}
            onClick={this.handleItemClick}
          />
        )}

        {currentUserName !== '' && (
          <Menu.Item
            className={styles.menuItem}
            name="logout"
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        )}

        {currentUserName !== '' ? (
          <Menu.Menu position="right">
            <Menu.Item
              header
              name="profile"
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
              className={styles.menuItem}
            >
              <Icon name="hand peace" size="large" />Hi, {currentUserName}
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              header
              className={styles.menuItem}
              onClick={this.handleItemClick}
            >
              <Icon name="user circle" size="large" />Login
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      currentUserName: getCurrentUser(state)
    }),
    { logoutUser }
  )(Header)
);
