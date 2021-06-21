import React, { useState } from "react";
// import FoodImageForm from "./FoodImageForm";
import LeftoverForm from "./LeftoverForm";
import {Container, Card, Image} from 'semantic-ui-react';
import LeftoverTensor from '../tensorflow/LeftoverTensor'

function AddLeftover() {
  const [foodImage, setFoodImage] = useState();
  const [formDataProp, setFormDataProp] = useState();
  return (
    <Container>
      {foodImage ? 
              <>
              <Container centered style={{padding: "1rem"}}>

                  <Card centered>
                      <figure>
                      <Image src={foodImage.image} alt={foodImage.title} size='small' centered />
                          <figcaption style={{textAlign:"center"}}>{foodImage.title}</figcaption>
                      </figure>
                  </Card>

          </Container>
           <LeftoverForm foodImage={foodImage} />
           </>
      : 
      <LeftoverTensor setFormDataProp={setFormDataProp} setFoodImage={setFoodImage}/>
      }


    </Container>
  );
}

export default AddLeftover;
