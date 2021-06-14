import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LeftoverContext } from "../../LeftoverContext";
import { Card, Grid } from 'semantic-ui-react'
import Leftover from "./Leftover";

function Leftovers() {
  const [leftovers, setLeftovers] = useState([]);
  const { state, api_url } = useContext(LeftoverContext);
  const [myFridgeIsClicked, setMyFridgeIsClicked] = useState(false);


  useEffect(() => {
    axios
    .get(`${api_url}/leftovers/`)
    .then((res) => {
      setLeftovers(res.data)   
    })
    .catch(console.error);
  }, [api_url]);

  return (
    leftovers && (
      <Grid centered>
        {leftovers.map((leftover, i) => (
          <Leftover key={i} leftover={leftover} />
        ))}
      </Grid>
    )
  );
}

export default Leftovers;
