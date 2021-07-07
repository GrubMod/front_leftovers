import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LeftoverContext } from "../../LeftoverContext";
import Claim from "./Claim";
import { Redirect } from "react-router-dom";

function titleCase(str) {
  return str[0].toUpperCase()+str.slice(1)
}

const Claims = () => {
  const { state, api_url } = useContext(LeftoverContext);
  const [orders, setOrders] = useState([]);
  const [claimType, setClaimType] = useState("claims");
  const [approved, setApproved] = useState([]);        // Dont delete these
  const [pending, setPending] = useState([]);          // Dont delete these
  const [completed, setCompleted] = useState([]);          // Dont delete these
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
        setApproved(res.data.filter((i) => !i.completed && i.approved))
        setPending(res.data.filter((i) => !i.completed && !i.approved))
        setCompleted(res.data.filter((i) => i.completed))

      })
      .catch(console.error);
  }, [api_url, claimType]);

  const handleChange = (ev) => {
    const index = ev.target.options["selectedIndex"];
    const path = ev.target.options[index].value;
    setClaimType(path);
  };

  return (
    !state.loggedIn ? <Redirect to="/home" /> :
    orders && (
      <div>
        <label htmlFor="claim-select">Leftovers I am </label>
        <select name="claim-types" id="claim-select" onChange={handleChange}>
          <option value="claims">Claiming</option>
          <option value="requests">Providing</option>
        </select>

        <div>
          <h2>Ready for Pick-Up</h2>
          {approved.map(claim => (
            <Claim claim={claim} claimType={claimType}/>
          ))}
        </div>
        <div>
          <h2>Pending Approval</h2>
          {pending.map(claim => (
            <Claim claim={claim} claimType={claimType}/>
          ))}
        </div>
        <div>
          <h2>Completed {titleCase(claimType)}</h2>
          {completed.map(claim => (
            <Claim claim={claim} claimType={claimType}/>
          ))}
        </div>
      </div>
    )
  );
};

export default Claims;
