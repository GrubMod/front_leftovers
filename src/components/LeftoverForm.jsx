import React, { useContext } from 'react';
import axios from 'axios';
import { LeftoverContext } from '../LeftoverContext';
import TagForm from './TagForm';


function LeftoverForm({ leftovers, setLeftovers }) {

  const { api_url } = useContext(LeftoverContext)

  function createLeftover(e) {
    e.preventDefault()
    const url = `${ api_url }/leftovers/`
    const formData = e.target
    const newLeftover = {
      name: formData.name.value,
      expiration: `${formData.expiration.value}:00Z`,
      image: "http://fake.com",
      description: formData.description.value,
      quantity: "1",
      price: formData.price.value,
      tags: "1",
      is_public: formData.is_public.value,
      is_available: "true",
    }
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
    console.log(newLeftover)
    axios.post(url, newLeftover, config)
    .then(res => {
      const newLeftovers = [res.data].concat(leftovers)
      setLeftovers(newLeftovers)
      console.log('THIS IS THE LEFTOVER CREATION RESPONSE', res.data)
    })
  }
  return (
    <div>
      <form onSubmit={createLeftover}>
        <label>Name </label>
        <input name='name' type='text'/>
        <label>Expiration </label>
        <input name='expiration' type='datetime-local'/>
        <label>Description </label>
        <textarea name='description'/>
        <label>Price </label>
        <input name='price' type='number'/>
        <input name='is_public' type='checkbox' value={true} defaultChecked/>
        <label>Make Public? </label>
        <button type='submit'>Post</button>
      </form>
      
      <TagForm />
    </div>
  );
}
export default LeftoverForm;
