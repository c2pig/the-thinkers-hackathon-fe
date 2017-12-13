import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { getCurrentUser } from 'store/modules';

import styles from './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: '',
    };
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
console.log(this.props.currentUserName);
    return (
      <Menu
        style={{ height: '4rem', backgroundColor: '#243862', color: 'white' }}
      >
        <Menu.Item header style={{ color: 'inherit' }}>
          <Image src="/LogoLoop_White.png" alt="logo" size="tiny" avatar />
        </Menu.Item>
        <Menu.Item
          className={styles.menuItem}
          name="profile"
          active={activeItem === 'profile'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          className={styles.menuItem}
          name="logout"
          active={activeItem === 'logout'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item header style={{ color: 'inherit' }}>
            <Icon name="hand peace" size="large" />Hi, Jeannie
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(connect(
  state => {
    currentUserName: getCurrentUser(state);
  }
)(Header));
