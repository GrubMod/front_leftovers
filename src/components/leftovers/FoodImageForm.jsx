import React, { useContext, useState, useRef } from 'react';
import { LeftoverContext } from '../../LeftoverContext';
import axios from 'axios';
import {Container, Image, Form, Ref, Card, Grid} from 'semantic-ui-react';

function FoodImageForm({ foodImage, setFoodImage }) {
    const { api_url } = useContext(LeftoverContext);
    const fileInput = useRef();
    const [formDataState, setFormDataState] = useState({ title: '' });

    // if foodImage, run uploadFoodImage with said image data
    // the data would be passed from the image predictor

    const handleChange = e => {
        setFormDataState({
            [e.target.id]: e.target.value,
        });
    };

    function uploadFoodImage(e) {
      console.log(fileInput.current)
        e.preventDefault();
        const url = `${api_url}/food-images/`;

        let form_data = new FormData();
        form_data.append('title', formDataState.title);
        form_data.append(
            'image',
            fileInput.current.querySelector('input').files[0],
            fileInput.current.querySelector('input').files[0].name
        );

        const config = {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        axios
            .post(url, form_data, config)
            .then(res => {
                console.log(res);
                setFoodImage(res.data);
            })
            .catch(error => console.error);
    }

    return (
        <Container centered style={{padding: "1rem"}}>
            {foodImage ? (
                <Card centered>
                    <figure>
                    <Image src={foodImage.image} alt={foodImage.title} size='small' centered />
                        <figcaption style={{textAlign:"center"}}>{foodImage.title}</figcaption>
                    </figure>
                </Card>
            ) : (
              <Form onSubmit={uploadFoodImage}>

                  <Form.Input
                      type="text"
                      placeholder="Title"
                      id="title"
                      value={formDataState.title}
                      onChange={handleChange}
                      required
                  />
                  <Ref innerRef={fileInput}>
                  <Form.Input
                      type="file"
                      id="image"
                      accept="image/png, image/jpeg"
                      required
                  />
                  </Ref>
                  <Form.Button content="Continue" />

          </Form>
            )}
        </Container>
    );
}

export default FoodImageForm;
