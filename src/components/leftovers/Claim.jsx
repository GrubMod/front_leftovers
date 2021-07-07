import React, { useState, useContext } from "react";
import { LeftoverContext } from "../../LeftoverContext";
import axios from "axios";
import Expiration from "./Expiration";
import { Card, Container, Button, Divider } from "semantic-ui-react";

// TODO: Need the following function in our tools that we can import
function titleCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

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
    <Card>
      <img src={leftover.image.image} width="100%" alt={claim.leftover.name} />
      <Container centered style={{ padding: "1rem" }}>
        <h3>{leftover.name}</h3>
        <p>@{leftover.owner}</p>
        <Divider />
        <Expiration leftover={leftover} />

        {!claim.completed && claimType === "claims" ? (
          <>
            {claim.approved ? (
              <>
                <p>
                  The provider has approved your claim request.{" "}
                  {titleCase(claim.leftover.owner)} with contact you directly at{" "}
                  {claim.claimed_by.email}
                </p>
                <Button.Group basic>
                  <Button name="picked_up" onClick={pickupOrder}>
                    Pickup
                  </Button>
                  <Button name="cancelled" onClick={cancelOrder}>
                    Cancel
                  </Button>
                </Button.Group>
              </>
            ) : (
              <>
                <p></p>
                <Button.Group basic>
                  <Button name="cancelled" onClick={cancelOrder}>
                    Cancel
                  </Button>
                </Button.Group>
              </>
            )}
          </>
        ) : (
          ""
        )}

        {!claim.completed && claimType === "requests" ? (
          <>
            {!claim.approved ? (
              <>
                <p></p>
                <Button.Group basic>
                  <Button name="approved" onClick={approveOrder}>
                    Approve
                  </Button>
                  <Button name="rejected" onClick={rejectOrder}>
                    Reject
                  </Button>
                </Button.Group>
              </>
            ) : (
              <>
                <p>
                  Please contact {titleCase(claim.claimed_by.first_name)} at{" "}
                  {claim.claimed_by.email} with pick-up instructions
                </p>
                <Button.Group basic>
                  <Button name="cancelled" onClick={cancelOrder}>
                    Cancel
                  </Button>
                </Button.Group>
              </>
            )}
          </>
        ) : (
          ""
        )}
      </Container>
    </Card>
  );
}

export default Claim;
