import React, {useEffect, useState, useContext}  from 'react';
import axios from 'axios';
import { LeftoverContext } from '../LeftoverContext';
import Leftover from './Leftover'


function Leftovers(props) {

  const [leftovers, setLeftovers] = useState([])
  const { state, api_url } = useContext(LeftoverContext)

  useEffect(() => {
    function getLeftovers() {
      axios.get(`${ api_url }/leftovers/`)
      .then(res => {
          setLeftovers(res.data)
          console.log(res.data)
      })
      .catch(console.error)
    }
    getLeftovers()
  }, [api_url])

  return (
    state.loggedIn && leftovers && 
    <div>
      {
        leftovers.map((leftover, i) => <Leftover key={i} leftover={leftover} />)
      }
    </div>
  );
}

export default Leftovers;