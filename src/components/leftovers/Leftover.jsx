import React from "react";
import { Link } from "react-router-dom";
import Tags from "./Tags";
import Expiration from './Expiration'

function Leftover({ leftover }) {
  return (
    <Link to={`/leftovers/${leftover.id}`}>
      <img src={leftover.image.image} width="200" alt={leftover.id} />
      <h3>{leftover.name}</h3>
      <p>@{leftover.owner}</p>
      <Expiration leftover={leftover}/>
      <Tags leftover={leftover} />
      <br />
      <br />
    </Link>
  );
}

export default Leftover;
