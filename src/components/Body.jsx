import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LeftoverContext } from '../LeftoverContext';
import Leftovers from './leftovers/Leftovers';
import LeftoverDetail from './leftovers/LeftoverDetail';
import TensorFlow from './tensorflow/TensorFlow';
import AddLeftover from './leftovers/AddLeftover';
import Claims from './leftovers/Claims';
import LoginForm from './LoginFormSemantic';
import Landing from './Landing';
import SignUpForm from './SignUpFormSemantic';
// import MagicInput from "./magicinput/MagicInput";

function Body(props) {
    const { state } = useContext(LeftoverContext);
    // State below used to test Magic Input
    // const [ leftover, setLeftover ] = useState({name: "Some", other: "Then"})

    return (
        <div>
            {/* Code below used to test magicinput */}
            {/* <MagicInput tag="h1" txt={leftover.name} stateKey="name" /> */}
            {/* <h2>{leftover['other']}</h2> */}
            <Switch>
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/signup" component={SignUpForm} />
                <Route exact path="/add-leftover" component={AddLeftover} />
                <Route exact path="/add" component={TensorFlow} />
                <Route exact path="/public" component={Leftovers} />

                <Route
                    exact
                    path="/leftovers/:id"
                    render={routerProps => (
                        <LeftoverDetail match={routerProps.match} />
                    )}
                />
                <Route exact path="/claims" component={Claims} />
            </Switch>
        </div>
    );
}

export default Body;
