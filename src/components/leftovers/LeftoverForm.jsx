import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { LeftoverContext } from "../../LeftoverContext";
import TagForm from "./TagForm";

function LeftoverForm({ foodImage }) {
  const { api_url } = useContext(LeftoverContext);
  const [newLeftoverId, setNewLeftoverId] = useState();
  const [tagsToAdd, setTagsToAdd] = useState([]);

  function createLeftover(e) {
    e.preventDefault();
    const url = `${api_url}/leftovers/post`;
    const formData = e.target;
    const newLeftover = {
      name: foodImage.title,
      expiration: `${formData.expiration.value}:00Z`,
      image: foodImage.id,
      description: formData.description.value,
      quantity: 1,
      price: 1,
      tags: tagsToAdd,
      is_public: formData.is_public.value,
      is_available: "true",
    };
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    console.log(newLeftover);
    axios.post(url, newLeftover, config).then((res) => {
      console.log("THIS IS THE LEFTOVER CREATION RESPONSE", res.data);
      setNewLeftoverId(res.data.id);
    });
  }
  return (
    <div>
      {newLeftoverId ? <Redirect to={`/leftovers/${newLeftoverId}`} /> : ""}
      <form onSubmit={createLeftover}>
        <label>Expiration </label>
        <input name="expiration" type="datetime-local" />
        <label>Description </label>
        <textarea name="description" />
        {/* <label>Price </label>
        <input name='price' type='number'/> */}
        <input name="is_public" type="checkbox" value={true} defaultChecked />
        <label>Make Public? </label>
        <button type="submit">Post</button>
      </form>

      <TagForm tagsToAdd={tagsToAdd} setTagsToAdd={setTagsToAdd}/>
    </div>
  );
}
export default LeftoverForm;
