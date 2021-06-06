import React from 'react';

let state =   {
    loggedIn: false,
    username: '',
    };

export const LeftoverContext = React.createContext(state)
