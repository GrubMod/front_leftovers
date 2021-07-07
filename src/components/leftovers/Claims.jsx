import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LeftoverContext } from "../../LeftoverContext";
import Claim from "./Claim";
import { Redirect } from "react-router-dom";
import { Accordion, Container, Divider, Icon } from "semantic-ui-react";

// TODO: Need the following function in our tools that we can import
function titleCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

const Claims = () => {
  const { state, api_url } = useContext(LeftoverContext);
  const [orders, setOrders] = useState([]);
  const [claimType, setClaimType] = useState("claims");
  const [approved, setApproved] = useState([]); // Dont delete these
  const [pending, setPending] = useState([]); // Dont delete these
  const [completed, setCompleted] = useState([]); // Dont delete these
  useEffect(() => {
    const claimRequest = {
      url: `${api_url}/orders/${claimType}/`,
      config: {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    };

    axios
      .get(claimRequest.url, claimRequest.config)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        setApproved(res.data.filter((i) => !i.completed && i.approved));
        setPending(res.data.filter((i) => !i.completed && !i.approved));
        setCompleted(res.data.filter((i) => i.completed));
      })
      .catch(console.error);
  }, [api_url, claimType]);

  const handleChange = (ev) => {
    const index = ev.target.options["selectedIndex"];
    const path = ev.target.options[index].value;
    setClaimType(path);
  };

  return !state.loggedIn ? (
    <Redirect to="/home" />
  ) : (
    orders && (
      <Container>
        <h2>
          <label htmlFor="claim-select">Leftovers I am </label>
          <select name="claim-types" id="claim-select" onChange={handleChange}>
            <option value="claims">Claiming</option>
            <option value="requests">Providing</option>
          </select>
        </h2>
        <Divider/>
        <div>
          <h3>Ready for Pick-Up</h3>
          {approved.map((claim) => (
            <Claim claim={claim} claimType={claimType} />
          ))}
        </div>
        <Divider/>
        <div>
          <h3>Pending Approval</h3>
          {pending.map((claim) => (
            <Claim claim={claim} claimType={claimType} />
          ))}
        </div>
        <Divider/>
        <div>
          <h3>Completed {titleCase(claimType)}</h3>
          {completed.map((claim) => (
            <Claim claim={claim} claimType={claimType} />
          ))}
        </div>
      </Container>
    )
  );
};

export default Claims;
