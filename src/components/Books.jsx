import React, {useEffect, useState, useContext}  from 'react';
import axios from 'axios'
import Book from './Book';
import BookForm from './BookForm'
import { LeftoverContext } from '../LeftoverContext';


function Books(props) {

    const [books, setBooks] = useState([])
    const { state, api_url } = useContext(LeftoverContext)

    useEffect(() => {
        function getBook() {
            axios.get(`${ api_url }/books/books/`)
            .then(res => {
                setBooks(res.data)
                console.log(res.data)
            })
            .catch(console.error)
        }
        getBook()
    }, [api_url])



    return (
        state.loggedIn && books && 
        <div>
            <BookForm setBooks={setBooks} books={books} />
            {
                books.map((book, i) => <Book key={i} book={book} />)
            }
        </div>
    );
}

export default Books;