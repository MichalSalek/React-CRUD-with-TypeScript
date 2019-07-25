import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import { setEditorOpen, setCurrentTitle, IStore } from '../../react-redux/redux';

// import { makeStyles } from '@material-ui/core';
import http from '../../http.service';
// import { BookApiCollection, BookApiItem } from '../../domainModel';
// import { IDataPreparedForTable } from './books-list.model';

interface IGetResponse {
  status: number;
}

const BookEditor = (props: any) => {
  const { match } = props;
  const { url } = match;

  const [callResolve, setCallResolve] = useState(false);
  const [titleState, setTitleState] = useState('Loading...');
  const [ISBNState, setISBNState] = useState('Loading...');
  const [descriptionState, setDescriptionState] = useState('Loading...');
  const [authorState, setAuthorState] = useState('Loading...');

  useEffect(() => {
    props.setEditorOpen(true);
  }, []);

  useEffect(() => {
    props.setCurrentTitle(titleState);
  }, [titleState]);

  const callForSingleBook = (path: string) => {
    http
      .get(path)
      .then(result => {
        const statusOfResponse = result.status;
        if (!statusOfResponse) {
          return null;
        }
        const bookRawData = result.data.data.attributes;
        console.dir(result);
        setTitleState(bookRawData.title);
        setISBNState(bookRawData.isbn);
        setDescriptionState(bookRawData.description);
        setAuthorState(bookRawData.author);
        setCallResolve(true);
        return null;
      })
      .catch(error => console.error(error));
    return null;
  };

  useEffect(() => {
    callForSingleBook(url);
  }, [url]);

  useEffect(() => console.warn(props.store));

  return (
    <React.Fragment>
      {callResolve ? (
        <Formik
          initialValues={{ title: titleState }}
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
      ) : (
        'Loading your book info...'
      )}
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
