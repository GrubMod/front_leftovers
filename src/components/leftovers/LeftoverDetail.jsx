import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { LeftoverContext } from "../../LeftoverContext";
import axios from "axios";
import Tags from "./Tags";
import DeleteModal from './DeleteModal'
import ClaimModal from './ClaimModal'


/* ==============================================
            Claim Modal Component
=============================================== */
// function ClaimModal({ setModal, leftover }) {
//   const { api_url } = useContext(LeftoverContext);

//   const claimRequest = {
//     url: `${api_url}/orders`,
//     config: {
//       headers: {
//         Authorization: `JWT ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//     },
//     reqBody: { is_available: "false" },
//   };

//   function ClaimLeftover(claimRequest) {
//     // axios post request to orders
//     // axios
//     //   .post(claimRequest.url, claimRequest.reqBody, claimRequest.config)
//     //   .then((res) => {
//     //     console.log(res);
//     //   })
//     //   .then(setModal())
//     //   .catch((error) => console.error);
//   }
//   return (
//     <div>
//       <h2>Lets Claim this leftover</h2>
//       <button onClick={() => ClaimLeftover(claimRequest)}>
//         Claim Leftover
//       </button>
//       <button onClick={() => setModal("")}>Cancel</button>
//     </div>
//   );
// }
/* ------------------- Ends ------------------- */

/* ==============================================
          Leftover Detail Component
=============================================== */
function LeftoverDetail(props) {
  const [modal, setModal] = useState();
  const [leftover, setLeftover] = useState();
  const [ownerIsLoggedIn, setOwnerIsLoggedIn] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editComplete, setEditComplete] = useState(false);
  const [tagsToAdd, setTagsToAdd] = useState();
  const { state, api_url } = useContext(LeftoverContext);

  // Fetches leftover detail
  useEffect(() => {
    axios
      .get(`${api_url}/leftovers/${props.match.params.id}`)
      .then((res) => {
        setLeftover(res.data);
      })
      .catch(console.error);
  }, [api_url, props]);

  // Checks if the leftover owner is the logged in user
  useEffect(() => {
    if (leftover && state.username === leftover.owner) {
      setOwnerIsLoggedIn(true);
      console.log("owner is logged in");
      setTagsToAdd([...leftover.tags]);
    }
  }, [leftover, state]);

  // Updates the leftover with the edits
  function updateLeftover(e) {
    e.preventDefault();
    const updateRequest = {
      url: `${api_url}/leftovers/${leftover.id}`,
      config: {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
      body: {
        // expiration: `${formData.expiration.value}:00Z`,
        // description: formData.description.value,
        tags: tagsToAdd,
        // is_public: formData.is_public.value,
        // is_available: formData.is_public.value,
      },
    };
    axios
      .patch(updateRequest.url, updateRequest.body, updateRequest.config)
      .then((res) => setEditComplete(true))
      .catch();
    setEditMode(false);
  }

  return (
    <div>
      {editComplete ? (
        <Redirect to={`/leftovers/${props.match.params.id}`} />
      ) : (
        ""
      )}
      <div>{modal ? modal : ""}</div>
      {leftover ? (
        <div>
          <img src={leftover.image.image} width="200" alt={leftover.id} />
          <h3>{leftover.name}</h3>
          <p>@{leftover.owner}</p>
          <p>{leftover.description}</p>
          <Tags
            leftover={leftover}
            editMode={editMode}
            tagsToAdd={tagsToAdd}
            setTagsToAdd={setTagsToAdd}
          />
          <p>
            available: <i>{leftover.is_available.toString()}</i>
          </p>
        </div>
      ) : (
        "No Leftover Detail"
      )}
      {ownerIsLoggedIn ? (
        editMode ? (
          <>
            <button
              onClick={() =>
                setModal(
                  <DeleteModal setModal={setModal} leftover={leftover} />
                )
              }
            >
              Delete
            </button>
            <button onClick={updateLeftover}>Done</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit</button>
        )
      ) : (
        <button
          onClick={() =>
            setModal(
              <ClaimModal setModal={setModal} leftover={leftover} />
            )
          }
        >
          Claim
        </button>
      )}
    </div>
  );
}

export default LeftoverDetail;
