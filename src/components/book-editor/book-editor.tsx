import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setEditorOpen, IStore } from '../../react-redux/redux';

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

  useEffect(() => {
    props.setEditorOpen(true);
  }, []);


  return <section>{props.match.url}</section>;
};

const mapStateToProps = (store: IStore) => ({
  editorIsOpen: store.editorIsOpen,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setEditorOpen: (boo: any) => dispatch(setEditorOpen(boo)),
  };
};

const Component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookEditor);

export default Component;
