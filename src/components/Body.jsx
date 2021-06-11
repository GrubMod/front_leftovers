import React, { useContext } from 'react';
import { LeftoverContext } from '../LeftoverContext';
import Leftovers from './Leftovers';
import TensorFlow from './tensorflow/TensorFlow'


function Body(props) {
  const {state} = useContext(LeftoverContext)

  return (
    state.loggedIn &&
    <div>
      {/* <TensorFlow /> */}
      <Leftovers />
    </div>
  );
}

export default Body;