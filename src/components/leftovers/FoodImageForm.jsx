import React, { useContext } from 'react';
import { LeftoverContext } from '../../LeftoverContext';
import axios from 'axios'

function FoodImageForm(props) {
  const { api_url } = useContext(LeftoverContext)

  function uploadFoodImage(e){
    e.preventDefault()
    const url = `${ api_url }/food-images/`
    const formData = e.target
    const newFoodImage = {
      title: formData.title.value,
      image: formData.image.value
    }
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }

    console.log(`request body:`)
    console.log(newFoodImage)
    // axios.post(url, newFoodImage, config)
    // .then(res => {
    //   console.log('THIS IS THE FoodImage CREATION RESPONSE', res.data)
    // })
    // .catch(error => console.error)
  }

  return (
    <div>
      <form onSubmit={uploadFoodImage}>
        <label>Title</label>
        <input type='text' name='title'/>
        <label>Image</label>
        <input type='file' name='image' />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
}

export default FoodImageForm;