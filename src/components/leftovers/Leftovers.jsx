import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LeftoverContext } from "../../LeftoverContext";
import Leftover from "./Leftover";

function Leftovers() {
  const [leftovers, setLeftovers] = useState([]);
  const { state, api_url } = useContext(LeftoverContext);
  const [myFridgeIsClicked, setMyFridgeIsClicked] = useState(false);

  function getLeftovers() {
    const offset =
      new Date("1969-07-20T20:17:40.00Z").getTimezoneOffset() * 1000 * 60;
    console.log("local time offset:", offset / 1000 / 60 / 60, "hours");
    axios
      .get(`${api_url}/leftovers/`)
      .then((res) => {
        setLeftovers(res.data)
        // Filters expired leftovers out
        // const availableLeftovers = res.data.filter((i) => {
        //   const timeLeft =
        //     new Date(i.expiration) - new Date().getTime() + offset;
        //   return timeLeft > 0;
        // });

        // // Sorts by earliest to furthest expiration date
        // const sortedLeftovers = availableLeftovers.sort((a, b) => {
        //   return new Date(a.expiration) - new Date(b.expiration);
        // });
        // console.log("sorted:=>", sortedLeftovers);

        // // Filters to the user's leftovers if "My Fridge" is clicked
        // // otherwise filters to public leftovers
        // const personalLeftovers = sortedLeftovers.filter(
        //   (i) => i.owner === state.username
        // );
        // const publicLeftovers = sortedLeftovers.filter((i) => i.is_public);

        // myFridgeIsClicked
        //   ? setLeftovers(personalLeftovers)
        //   : setLeftovers(publicLeftovers);
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
