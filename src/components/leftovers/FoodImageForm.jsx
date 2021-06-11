import React, { useContext, useState, useRef } from 'react';
import { LeftoverContext } from '../../LeftoverContext';
import axios from 'axios';

function FoodImageForm(props) {
    const { api_url } = useContext(LeftoverContext);
    const fileInput = useRef();
    const [formDataState, setFormDataState] = useState({ title: '' });

    const handleChange = e => {
        setFormDataState({
            [e.target.id]: e.target.value,
        });
    };

    function uploadFoodImage(e) {
        e.preventDefault();
        const url = `${api_url}/food-images/`;

        let form_data = new FormData();
        form_data.append('title', formDataState.title);
        form_data.append(
            'image',
            fileInput.current.files[0],
            fileInput.current.files[0].name
        );

        const config = {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        axios
            .post(url, form_data, config)
            .then(res => res)
            .catch(error => console.error);
    }

    return (
        <div>
            <form onSubmit={uploadFoodImage}>
                <p>
                    <input
                        type="text"
                        placeholder="Title"
                        id="title"
                        value={formDataState.title}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        ref={fileInput}
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg"
                        required
                    />
                </p>
                <input type="submit" />
            </form>
        </div>
    );
}

export default FoodImageForm;
