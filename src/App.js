import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Body from './components/Body'
import { LeftoverContext } from './LeftoverContext';
import './App.css';

const App = () => {

  const [ state, setState ] = useState({
    loggedIn: localStorage.getItem('token') ? true : false,
    username: ''
    });
  
  const api_url = process.env.REACT_APP_API_URL;



  return (
    <LeftoverContext.Provider value={{state, setState, api_url}}>
      <NavBar />
      <Body />
    </LeftoverContext.Provider>
  );
};

export default App;
