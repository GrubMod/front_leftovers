import React, { useState, useContext, useCallback} from 'react';
import { LeftoverContext } from "../LeftoverContext";
import { Redirect, Link } from 'react-router-dom';
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

const SignUpForm = () => {

    const { state, setState, api_url } = useContext(LeftoverContext);
    const [ credentials, setCredentials ] =  useState({username: '', email: '', password: '', passwordconf: ''})

    const handleChange = e => {
      const name = e.target.name;
      const value = e.target.value;
      setCredentials(prevcreds => {
        const newState = { ...prevcreds };
        newState[name] = value;
        return newState;
      });
    };

    const handleSignup = useCallback(
        (e, data) => {
            e.preventDefault();
            fetch(`${api_url}/account/register/`, {
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

                    // Quick Hack: Move Logic somewhere else
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
                            setState({
                                loggedIn: true,
                                username: json.user.username,
                            });
                        });
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
            {state.loggedIn ? <Redirect to="/public" /> : ''}   
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header color="gray" as="h2" textAlign="center">
                <Image src={logo} style={{display:"block", margin:"auto"}} />
                    Create a new account
                </Header>
                <Form size="large" onSubmit={e => handleSignup(e, credentials)}>
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
                            value={credentials.email}
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email"
                            name="email"
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
                        <Form.Input
                            fluid
                            value={credentials.passwordconf}
                            icon="lock"
                            iconPosition="left"
                            placeholder="Confirm Password"
                            type="password"
                            name="passwordconf"
                            onChange={handleChange}
                        />

                        <Button fluid color="black" size="large">
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already have an account? <Link to="/login">Log In</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default SignUpForm;
