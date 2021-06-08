import React, { useContext } from 'react';
import { LeftoverContext } from '../LeftoverContext';
import Leftovers from './Leftovers';


function Body(props) {
  const {state} = useContext(LeftoverContext)

  return (
    state.loggedIn &&
    <div>
      <Leftovers />
    </div>
  );
}

export default Body;