import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import { setEditorOpen, setCurrentTitle, IStore } from '../../react-redux/redux';

// import { makeStyles } from '@material-ui/core';
import http from '../../http.service';
// import { BookApiCollection, BookApiItem } from '../../domainModel';
// import { IDataPreparedForTable } from './books-list.model';

const BookEditor = (props: any) => {
  const { match } = props;
  const { url } = match;

  const [titleF, setTitle] = useState('Loading...');

  useEffect(() => {
    console.warn(props.store);
    setEditorOpen(true);
  }, []);

  useEffect(() => {
    setCurrentTitle(titleF);
  }, [titleF]);

  const callForSingleBook = (path: string) => {
    http
      .get(path)
      .then(result => {
        console.dir(result);
        setTitle(result.data.data.attributes.title);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    callForSingleBook(url);
  }, [url]);

  return (
    <React.Fragment>
      <Formik
        initialValues={{ title: titleF }}
        validate={values => {
          const errors = {
            title: '',
          };
          if (!values.title) {
            errors.title = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            {errors.title && touched.title && errors.title}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <button onClick={() => setEditorOpen(true)}>click</button>
    </React.Fragment>
  );
};

const mapStateToProps = (store: IStore) => ({
  editorIsOpen: store.editorIsOpen,
  store,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentTitle: (string: string) => dispatch(setCurrentTitle(string)),
    setEditorOpen: (boo: boolean) => dispatch(setEditorOpen(boo)),
  };
};

const Component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookEditor);

export default Component;
