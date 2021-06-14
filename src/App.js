import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Body from './components/Body';
import { LeftoverContext } from './LeftoverContext';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import HomepageLayout from './components/Home';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    const [state, setState] = useState({
        loggedIn: localStorage.getItem('token') ? true : false,
        username: '',
    });

    const api_url = process.env.REACT_APP_API_URL;

    return (
        <LeftoverContext.Provider value={{ state, setState, api_url }}>
            <Switch>
              <Route exact path="/home" component={HomepageLayout} />
              <Route path="/">
                <NavBar />
                <Body />
              </Route>
            </Switch>
        </LeftoverContext.Provider>
    );
};

export default App;
