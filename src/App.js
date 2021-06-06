import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Books from './components/Books'
import { LeftoverContext } from './LeftoverContext';
import './App.css';

const App = () => {

  const [ state, setState ] = useState({
    loggedIn: localStorage.getItem('token') ? true : false,
    username: ''
    });


  return (
    <LeftoverContext.Provider value={{state, setState}}>
      <NavBar />
      <Books />
    </LeftoverContext.Provider>
  );
};

export default App;
