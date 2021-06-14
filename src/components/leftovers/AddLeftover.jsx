import React, { useState } from "react";
import FoodImageForm from "./FoodImageForm";
import LeftoverForm from "./LeftoverForm";
import {Container} from 'semantic-ui-react';
import LeftoverTensor from '../tensorflow/LeftoverTensor'

function AddLeftover() {
  const [foodImage, setFoodImage] = useState();
  const [formDataProp, setFormDataProp] = useState();
  return (
    <Container>
      <LeftoverTensor setFormDataProp={setFormDataProp}/>
      <FoodImageForm foodImage={foodImage} setFoodImage={setFoodImage} formDataProp={formDataProp} />
      {foodImage ? <LeftoverForm foodImage={foodImage} /> : ""}
    </Container>
  );
}

export default AddLeftover;
