import React, { useState } from "react";
import FoodImageForm from "./FoodImageForm";
import LeftoverForm from "./LeftoverForm";

function AddLeftover() {

  const [foodImage, setFoodImage] = useState();
  return (
    <div>This is ADD Leftover
      <FoodImageForm foodImage={foodImage} setFoodImage={setFoodImage} />
      {foodImage ? <LeftoverForm foodImage={foodImage}/> : ""}
    </div>
  );
}

export default AddLeftover;
