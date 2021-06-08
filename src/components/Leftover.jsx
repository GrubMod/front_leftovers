import React, { useContext } from 'react';
import { LeftoverContext } from '../LeftoverContext';
import DeleteButton from './DeleteButton';

function Leftover({leftover}) {
  
  console.log(leftover)

  //==== Testing DeleteButton for now ====//
  const {api_url} = useContext(LeftoverContext)

  const buttonProps = {
    name: 'removeLeftover',
    path: `${api_url}/leftovers/${leftover.id}/`,
    color: 'red',
    request: {
      is_available: 'false'
    }
  }
  //==== Copy above into delete confirmation page ====//


  return (
    <div>
      <img src={ leftover.image } alt="" />
      <h3>{ leftover.name }</h3>
      <p>{ leftover.description }</p>
      <p>available: <i>{ leftover.is_available.toString() }</i></p>
      <DeleteButton buttonProps={buttonProps}/>
      <br/>
      <br/>
    </div>
  );
}

export default Leftover;