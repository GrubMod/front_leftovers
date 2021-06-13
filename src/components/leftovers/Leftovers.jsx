import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LeftoverContext } from "../../LeftoverContext";
import Leftover from "./Leftover";

function Leftovers() {
  const [leftovers, setLeftovers] = useState([]);
  const { state, api_url } = useContext(LeftoverContext);

  function getLeftovers() {
    const offset = new Date("1969-07-20T20:17:40.00Z").getTimezoneOffset() * 1000 * 60
    console.log("local time offset:", offset/1000/60/60, "hours")
    axios
      .get(`${api_url}/leftovers/`)
      .then((res) => {
        const filteredResponse = res.data.filter((i) => {
          const timeLeft = new Date(i.expiration) - new Date().getTime() + offset;
          return timeLeft > 0;
        });
        const sortedResponse = filteredResponse.sort((a, b) => {
          return new Date(a.expiration) - new Date(b.expiration);
        });
        console.log("sorted:=>", sortedResponse);
        setLeftovers(sortedResponse);
      })
      .catch(console.error);  
  }

  useEffect(() => {
    getLeftovers();
  }, [api_url]);

  return (
    state.loggedIn &&
    leftovers && (
      <div>
        {leftovers.map((leftover, i) => (
          <Leftover key={i} leftover={leftover} />
        ))}
      </div>
    )
  );
}

export default Leftovers;
