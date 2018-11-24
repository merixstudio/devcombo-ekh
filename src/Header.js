import React from 'react';
import {
  Container,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = ({ fixed }) => (
  <Menu
    fixed={fixed ? 'top' : null}
    inverted={!fixed}
    pointing={!fixed}
    secondary={!fixed}
    size='large'
  >
    <Container>
      <Menu.Item>
        <Link to="/">
          Home
        </Link>
      </Menu.Item>
      <Menu.Item position='right'>
        <Link to="/login" className="ui primary button">
          Log in
        </Link>
      </Menu.Item>
    </Container>
  </Menu>
);

Header.defaultProps = {
  fixed: true,
};

export default Header;