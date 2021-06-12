import React, { useContext } from "react";
import { LeftoverContext } from "../../LeftoverContext";

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

export default ClaimModal;
