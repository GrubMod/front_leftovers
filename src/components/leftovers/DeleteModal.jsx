import React,  { useContext, useState } from "react";
import { Redirect } from "react-router";
import { LeftoverContext } from "../../LeftoverContext";
import axios from "axios";

function DeleteModal({ setModal, leftover }) {
  const { api_url } = useContext(LeftoverContext);
  const [deleted, setDeleted] = useState(false);
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
        setDeleted(true);
        setModal();
      })
      .catch((error) => console.error);
  }
  return (
    <div>
      {deleted ? <Redirect to="/" /> : ""}
      <h2>Are you sure you want to delete this leftover</h2>
      <button onClick={() => deleteLeftover(deleteRequest)}>
        Confirm Delete
      </button>
      <button onClick={() => setModal()}>Cancel</button>
    </div>
  );
}

export default DeleteModal;