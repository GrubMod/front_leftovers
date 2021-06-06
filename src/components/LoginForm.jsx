import React, { useState } from 'react';

const LoginForm = ({handleLogin}) => {

  const [ credentials, setCredentials ] =  useState({username: '', password: ''})

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials(prevcreds => {
      const newState = { ...prevcreds };
      newState[name] = value;
      return newState;
    });
  };

  return (
    <form onSubmit={e => handleLogin(e, credentials)}>
    <h4>Log In</h4>
    <label htmlFor="username">Username</label>
    <input
      type="text"
      name="username"
      value={credentials.username}
      onChange={handleChange}
    />
    <label htmlFor="password">Password</label>
    <input
      type="password"
      name="password"
      value={credentials.password}
      onChange={handleChange}
    />
    <input type="submit" />
  </form>
  );
};

export default LoginForm;
