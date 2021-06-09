import React, { useContext } from 'react';
import axios from 'axios'
import { LeftoverContext } from '../LeftoverContext';

function BookForm({setBooks, books}) {

    const { api_url } = useContext(LeftoverContext)

    const createBook=(e, books)=>{
        e.preventDefault()
        const formData = e.target
        const newBook= {
            title: formData.title.value,
            year: formData.year.value,
            price: formData.price.value,
        }
        const config = {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${ api_url }/books/books/`, newBook, config)
        .then(res => {
            const newbooks = [res.data].concat(books)
            setBooks(newbooks)
            console.log('THIS IS THE BOOK CREATION RESPONSE', res.data)
        })
    }
    return (
        <div>
            <form onSubmit={e => createBook(e, books)}>
                <label>Title</label>
                <input type= 'text' name="title"/>
                <label>Year</label>
                <input type= 'text' name="year"/>
                <label>Price</label>
                <input type= 'text' name="price"/>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default BookForm;