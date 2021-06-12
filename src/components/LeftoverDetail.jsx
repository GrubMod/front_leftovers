import React, { useContext, useState, useEffect } from "react";
import { LeftoverContext } from "../LeftoverContext";
import Tags from "./Tags";
import axios from "axios";

/* ==============================================
            Delete Modal Component
=============================================== */
function DeleteModal({ setModal, leftover }) {
  const { api_url } = useContext(LeftoverContext);
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
      <button onClick={() => setModal()}>Cancel</button>
    </div>
  );
}
/* ------------------- Ends ------------------- */

/* ==============================================
            Claim Modal Component
=============================================== */
function ClaimModal({ setModal, leftover }) {
  const { api_url } = useContext(LeftoverContext);

  const claimRequest = {
    url: `${api_url}/orders`,
    config: {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    },
    reqBody: { is_available: "false" },
  };

  function ClaimLeftover(claimRequest) {
    // axios post request to orders
    // axios
    //   .post(claimRequest.url, claimRequest.reqBody, claimRequest.config)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .then(setModal())
    //   .catch((error) => console.error);
  }
  return (
    <div>
      <h2>Lets Claim this leftover</h2>
      <button onClick={() => ClaimLeftover(claimRequest)}>
        Claim Leftover
      </button>
      <button onClick={() => setModal("")}>Cancel</button>
    </div>
  );
}

/* ------------------- Ends ------------------- */

function LeftoverDetail(props) {
  const [modal, setModal] = useState();
  const [leftover, setLeftover] = useState();
  const { state, api_url } = useContext(LeftoverContext);

  console.log(props.match.params.id);

  useEffect(() => {
    axios
      .get(`${api_url}/leftovers/${props.match.params.id}`)
      .then((res) => {
        setLeftover(res.data);
      })
      .catch(console.error);
  }, [api_url]);

  function consoleFunc() {
    console.log("after click: should display leftover image url");
    console.log(leftover.image.image);
  }

  return (
    <div>
      <div>{modal ? modal : ""}</div>
      {leftover ? (
        <div>
          <img
            src={leftover.image.image}
            width="200"
            height="200"
            alt={leftover.id}
          />
          <h3>{leftover.name}</h3>
          <p>@{leftover.owner}</p>
          <p>{leftover.description}</p>
          <Tags leftover={leftover} />
          <p>
            available: <i>{leftover.is_available.toString()}</i>
          </p>
        </div>
      ) : (
        "No Leftover Detail"
      )}
      {true ? (
        <button
          onClick={() =>
            setModal(<ClaimModal setModal={setModal} claimRequest={2} />)
          }
        >
          Claim
        </button>
      ) : (
        <button
          onClick={() =>
            setModal(<DeleteModal setModal={setModal} leftover={leftover} />)
          }
        >
          X
        </button>
      )}
      <button onClick={consoleFunc}>console.log</button>
    </div>
  );
}

export default LeftoverDetail;
