import React, {useEffect, useState, useContext}  from 'react';
import axios from 'axios';
import { LeftoverContext } from '../LeftoverContext';
import Leftover from './Leftover'
import NewLeftoverForm from './NewLeftoverForm';


function Leftovers(props) {

  const [leftovers, setLeftovers] = useState([])
  const { state, api_url } = useContext(LeftoverContext)

  const [ modal, setModal ] = useState() 

  function getLeftovers() {
    axios.get(`${ api_url }/leftovers/`)
    .then(res => {
        setLeftovers(res.data)
        console.log(res.data)
    })
    .catch(console.error)
  }
  useEffect(() => {
    getLeftovers()
  }, [api_url])

  return (
    state.loggedIn && leftovers && 
    <div>
      <div>{ modal ? modal : 'No modal yet' }</div>
      {
        leftovers.map((leftover, i) => <Leftover key={i} leftover={leftover} setModal={setModal}/>)
      }
      <NewLeftoverForm leftovers={leftovers} setLeftovers={leftovers}/>
    </div>
  );
}

export default Leftovers;