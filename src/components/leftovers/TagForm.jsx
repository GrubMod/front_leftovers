import React from "react";
import { List, Label, Icon, Input, Form } from "semantic-ui-react";

function TagForm({ tagsToAdd, setTagsToAdd }) {
  function addTag(e) {
    e.preventDefault();
    const newTags = [...tagsToAdd];
    if (!newTags.includes(e.target.tag.value)) {
      newTags.push(e.target.tag.value.trim());
      setTagsToAdd(newTags);
    }
    e.target.tag.value = ""
  }

  function removeTag(e) {
    e.preventDefault();
    const newTags = tagsToAdd.filter((tag) => tag !== e.target.innerText);
    setTagsToAdd(newTags);
  }

  // TODO: Need to add axios lookup of all tags available and input them into the drop down menu of the input

  const tagList = tagsToAdd.map((tagStr) => {
    return (
      <List.Item>
        <Label name={tagStr} onClick={removeTag}>
          {tagStr}
          <Icon name="delete" />
        </Label>
      </List.Item>
    );
  });

  return (
    <div>
      <Form onSubmit={addTag}>
        <Input
          name="tag"
          icon="tags"
          iconPosition="left"
          label={{ tag: true, content: "Add Tag" }}
          labelPosition="right"
          placeholder="Enter tags"
        />
      </Form>
      <List horizontal>{tagList}</List>
    </div>
  );
}

export default TagForm;
