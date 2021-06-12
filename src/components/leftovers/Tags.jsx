import React from "react";
import TagForm from "./TagForm";

function Tags({ leftover, editMode, tagsToAdd, setTagsToAdd }) {
  const tags = leftover.tags.map((tagStr, i) => {
    return (
      <li className="tag" key={i}>
        {tagStr}
      </li>
    );
  });

  return (
    <ul style={{ borderBlock: "solid" }}>
      {editMode ? (
        <TagForm tagsToAdd={tagsToAdd} setTagsToAdd={setTagsToAdd} />
      ) : (
        tags
      )}
    </ul>
  );
}

export default Tags;
