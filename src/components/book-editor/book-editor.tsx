import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCurrentBookID, IStore } from '../../react-redux/redux';

// import { makeStyles } from '@material-ui/core';
// import http from '../../http.service';
// import { BookApiCollection, BookApiItem } from '../../domainModel';
// import { IDataPreparedForTable } from './books-list.model';

const BookEditor = (props: any) => {
  // const callForBooks = (path: string, page: number) => {
  //   http
  //     .get(path, `page=${page + 1}`)
  //     .then(result => {
  //       setListOfBooks(result.data.data);
  //       setTotalItems(result.data.meta.totalItems);
  //     })
  //     .catch(error => console.error(error));
  // };

  const funkcja = () => {
    props.setCurrentBookID('ewewew');
    console.log('funckja:');
    console.log(props);
  };


  return (
    <section onClick={funkcja}>
      Book editor<Link to="">back</Link>
    </section>
  );
};

const mapStateToProps = (store: IStore) => ({
  bookID: store.bookID,
  store,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentBookID: (bookID: any) => dispatch(setCurrentBookID(bookID)),
  };
};

const Component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookEditor);

export default Component;
