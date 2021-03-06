import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { LeftoverContext } from "../../LeftoverContext";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import axios from "axios";

function DeleteModal({ setModal, leftover }) {
  const { api_url } = useContext(LeftoverContext);
  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const deleteRequest = {
    url: `${api_url}/leftovers/${leftover.id}`,
    config: {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    },
    reqBody: { is_available: "false" },
  };
  
  function deleteLeftover(deleteRequest) {
    axios
      .patch(deleteRequest.url, deleteRequest.reqBody, deleteRequest.config)
      .then((res) => {
        history.goBack()
        setDeleted(true);
        setModal();
      })
      .catch((error) => console.error);
  }
  return (
    <div>
      {/* {deleted ? <Redirect to={location.state && location.state.referer} /> : ""} */}
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={
          <Button negative>
            <Icon name="delete" />
            Delete
          </Button>
        }
        centered
      >
        <Header icon>
          <Icon name="trash" />
          Are you sure you want to delete this leftover
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => deleteLeftover(deleteRequest)}
          >
            <Icon name="remove" /> Confirm Delete
          </Button>
          <Button color="yellow" inverted onClick={() => setOpen(false)}>
            <Icon name="checkmark" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default DeleteModal;
