import React from 'react';
import axios from 'axios';

function DeleteButton({buttonProps}) {

  function handleDelete(e) {
    e.preventDefault()

    const url = buttonProps.path
    const headers = {
      'Authorization': `JWT ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
    const request = buttonProps.request

    axios.put(url, request, headers)
    .then(res => {
      console.log(res)
    })
    .catch(error => console.error)
  }

  return (
    <div>
      <button name={buttonProps.name} onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteButton;