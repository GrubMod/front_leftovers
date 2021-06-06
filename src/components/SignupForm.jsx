import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';


const SignupForm = ({handleSignup}) => {

  const emptyCreds = {
    username: '',
    password: '',
    email: '',
    passwordconf: '',
  }

  const [ creds, setCreds ] = useState(emptyCreds);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setCreds(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  return (
    <div>
      <form onSubmit={e => handleSignup(e, creds)}>
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={creds.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={creds.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={creds.password}
          onChange={handleChange}
        />
        <label htmlFor="password-conf">Password Confirmation</label>
        <input
          type="password"
          name="passwordconf"
          value={creds.passwordconf}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SignupForm;

SignupForm.propTypes = {
  handleSignup: PropTypes.func.isRequired
};