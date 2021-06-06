import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LeftoverContext } from '../LeftoverContext';


const AuthButtons = ({ setFormType, handleLogout }) => {

  const {state} = useContext(LeftoverContext);

  const loggedOutNav = (
    <ul>
      <li onClick={() => setFormType('login')}>login</li>
      <li onClick={() => setFormType('signup')}>signup</li>
    </ul>
  );

  const loggedInNav = (
    <ul>
      <li onClick={ handleLogout }>logout</li>
    </ul>
  );
  return (
    <div>
      { state.loggedIn ? loggedInNav : loggedOutNav }
    </div>
  );
};

export default AuthButtons;

AuthButtons.propTypes = {
  setFormType: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};