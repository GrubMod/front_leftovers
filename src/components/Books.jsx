import React, {useEffect, useState, useContext}  from 'react';
import axios from 'axios'
import Book from './Book';
import BookForm from './BookForm'
import { LeftoverContext } from '../LeftoverContext';


function Books(props) {

    const [books, setBooks] = useState([])
    const { state } = useContext(LeftoverContext)

    useEffect(() => {
        function getBook() {
            axios.get('http://localhost:8000/books/books/')
            .then(res => {
                setBooks(res.data)
                console.log(res.data)
            })
            .catch(console.error)
        }
        getBook()
    }, [])



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