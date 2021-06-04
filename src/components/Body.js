import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Form from './Form'
import Login from './Login'


function Body(props) {
    const [books, setBooks] = useState([])

    useEffect(() => {
        function getBook() {
            axios.get('http://localhost:8000/books/')
            .then(res => {
                setBooks(res.data)
                console.log(res.data)
            })
            .catch(console.error)
        }
        getBook()
    }, [])
    return (
        <div>
            <Form />
            <Login />
        </div>
    );
}

export default Body;