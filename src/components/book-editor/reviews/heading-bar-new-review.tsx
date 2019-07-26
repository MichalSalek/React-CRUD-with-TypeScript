import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Close, Edit } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import dateConverter from '../../common/date-converter';
import http from '../../../http.service';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    close: {
      background: '#111',
      margin: '0.5rem',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    headingBar: {
      alignItems: 'center',
      display: 'flex',
      height: '55px',
      justifyContent: 'space-between',
      margin: theme.spacing(5, 0, 1, 0),
    },
    headingText: {
      color: '#666',
      fontSize: '1rem',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);

interface IProps {
  url: string;
}

const HeadingBarNewReview = (props: IProps) => {
  const classes = useStyles();
  const { url } = props;
  dateConverter('', 'today')
  const [callResolve, setCallResolve] = useState(false);

  const [reviewBodyState, setReviewBodyState] = useState('');
  const [authorState, setAuthorState] = useState('');
  const [ratingState, setRatingState] = useState('');

  const [submitting, setSubmitting] = useState(true);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const handleOpenSuccessAlert = () => {
    setOpenSuccessAlert(true);
  };
  const handleOpenErrorAlert = () => {
    setOpenErrorAlert(true);
  };

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessAlert(false);
    setOpenErrorAlert(false);
  };

  const handleChange = (e: any) => {
    switch (e.currentTarget.id) {
      case 'review-body':
        setReviewBodyState(e.currentTarget.value);
        break;
      case 'review-author':
        setAuthorState(e.currentTarget.value);
        break;
      case 'review-rating':
        setRatingState(e.currentTarget.value);
        break;

      default:
        break;
    }
    return null;
  };

  const postNewReview = (path: string) => {
    const data = {
      author: authorState,
      body: reviewBodyState,
      book: url,
      publicationDate: dateConverter('', 'today'),
      rating: ratingState,
    };
    http
      .post(path, data)
      .then(() => {
        setSubmitting(true);
        handleOpenSuccessAlert();
      })
      .catch(error => {
        console.error(error);
        setSubmitting(false);
        handleOpenErrorAlert();
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    postNewReview(url);
  };

  const createNewReview = () => {
    console.log('Create new review.');
  };

  return (
    <section className={classes.headingBar}>
      <Typography className={classes.headingText} variant="h6">
        Book&apos;s reviews
      </Typography>

      <Tooltip title="New review">
        <IconButton aria-label="New review" color="primary" onClick={createNewReview}>
          <Edit />
        </IconButton>
      </Tooltip>

      <Formik
        initialValues={{ title: '' }}
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
          <form className={classes.container} autoComplete="off" noValidate onSubmit={handleSubmit}>
            <TextField
              id="review-body"
              label="Review"
              className={classes.textField}
              placeholder="Enter your review here."
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              value={reviewBodyState}
            />
            <TextField
              id="review-author"
              label="ISBN"
              className={classes.textField}
              placeholder="Your name."
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              value={authorState}
            />
            <TextField
              id="review-rating"
              label="Rating"
              className={classes.textField}
              placeholder="rating"
              fullWidth
              multiline
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              value={ratingState}
            />

            <Button
              disabled={submitting}
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              Done
            </Button>
          </form>
        )}
      </Formik>
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
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={<span id="message-id">Book information has been updated!</span>}
        action={[
          <Tooltip key="close1" title="Close">
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
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
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={<span id="message-id">Something went wrong with the update.</span>}
        action={[
          <Tooltip key="close2" title="Close">
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleCloseAlert}
            >
              <Close />
            </IconButton>
          </Tooltip>,
        ]}
      />
    </section>
  );
};

export default HeadingBarNewReview;
