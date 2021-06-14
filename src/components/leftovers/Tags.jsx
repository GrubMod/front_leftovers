import React from "react";
import TagForm from "./TagForm";
import { List, Label } from 'semantic-ui-react'

function Tags({ leftover, editMode, tagsToAdd, setTagsToAdd }) {
  const tags = leftover.tags.map((tagStr, i) => {
    return (
      <List.Item key={i}>
        <Label>{tagStr}</Label>
      </List.Item>
    );
  });

  return (
    <List horizontal>
      {editMode ? (
        <TagForm tagsToAdd={tagsToAdd} setTagsToAdd={setTagsToAdd} />
      ) : (
        tags
      )}
    </List>
  );
}

export default Tags;
