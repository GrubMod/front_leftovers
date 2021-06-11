import React, { useState } from 'react';

function TagForm(props) {
  const [tagsToAdd, setTagsToAdd] = useState([])

  function addTag(e){
    e.preventDefault()
    const newTags = [...tagsToAdd]
    if (!newTags.includes(e.target.tag.value)) {
      newTags.push(e.target.tag.value.trim())
      setTagsToAdd(newTags)
    }
  }

  function removeTag(e){
    e.preventDefault();
    const newTags = tagsToAdd.filter((tag) => tag !== e.target.name)
    setTagsToAdd(newTags)
  }

  // Need to add axios lookup of all tags available and input them into the drop down menu of the input

  const tagList = tagsToAdd.map((tagStr) => {
    return (
      <button className="tag">
        {tagStr} <button name={tagStr} onClick={removeTag}>x</button>
      </button>
    )
  })

  return (
    <div>
      <form onSubmit={addTag}>
        <label>Tags </label>
        <input name='tag' type="text"></input>
        <button type="submit">add tag</button>
      </form>
      <ul>
        {tagList}
      </ul>
    </div>
  );
}

export default TagForm;