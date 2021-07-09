import React, { useState, useContext, useCallback} from 'react';
import { LeftoverContext } from "../LeftoverContext";
import { Redirect, Link, useHistory } from 'react-router-dom';
import logo from '../assets/timer_logo.svg';

import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
} from 'semantic-ui-react';
import { useEffect } from 'react';

const LoginForm = () => {

    const { state, setState, api_url } = useContext(LeftoverContext);
    const [ credentials, setCredentials ] =  useState({username: '', password: ''})
    const history = useHistory();
    

    const handleChange = e => {
      const name = e.target.name;
      const value = e.target.value;
      setCredentials(prevcreds => {
        const newState = { ...prevcreds };
        newState[name] = value;
        return newState;
      });
    };

    const handleLogin = useCallback(
        (e, data) => {
            e.preventDefault();
            fetch(`${api_url}/token-auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    localStorage.setItem('token', json.token);
                    setState({
                        loggedIn: true,
                        username: json.user.username,
                    });
                    window.hist = history;
                    history.push('/');
                    
                });
        },
        [setState, api_url]
    );

    return (
        <Grid
            textAlign="center"
            style={{ height: '100vh' }}
            verticalAlign="middle"
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header color="gray" as="h2" textAlign="center">
                <Image src={logo} style={{display:"block", margin:"auto"}} />
                    Log-in to your account
                </Header>
                <Form size="large" onSubmit={e => handleLogin(e, credentials)}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            value={credentials.username}
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            value={credentials.password}
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />

                        <Button fluid color="black" size="large">
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to="/signup">Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default LoginForm;
