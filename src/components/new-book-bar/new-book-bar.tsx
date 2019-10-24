// node_modules
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Close, Edit, ArrowBack } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';

import { appLoading, initReload, IStore } from '../../common/redux';
import dateConverter from '../../common/plugins/date-converter';
import validateISBN from '../../common/plugins/validate-isbn';
import http from '../../http.service';

// Style
import { newBookBarStyle } from './new-book-bar.style';

// Props interface
interface IProps extends IStore {
  initReload: any;
  appLoading: any;
}

const NewBookBar = (props: IStore | IProps) => {
  const s = newBookBarStyle();
  const { editorIsOpen, currentTitle } = props;

  // State
  const [editorMode, setEditorMode] = useState(false);
  useEffect(() => {
    // Warning fix:
    // Can't perform a React state update on an unmounted component.
    setTimeout(() => {
      setEditorMode(editorIsOpen);
    }, 50);
  }, [editorIsOpen]);
  const [titleState, setTitleState] = useState('');
  const [ISBNState, setISBNState] = useState('');
  const [ISBNInvalid, setISBNInvalid] = useState(false);
  const [descriptionState, setDescriptionState] = useState('');
  const [authorState, setAuthorState] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessAlert(false);
    setOpenErrorAlert(false);
  };
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
      default:
        break;
    }
    return null;
  };

  useEffect(() => {
    const formValidation = () => {
      switch (true) {
        case titleState === '':
          return true;
        case ISBNState === '':
          return true;
        case descriptionState === '':
          return true;
        case authorState === '':
          return true;
        default:
          return false;
      }
    };

    setSubmitting(formValidation());
  }, [titleState, ISBNState, descriptionState, authorState]);

  useEffect(() => {
    if (ISBNInvalid) {
      setSubmitting(true);
    }
  }, [ISBNInvalid]);

  const sendNewBook = () => {
    const data = {
      author: authorState,
      description: descriptionState,
      isbn: ISBNState,
      publicationDate: dateConverter('', 'today'),
      title: titleState,
    };

    http
      .post('/books', data)
      .then(() => {
        setSubmitting(true);
        setOpenSuccessAlert(true);
        props.initReload(Math.random());
        setTitleState('');
        setISBNState('');
        setDescriptionState('');
        setAuthorState('');
        props.appLoading(false);
      })
      .catch(() => {
        setSubmitting(false);
        setOpenErrorAlert(true);
      });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.appLoading(true);
    setSubmitting(true);
    sendNewBook();
  };

  return (
    <React.Fragment>
      {editorMode ? (
        <section className={s.appBodyHeadingBar}>
          <Typography variant="h5" color="inherit">
            {editorMode ? currentTitle : 'Books'}
          </Typography>

          <Link to="/">
            <Tooltip title="Back">
              <IconButton aria-label="Back" color="primary">
                <ArrowBack />
              </IconButton>
            </Tooltip>
          </Link>
        </section>
      ) : (
        <section className={s.headingBar}>
          <div className={s.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={
                  <Tooltip title="Add a book">
                    <Edit />
                  </Tooltip>
                }
                aria-controls="new-review"
                id="new-review"
              >
                <Typography variant="h5">Books</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
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
                      className={s.container}
                      autoComplete="off"
                      noValidate
                      onSubmit={handleSubmit}
                    >
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
                          ISBNInvalid
                            ? 'This value is neither a valid ISBN-10 nor a valid ISBN-13.'
                            : ''
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
                      <Button
                        disabled={submitting}
                        type="submit"
                        variant="outlined"
                        color="primary"
                        className={s.button}
                      >
                        Add the book
                      </Button>
                    </form>
                  )}
                </Formik>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>

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
            message={<span id="message-id">Book has been added!</span>}
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
            message={<span id="message-id">Something went wrong...</span>}
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
        </section>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (store: IStore) => ({
  currentTitle: store.currentTitle,
  editorIsOpen: store.editorIsOpen,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    appLoading: (boo: boolean) => dispatch(appLoading(boo)),
    initReload: (number: number) => dispatch(initReload(number)),
  };
};

const Component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewBookBar);

export default Component;
