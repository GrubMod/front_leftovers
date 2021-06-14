import React, { useState } from "react";
import FoodImageForm from "./FoodImageForm";
import LeftoverForm from "./LeftoverForm";
import {Container} from 'semantic-ui-react'

function AddLeftover() {
  const [foodImage, setFoodImage] = useState();
  return (
    <Container>
      <FoodImageForm foodImage={foodImage} setFoodImage={setFoodImage} />
      {foodImage ? <LeftoverForm foodImage={foodImage} /> : ""}
    </Container>
  );
}

export default AddLeftover;
