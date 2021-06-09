import React, { useContext } from "react";
import { LeftoverContext } from "../LeftoverContext";
import axios from "axios";
import Tags from "./Tags";

// Modal component
function DeleteModal({ setModal, deleteRequest }) {
  function deleteLeftover(deleteRequest) {
    axios
      .patch(deleteRequest.url, deleteRequest.reqBody, deleteRequest.config)
      .then((res) => {
        console.log(res);
      })
      .then(setModal())
      .catch((error) => console.error);
  }

  return (
    <div>
      <h2>Are you sure you want to delete this leftover</h2>
      <button onClick={() => deleteLeftover(deleteRequest)}>
        Confirm Delete
      </button>
      <button onClick={() => setModal("")}>Cancel</button>
    </div>
  );
}

// Leftover component
function Leftover({ leftover, setModal }) {
  const { api_url } = useContext(LeftoverContext);
  console.log(leftover);

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

  return (
    <div>
      <img src={leftover.image} alt="" />
      <h3>{leftover.name}</h3>
      <p>@{leftover.owner}</p>
      <p>{leftover.description}</p>
      <Tags leftover={leftover} />
      <p>
        available: <i>{leftover.is_available.toString()}</i>
      </p>
      <button
        onClick={() =>
          setModal(
            <DeleteModal setModal={setModal} deleteRequest={deleteRequest} />
          )
        }
      >
        X
      </button>
      <br />
      <br />
    </div>
  );
}

export default Leftover;
