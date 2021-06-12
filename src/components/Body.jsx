import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { LeftoverContext } from "../LeftoverContext";
import Leftovers from "./leftovers/Leftovers";
import LeftoverDetail from "./leftovers/LeftoverDetail";
import TensorFlow from "./tensorflow/TensorFlow";
import AddLeftover from "./leftovers/AddLeftover";

function Body(props) {
  const { state } = useContext(LeftoverContext);

  return (
    state.loggedIn && (
      <div>
        <Route exact path="/add-leftover" component={AddLeftover} />
        <Route exact path="/add" component={TensorFlow} />
        <Route exact path="/" component={Leftovers} />
        <Route
          exact
          path="/leftovers/:id"
          render={(routerProps) => <LeftoverDetail match={routerProps.match} />}
        />
      </div>
    )
  );
}

export default Body;
