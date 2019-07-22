import React from 'react';

import SingleBookRecord from './single-book-record';
import http from '../../services/HTTP.service';

interface IProps {}

const BooksList = (props: IProps) => {
  http.get('/books').then(result => {
    console.warn('working! development process...')
    console.dir(result);
  });
  return (
    <section>
      <SingleBookRecord />
    </section>
  );
};

export default BooksList;
