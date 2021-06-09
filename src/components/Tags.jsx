import React, { useContext } from "react";
import axios from "axios";
import { LeftoverContext } from "../LeftoverContext";

function Tags({ leftover }) {
  const { api_url } = useContext(LeftoverContext)

  function deleteTag(e) {
    e.preventDefault();
    const newTags = leftover.tags.filter((item) => item !== e.target.name)
    const url = `${api_url}/leftovers/${leftover.id}`;
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

  const tags = leftover.tags.map((tagStr) => {
    return (
      <dev className="tag">
        {tagStr}
        <button name={tagStr} onClick={deleteTag}>x</button>
      </dev>
    );
  });

  return (
    <div>
      {tags}
    </div>
  )
}

export default Tags;
