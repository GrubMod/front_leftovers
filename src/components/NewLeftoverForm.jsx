import React, { useContext } from 'react';
import axios from 'axios';
import { LeftoverContext } from '../LeftoverContext';
import NewTagForm from './NewTagForm';


function NewLeftoverForm({ leftovers, setLeftovers }) {

  const { api_url } = useContext(LeftoverContext)

  function createLeftover(e, leftovers) {
    e.preventDefault()
    const url = `${ api_url }/leftovers/`
    const formData = e.target
    const newLeftover = {
      name: formData.name.value,
      expiration: formData.expiration.value,
      image: formData.image.value,
      description: formData.description.value,
      quantity: formData.quantity.value,
      price: formData.price.value,
      is_public: formData.is_public.value,
      is_available: formData.is_available.value,
    }
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
    axios.post(url, newLeftover, config)
    .then(res => {
      const newLeftovers = [res.data].concat(leftovers)
      setLeftovers(newLeftovers)
      console.log('THIS IS THE LEFTOVER CREATION RESPONSE', res.data)
    })
  }
  return (
    <div>
      <form onSubmit={e => createLeftover(e, leftovers)}>
        <label>Name </label>
        <input name='name' type='text'/>
        <label>Expiration </label>
        <input name='expiration' type='datetime-local'/>
        <label>Image </label>
        <input name='image' type='url'/>
        <label>Description </label>
        <textarea name='description'/>
        <label>Quantity </label>
        <input name='quantity' type='number'/>
        <label>Price </label>
        <input name='price' type='number'/>
        <label>Tags </label>
        <NewTagForm />
        <label>Make Public? </label>
        <input name='is_public' type='checkbox' value='true'/>
        <label>Available? </label>
        <input name='is_available' type='checkbox' value='true'/>
        <button type='submit'>Post</button>
      </form>
    </div>
  );
}
export default NewLeftoverForm;
