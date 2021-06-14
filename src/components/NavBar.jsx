import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Button, Icon } from 'semantic-ui-react';
import { LeftoverContext } from '../LeftoverContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AuthButtons from './AuthButtons';
import logo from '../assets/timer_logo.svg';

const NavBar = () => {
    const { state, setState, api_url } = useContext(LeftoverContext);
    const [form, setForm] = useState(null);
    const [formType, setFormType] = useState(null);

    const catchError = useCallback(error => {
        console.log(error);
    }, []);

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
                    localStorage.setItem('token', json.token);
                    setState({
                        loggedIn: true,
                        username: json.user.username,
                    });
                    setForm('');
                });
        },
        [setState, setForm, api_url]
    );

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
                    localStorage.setItem('token', json.token);
                    setState({
                        loggedIn: false,
                        username: '',
                    });
                    // TODO: chain signup success to login the user
                    // setState({
                    //   loggedIn: true,
                    //   username: json.username,
                    // });
                    setForm('');
                });
        },
        [setState, api_url]
    );

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        setState({ loggedIn: false, username: '' });
        setFormType(null);
    }, [setState, setFormType]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetch(`${api_url}/current-user/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                },
            })
                .then(res => {
                    if (!res.ok) {
                        catchError(res);
                        localStorage.removeItem('token');
                        setState({
                            loggedIn: false,
                            username: '',
                        });
                    } else {
                        console.log(res);
                        return res.json();
                    }
                })
                .then(json => {
                    console.log('Im inside the json', json);
                    setState({
                        loggedIn: true,
                        username: json.username,
                        userId: json.id,
                        name:
                            json.first_name.charAt(0).toUpperCase() +
                            json.first_name.slice(1).toLowerCase(),
                    });
                })
                .catch(err => console.log('THIS IS THE ERROR', err));
        }
    }, [setState, catchError, api_url]);

    useEffect(() => {
        switch (formType) {
            case 'login':
                setForm(<LoginForm handleLogin={handleLogin} />);
                break;
            case 'signup':
                setForm(<SignupForm handleSignup={handleSignup} />);
                break;
            default:
                setForm('');
        }
    }, [formType, handleLogin, handleSignup]);

    return (
        <Menu secondary pointing id="menu">
            <Menu.Item>
                <Image src={logo} width={25} />
                <Link to="/">
                    <h3 id="logo">Leftovers</h3>
                </Link>
            </Menu.Item>

            <Menu.Item position="right">
                {state.username ? (
                    <p>{`Hi ${state.name ? state.name : state.username}`}</p>
                ) : (
                    ''
                )}
            </Menu.Item>

            {state.loggedIn ? (
                <Menu.Item>
                        <Button as={Link} to="/add-leftover"  icon>
                            <Icon name="add" />
                            Add Leftover
                        </Button>
                        {/* <Button animated>
                            <Button.Content hidden>
                                Add&nbsp;Leftover
                            </Button.Content>
                            <Button.Content visible>
                                <Icon style={{ width: '30px' }} name="add" />
                            </Button.Content>
                        </Button> */}
                </Menu.Item>
            ) : (
                ''
            )}

            <Menu.Item>
                <AuthButtons
                    setFormType={setFormType}
                    handleLogout={handleLogout}
                />
                {form}
            </Menu.Item>
        </Menu>
    );
};

export default NavBar;
