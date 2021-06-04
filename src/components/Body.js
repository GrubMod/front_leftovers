import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Form from './Form'


function Body(props) {
    const [book, setBook] = useState([])

    useEffect(() => {
        function getBook() {
            axios.get('http://localhost:8000/books/')
            .then(res => {
                setBook(res.data)
                console.log(res.data)
            })
            .catch(console.error)
        }
        getBook()
    }, [])
    return (
        <div>
            <Form />
        </div>
    );
}

export default Body;