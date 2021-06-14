import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Menu } from 'semantic-ui-react';
import { LeftoverContext } from '../LeftoverContext';
import { Link } from 'react-router-dom';

const AuthButtons = ({ setFormType, handleLogout }) => {
    const { state } = useContext(LeftoverContext);

    const loggedOutNav = (
        <>
                <Button style={{marginRight:5}} as={Link} to={'/login'} animated>
                  <Button.Content visible>Log in</Button.Content>
                  <Button.Content hidden><Icon name="user circle outline" /></Button.Content>
                    
                </Button>

                <Button as={Link} to={'/signup'} animated>
                  <Button.Content visible>Sign Up</Button.Content>
                  <Button.Content hidden><Icon name="user plus" /></Button.Content>
                    
                </Button>


            {/* <Button onClick={() => setFormType('login')}>login</Button> */}
            {/* <li onClick={() => setFormType('signup')}>signup</li> */}
        </>
    );

    const loggedInNav = (
        <Button color="red" onClick={handleLogout} animated>
            <Button.Content visible>Logout</Button.Content>
            <Button.Content hidden>
                <Icon name="log out" />
            </Button.Content>
        </Button>
    );
    return <>{state.loggedIn ? loggedInNav : loggedOutNav}</>;
};

export default AuthButtons;

AuthButtons.propTypes = {
    setFormType: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
};
