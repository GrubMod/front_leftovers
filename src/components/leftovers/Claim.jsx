import React, { useState, useContext } from "react";
import { LeftoverContext } from "../../LeftoverContext";
import axios from "axios";
import Expiration from "./Expiration";

function Claim({ claim, claimType }) {
  const { state, api_url } = useContext(LeftoverContext);
  const leftover = claim.leftover;

  // Axios Call Set-Up
  const url = `${api_url}/orders/${claimType}/${claim.id}`;
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  // **** Need to update these functions to make DRY **************
  function cancelOrder(e) {
    e.preventDefault();
    const body = {
      cancelled: true,
      picked_up: false,
      completed: true,
    };
    axios.patch(url, body, config).catch((error) => console.error);
  }

  function rejectOrder(e) {
    e.preventDefault();
    const body = {
      approved: false,
      rejected: true,
      picked_up: false,
      completed: true,
    };
    axios.patch(url, body, config).catch((error) => console.error);
  }

  function approveOrder(e) {
    e.preventDefault();
    const body = {
      approved: true,
      rejected: false,
      completed: false,
    };
    axios.patch(url, body, config).catch((error) => console.error);
  }

  function pickupOrder(e) {
    e.preventDefault();
    const body = {
      picked_up: true,
      completed: true,
    };
    axios.patch(url, body, config).catch((error) => console.error);
  }

  return (
    <div>
      <img src={leftover.image.image} height="100" alt={claim.leftover.name} />
      <h3>{leftover.name}</h3>
      <p>@{leftover.owner}</p>
      <Expiration leftover={leftover} />

      {claimType === "claims" ? (
        <>
          {claim.approved ? (
            <button name="picked_up" onClick={pickupOrder}>
              Pickup
            </button>
          ) : (
            ""
          )}
          <button name="cancelled" onClick={cancelOrder}>
            Cancel
          </button>
        </>
      ) : (
        ""
      )}

      {claimType === "requests" ? (
        <>
          {!claim.approved ? (
            <>
              <button name="approved" onClick={approveOrder}>
                Approve
              </button>
              <button name="rejected" onClick={rejectOrder}>
                Reject
              </button>
            </>
          ) : (
            <button name="cancelled" onClick={cancelOrder}>
              Cancel
            </button>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Claim;
