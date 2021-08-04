import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { LeftoverContext } from '../../LeftoverContext';
import TagForm from './TagForm';
import { Form, TextArea, Container, Grid, Checkbox } from 'semantic-ui-react';

function LeftoverForm({ foodImage }) {
  const newLeftover = {
    name: '',
    expiration: '',
    image: foodImage.id,
    description: '',
    quantity: 1,
    price: 1,
    tags: [],
    is_public: 'true',
    is_available: 'true',
  };

  const { api_url } = useContext(LeftoverContext);
  const [newLeftoverId, setNewLeftoverId] = useState();
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const [formDataState, setFormDataState] = useState(newLeftover);

  const handleChange = e => {
    console.log(e.target);
    setFormDataState(old => ({ ...old, [e.target.id]: e.target.value }));
  };

  function createLeftover(e) {
    e.preventDefault();
    console.log('THE DATA', formDataState, tagsToAdd);
    const url = `${api_url}/leftovers/post`;
    const newLeftover = {
      name: foodImage.title,
      expiration: `${formDataState.expiration}:00Z`,
      image: foodImage.id,
      description: formDataState.description,
      quantity: 1,
      price: 1,
      tags: tagsToAdd,
      is_public: formDataState.is_public,
      is_available: 'true',
    };
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };
    console.log(newLeftover);
    axios.post(url, newLeftover, config).then(res => {
      console.log('THIS IS THE LEFTOVER CREATION RESPONSE', res.data);
      setNewLeftoverId(res.data.id);
    });
  }
  return (
    <Container centered style={{ padding: '1rem' }}>
      {newLeftoverId ? <Redirect to={`/leftovers/${newLeftoverId}`} /> : ''}
      <Form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Form.Input
          placeholder="expiration"
          type="datetime-local"
          name="expiration"
          id="expiration"
          value={formDataState.expiration}
          onChange={e =>
            setFormDataState(old => ({ ...old, expiration: e.target.value }))
          }
          style={{ height: '50px' }}
        />
        <TextArea
          placeholder="What's the story behind this leftover?"
          name="description"
          id="description"
          value={formDataState.description}
          onChange={handleChange}
        />
        <Checkbox
          name="is_public"
          id="is_public"
          type="checkbox"
          value={formDataState.description}
          label="Make it publicly available?"
          defaultChecked
          onChange={handleChange}
        />
      </Form>

      <Container>
        <TagForm tagsToAdd={tagsToAdd} setTagsToAdd={setTagsToAdd} />
      </Container>

      <Form.Button content="Submit Leftover" onClick={createLeftover} />
    </Container>
  );
}
export default LeftoverForm;
