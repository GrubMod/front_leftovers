import React, { useContext } from 'react';
import { LeftoverContext } from '../LeftoverContext';
import Leftovers from './Leftovers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TensorFlow from './tensorflow/TensorFlow'


function Body(props) {
  const {state} = useContext(LeftoverContext)

  return (
    state.loggedIn &&
    <div>
        <Route exact path="/add" component={TensorFlow} />
        <Route exact path="/" component={Leftovers} />
    </div>
    

  );
}

export default Body;