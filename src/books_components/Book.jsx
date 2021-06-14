import React from 'react';

const Book = ({ book }) => {
  return (
    <div>
      <p>{ book.year }</p>
      <h1>{ book.title }</h1>
      <h2><i>price:</i> { book.price }</h2>
    </div>
  );
};

export default Book;