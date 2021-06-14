import React from "react";
import { List, Label, Icon, Button } from "semantic-ui-react";

function TagForm({ tagsToAdd, setTagsToAdd }) {
  function addTag(e) {
    e.preventDefault();
    const newTags = [...tagsToAdd];
    if (!newTags.includes(e.target.tag.value)) {
      newTags.push(e.target.tag.value.trim());
      setTagsToAdd(newTags);
    }
  }

  function removeTag(e) {
    e.preventDefault();
    const newTags = tagsToAdd.filter((tag) => tag !== e.target.name);
    setTagsToAdd(newTags);
  }

  // TODO: Need to add axios lookup of all tags available and input them into the drop down menu of the input

  const tagList = tagsToAdd.map((tagStr) => {
    return (
      <List.Item>
        <Button as="div" labelPosition="left" name={tagStr} onClick={removeTag}>
          <Label as="a" basic>
            {tagStr}
          </Label>
          <Button icon>
            <Icon name="fork" />
          </Button>
        </Button>
      </List.Item>
    );
  });

  return (
    <div>
      <form onSubmit={addTag}>
        <label>Enter Tag: </label>
        <input name="tag" type="text"></input>
        <button type="submit">add tag</button>
      </form>
      <List>{tagList}</List>
    </div>
  );
}

export default TagForm;
