import React from "react";
import Tags from "./Tags";
import { Link } from "react-router-dom";


function Leftover({ leftover }) {
  return (
    <Link to={`/leftovers/${leftover.id}`}>
      <img src={leftover.image.image} width='200' height='200' alt={leftover.id} />
      <h3>{leftover.name}</h3>
      <p>@{leftover.owner}</p>
      <Tags leftover={leftover} />
      <br />
      <br />
    </Link>
  );
}

export default Leftover;
