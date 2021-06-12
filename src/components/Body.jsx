import React, { useContext } from 'react';
import { Route } from "react-router-dom";
import { LeftoverContext } from '../LeftoverContext';
import Leftovers from './Leftovers';
import LeftoverDetail from './LeftoverDetail';
import TensorFlow from './tensorflow/TensorFlow'


function Body(props) {
  const {state} = useContext(LeftoverContext)

  return (
    state.loggedIn &&
    <div>
        <Route exact path="/add" component={TensorFlow} />
        <Route exact path="/" component={Leftovers} />
        <Route exact path="/leftovers/:id" 
          render={(routerProps) => <LeftoverDetail match={routerProps.match}/>}/>
    </div>
    

  );
}

export default Body;