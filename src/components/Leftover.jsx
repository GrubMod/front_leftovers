import React from "react";
import Tags from "./Tags";


function Leftover({ leftover }) {
  return (
    <div>
      <img src={leftover.image.image} width='200' height='200' alt={leftover.id} />
      <h3>{leftover.name}</h3>
      <p>@{leftover.owner}</p>
      <Tags leftover={leftover} />
      <br />
      <br />
    </div>
  );
}

export default Leftover;
