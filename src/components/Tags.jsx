import React, { useContext, useState } from "react";
import axios from "axios";
import { LeftoverContext } from "../LeftoverContext";
import { useEffect } from "react";

function Tags({ leftover }) {
  const { state, api_url } = useContext(LeftoverContext)
  const [ownerIsLoggedIn, setOwnerIsLoggedIn] = useState()

  useEffect(() => {
    if (state.username === leftover.owner) {
      setOwnerIsLoggedIn(true)
    }
  }, [leftover, state])

  function deleteTag(e) {
    e.stopPropagation()
    e.preventDefault()
    const newTags = leftover.tags.filter((item) => item !== e.target.name)
    const url = `${api_url}/leftovers/${leftover.id}`
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const request = { tags: newTags };
    axios
      .patch(url, request, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error);
  }

  const tags = leftover.tags.map((tagStr, i) => {
    return (
      <li className="tag" key={i}>
        {tagStr} <button name={tagStr} onClick={deleteTag}>x</button>
      </li>
    );
  });

  return (
    <ul style={{borderBlock: "solid"}}>
      {tags} 
      {ownerIsLoggedIn ? <button>+</button> : ""}
    </ul>
  )
}

export default Tags;
