import React, { useState } from 'react';

function NewTagForm(props) {
  const [tagsArr, setTagsArr] = useState([])





  return (
    <div>
      <input name='tags' type="text"></input>
    </div>
  );
}

export default NewTagForm;