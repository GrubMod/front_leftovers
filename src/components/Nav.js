import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  console.log(props)
  const loggedOutNav = (
    <ul>
      <li onClick={() => props.displayForm('login')}>login</li>
    </ul>
  );

  const loggedInNav = (
    <ul>
      <li onClick={props.handleLogout}>logout</li>
    </ul>
  );
  return <div>{props.loggedIn ? loggedInNav : loggedOutNav}</div>;
}

export default Nav;

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  displayForm: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

