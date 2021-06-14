import React, { useContext, useState } from "react";
import { LeftoverContext } from "../../LeftoverContext";
import { Redirect } from "react-router-dom";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import axios from "axios";

function ClaimModal({ setModal, leftover }) {
  const { state, api_url } = useContext(LeftoverContext);
  const [claim, setClaim] = useState();
  const [open, setOpen] = React.useState(false);

  const claimRequest = {
    url: `${api_url}/orders/`,
    config: {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    },
    reqBody: {
      "leftover": leftover.id,
        "claimed_by": state.userId,
        "approved": false,
        "rejected": false,
        "cancelled": false,
        "picked_up": false,
        "completed": false
    },
  };

  function ClaimLeftover(claimRequest) {
    // axios post request to orders
    axios
      .post(claimRequest.url, claimRequest.reqBody, claimRequest.config)
      .then((res) => {
        console.log(res.data);
        setClaim(res.data);
        setModal();
      })
      .catch(console.error);
  }
  return (
    <div>
      {claim ? <Redirect to="/claims/" /> : ""}
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={<Button>Claim</Button>}
        centered
      >
        <Header icon>
          <Icon name="food" />
          Do you want to claim this leftover?
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="green"
            inverted
            onClick={() => ClaimLeftover(claimRequest)}
          >
            <Icon name="checkmark" /> Claim Leftover
          </Button>
          <Button color="yellow" inverted onClick={() => setOpen(false)}>
            <Icon name="Cancel" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ClaimModal;
