// node_modules
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';

import { appLoading, IStore, setCurrentTitle, setEditorOpen } from '../../common/redux';
import dateConverter from '../../common/plugins/date-converter';
import http from '../../http.service';
import compareChecksum from '../../common/plugins/checksum-comparision';
import ReviewsComponent from '../reviews-table/reviews-table';
import HeadingBarNewReview from '../new-review/new-review-bar';
import validateISBN from '../../common/plugins/validate-isbn';
// Style
import { bookEditorStyle } from './book-editor.style';

interface IProps extends IStore {
  appLoading: any;
  setCurrentTitle: any;
  setEditorOpen: any;
  match: { url: string };
}

const BookEditor = (props: IProps) => {
  const s = bookEditorStyle();
  const { match } = props;
  const { url } = match;

  const [callResolve, setCallResolve] = useState(false);
  const [titleState, setTitleState] = useState('Loading...');
  const [ISBNState, setISBNState] = useState('Loading...');
  const [ISBNInvalid, setISBNInvalid] = useState(false);
  const [descriptionState, setDescriptionState] = useState('Loading...');
  const [authorState, setAuthorState] = useState('Loading...');
  const [publicationDateState, setPublicationDateState] = useState('Loading...');
  const [checksumString, setChecksumString] = useState('');
  const [newValuesString, setNewValuesString] = useState('');
  const [submitting, setSubmitting] = useState(true);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessAlert(false);
    setOpenErrorAlert(false);
  };

  useEffect(() => {
    props.setEditorOpen(true);
  }, [props]);

  useEffect(() => {
    props.setCurrentTitle(titleState);
  }, [titleState, props]);

  const callForSingleBook = (path: string) => {
    http
      .get(path)
      .then(result => {
        const statusOfResponse = result.status;
        if (statusOfResponse !== 200) {
          console.error('We have a problem, check network tab.');
          return null;
        }
        const rawData = result.data.data.attributes;
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

        setCallResolve(true);
        props.appLoading(false);
        return null;
      })
      .catch(error => console.error(error));
    return null;
  };

  useEffect(() => {
    callForSingleBook(url);
  }, [url]);

  const handleChange = (e: any) => {
    switch (e.currentTarget.id) {
      case 'book-title':
        setTitleState(e.currentTarget.value);
        break;
      case 'book-isbn':
        setISBNInvalid(!validateISBN(e.currentTarget.value));
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

  const setAllValuesStringToComparision = () =>
    titleState + ISBNState + descriptionState + authorState + publicationDateState;

  useEffect(() => {
    setNewValuesString(setAllValuesStringToComparision());
  }, [titleState, ISBNState, descriptionState, authorState, publicationDateState]);

  useEffect(() => {
    if (!ISBNInvalid) {
      setSubmitting(compareChecksum(checksumString, newValuesString));
    } else {
      setSubmitting(true);
    }
  }, [checksumString, newValuesString, ISBNInvalid]);

  const putNewDataToThisBook = (path: string) => {
    const data = {
      author: authorState,
      description: descriptionState,
      isbn: ISBNState,
      publicationDate: dateConverter(publicationDateState, 'add-time'),
      title: titleState,
    };
    setChecksumString(setAllValuesStringToComparision());
    http
      .put(path, data)
      .then(() => {
        setSubmitting(true);
        setOpenSuccessAlert(true);
        props.appLoading(false);
      })
      .catch(error => {
        console.error(error);
        setSubmitting(false);
        setOpenErrorAlert(true);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.appLoading(true);
    setSubmitting(true);
    putNewDataToThisBook(url);
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
            <form className={s.container} autoComplete="off" noValidate onSubmit={handleSubmit}>
              <TextField
                id="book-title"
                label="Book"
                className={s.textField}
                placeholder="Enter title of the book."
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={titleState}
              />
              <TextField
                error={ISBNInvalid}
                helperText={
                  ISBNInvalid ? 'This value is neither a valid ISBN-10 nor a valid ISBN-13.' : ''
                }
                id="book-isbn"
                label={ISBNInvalid ? 'Error' : 'ISBN'}
                className={s.textField}
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
                className={s.textField}
                placeholder="Enter description of the book."
                fullWidth
                multiline
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={descriptionState}
              />
              <TextField
                id="book-author"
                label="Author"
                className={s.textField}
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
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                value={publicationDateState}
                className={s.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                disabled={submitting}
                type="submit"
                variant="outlined"
                color="primary"
                className={s.button}
              >
                Update
              </Button>
            </form>
          )}
        </Formik>
      ) : (
        <>
          <CircularProgress /> <span> Loading your book info... </span>
        </>
      )}
      <Snackbar
        key="SnackbaropenSuccess"
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        open={openSuccessAlert}
        autoHideDuration={2200}
        onClose={handleCloseAlert}
        message={<span id="message-id">Book information has been updated!</span>}
        action={[
          <Tooltip key="close1" title="Close">
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={s.close}
              onClick={handleCloseAlert}
            >
              <Close />
            </IconButton>
          </Tooltip>,
        ]}
      />
      <Snackbar
        key="SnackbaropenError"
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        open={openErrorAlert}
        autoHideDuration={2200}
        onClose={handleCloseAlert}
        message={<span id="message-id">Something went wrong with the update.</span>}
        action={[
          <Tooltip key="close2" title="Close">
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={s.close}
              onClick={handleCloseAlert}
            >
              <Close />
            </IconButton>
          </Tooltip>,
        ]}
      />
      <HeadingBarNewReview url={url} />
      <ReviewsComponent bookID={url} />
    </React.Fragment>
  );
};

const mapStateToProps = (store: IStore) => ({
  editorIsOpen: store.editorIsOpen,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    appLoading: (boo: boolean) => dispatch(appLoading(boo)),
    setCurrentTitle: (string: string) => dispatch(setCurrentTitle(string)),
    setEditorOpen: (boo: boolean) => dispatch(setEditorOpen(boo)),
  };
};

const Component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookEditor);

export default Component;
