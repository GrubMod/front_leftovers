import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LeftoverContext } from "../../LeftoverContext";
import Claim from './Claim'



const Claims = () => {
  const [orders, setOrders] = useState([]);
  const { state, api_url } = useContext(LeftoverContext);
  const [claimType, setClaimType] = useState('claims');

  


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
      console.log(res.data)
      setOrders(res.data)
    })
    .catch(console.error);
  }, [api_url, claimType]);

  const handleChange = ev => {
    const index = ev.target.options['selectedIndex']
    const path = ev.target.options[index].value
    setClaimType(path)
  }

  return (
    orders &&
    <div>
      <label htmlFor="claim-select">Claims:</label>

      <select name="claim-types" id="claim-select" onChange={handleChange}>
          <option value='claims'>Claims</option>
          <option value="requests">Requests</option>
      </select>

      {orders.map(order => <Claim claim={order} />)}
    </div>
  );
};

export default Claims;