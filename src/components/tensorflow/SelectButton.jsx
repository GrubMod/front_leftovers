import React from 'react';

const SelectButton = ({ label }) => {
  return (
    <div>
      <button style={{fontSize:"2rem"}}>{ label }</button>
    </div>
  );
};

export default SelectButton;
