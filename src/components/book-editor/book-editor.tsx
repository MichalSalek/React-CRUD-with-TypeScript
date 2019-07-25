import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

import { setEditorOpen, setCurrentTitle, IStore } from '../../react-redux/redux';
import dateConverter from './date-converter';

import http from '../../http.service';
import compareChecksum from './checksum-comparision';
// import { BookApiCollection, BookApiItem } from '../../domainModel';
// import { IDataPreparedForTable } from './books-list.model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);

const BookEditor = (props: any) => {
  const classes = useStyles();
  const { match } = props;
  const { url } = match;

  const [callResolve, setCallResolve] = useState(false);
  const [titleState, setTitleState] = useState('Loading...');
  const [ISBNState, setISBNState] = useState('Loading...');
  const [descriptionState, setDescriptionState] = useState('Loading...');
  const [authorState, setAuthorState] = useState('Loading...');
  const [publicationDateState, setPublicationDateState] = useState('Loading...');
  const [reviewsState, setReviewsState] = useState([]);
  const [checksumString, setChecksumString] = useState('');
  const [newValuesString, setNewValuesString] = useState('');
  const [submitting, setSubmitting] = useState(true);

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
        const rawData = result.data.data.attributes;
        const relationshipsForBook = result.data.data.relationships;
        setChecksumString(
          rawData.title +
            rawData.isbn +
            rawData.description +
            rawData.author +
            dateConverter(rawData.publicationDate, 'cut-time'),
        );

        setTitleState(rawData.title);
        setISBNState(rawData.isbn);
        setDescriptionState(rawData.description);
        setAuthorState(rawData.author);
        setPublicationDateState(dateConverter(rawData.publicationDate, 'cut-time'));

        setReviewsState(relationshipsForBook.reviews.data);
        setCallResolve(true);
        return null;
      })
      .catch(error => console.error(error));
    return null;
  };

  useEffect(() => {
    callForSingleBook(url);
  }, [url]);

  // useEffect(() =>
  //   console.warn(
  //     callResolve,
  //     titleState,
  //     ISBNState,
  //     descriptionState,
  //     authorState,
  //     publicationDateState,
  //     reviewsState,
  //   ),
  // );

  const handleChange = (e: any) => {
    switch (e.currentTarget.id) {
      case 'book-title':
        setTitleState(e.currentTarget.value);
        break;
      case 'book-isbn':
        setISBNState(e.currentTarget.value);
        break;
      case 'book-description':
        setDescriptionState(e.currentTarget.value);
        break;
      case 'book-author':
        setAuthorState(e.currentTarget.value);
        break;
      case 'book-publication-date':
        setPublicationDateState(e.currentTarget.value);
        break;
      default:
        break;
    }
    return null;
  };

  useEffect(() => {
    setNewValuesString(
      titleState + ISBNState + descriptionState + authorState + publicationDateState,
    );
  }, [titleState, ISBNState, descriptionState, authorState, publicationDateState]);

  useEffect(() => {
    setSubmitting(compareChecksum(checksumString, newValuesString));
  }, [newValuesString]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

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
          onSubmit={e => handleSubmit(e)}
        >
          {() => (
            <form
              className={classes.container}
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
            >
              <TextField
                id="book-title"
                label="Book"
                className={classes.textField}
                placeholder="Enter title of the book."
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={titleState}
              />
              <TextField
                id="book-isbn"
                label="ISBN"
                className={classes.textField}
                placeholder="Enter isbn number."
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={ISBNState}
              />
              <TextField
                id="book-description"
                label="Description"
                className={classes.textField}
                placeholder="Enter description of the book."
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={descriptionState}
              />
              <TextField
                id="book-author"
                label="Author"
                className={classes.textField}
                placeholder="Author of the book."
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={authorState}
              />
              <TextField
                id="book-publication-date"
                label="Publication date"
                type="date"
                placeholder="Enter a publication date."
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={publicationDateState}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <button disabled={submitting} type="submit">
                {' '}
                Update informations{' '}
              </button>
            </form>
          )}
        </Formik>
      ) : (
        <>
          <CircularProgress /> <span> Loading your book info... </span>
        </>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (store: IStore) => ({
  editorIsOpen: store.editorIsOpen,
  // console.log <-- to delete :-)
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
