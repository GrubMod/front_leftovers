import React, { useContext, useState } from "react";
import { Route } from "react-router-dom";
import { LeftoverContext } from "../LeftoverContext";
import Leftovers from "./leftovers/Leftovers";
import LeftoverDetail from "./leftovers/LeftoverDetail";
import TensorFlow from "./tensorflow/TensorFlow";
import AddLeftover from "./leftovers/AddLeftover";
import Claims from "./leftovers/Claims";
// import MagicInput from "./magicinput/MagicInput";

function Body(props) {
  const { state } = useContext(LeftoverContext);
  // State below used to test Magic Input
  // const [ leftover, setLeftover ] = useState({name: "Some", other: "Then"})

  return (
    state.loggedIn && (
      <div>
        {/* Code below used to test magicinput */}
        {/* <MagicInput tag="h1" txt={leftover.name} stateKey="name" /> */}
        {/* <h2>{leftover['other']}</h2> */}

        <Route exact path="/add-leftover" component={AddLeftover} />
        <Route exact path="/add" component={TensorFlow} />
        <Route exact path="/" component={Leftovers} />
        <Route
          exact
          path="/leftovers/:id"
          render={(routerProps) => <LeftoverDetail match={routerProps.match} />}
        />
        <Route exact path="/claims" component={Claims} />
      </div>
    )
  );
}

export default Body;
