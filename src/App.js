import React, { useState, useCallback, useEffect } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import BookForm from './components/BookForm';
import './App.css';

const App = () => {

  const [ state, setState ] = useState({
    displayedForm: '',
    loggedIn: localStorage.getItem('token') ? true : false,
    username: ''
    });

  const catchError = error => { console.log( error )}

  const handleLogin = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setState({
          loggedIn: true,
          displayedForm: '',
          username: json.user.username
        });
      });
  }

  const handleSignup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setState({
          loggedIn: true,
          displayedForm: '',
          username: json.username
        });
      });
  };

  useEffect(() => {
    console.log("RUNNING USE EFFECT")
    if (state.loggedIn) {
      console.log("INSIDE USE EFFECT iF STATE LOGGED IN", state)
      fetch('http://localhost:8000/current-user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then( res => {
           if(!res.ok){
            catchError(res)
            localStorage.removeItem('token');
            setState({
              displayedForm: '',
              loggedIn: false,
              username: ''
            });
          }else{
            console.log(res)
            return res.json()
          }})
        .then(json => {
          console.log('Im inside the json', json)
          setState({username: json.username});
          console.log("THIS IS MY STATE", state)
        })
        .catch(err => console.log("THIS IS THE ERROR", err));
    }
  }, [state])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setState({ loggedIn: false, username: ''})
  };

  const displayForm = form => {
    console.log(form)
    setState({displayedForm: form})
  };


  return (
    <div className="App">
    <Nav
      loggedIn={state.loggedIn ? true : false}
      displayForm={displayForm}
      handleLogout={handleLogout}
    />

    { state.displayedForm === 'login' ? <LoginForm handleLogin={handleLogin} /> : ''}
    { state.displayedForm === 'signup' ? <SignupForm handleSignup={handleSignup} /> : ''}
    <h3>
      login state: {state.loggedIn}
      {state.loggedIn
        ? `Hello, ${state.username}`
        : 'Please Log In'}
    </h3>

    {state.logged_in ? <BookForm /> : ''}
  </div>
  );
};

export default App;
