import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Close, Edit } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import dateConverter from '../../common/date-converter';
import http from '../../../http.service';

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
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    headingBar: {
      margin: theme.spacing(7, 0, 2, 0),
    },
    headingText: {
      color: '#666',
      fontSize: '1rem',
    },
    root: {
      width: '100%',
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

  const [reviewBodyState, setReviewBodyState] = useState('');
  const [authorState, setAuthorState] = useState('');
  const [ratingState, setRatingState] = useState(0);

  const [submitting, setSubmitting] = useState(false);

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
      default:
        break;
    }
    return null;
  };

  const postNewReview = () => {
    const data = {
      author: authorState,
      body: reviewBodyState,
      book: url,
      publicationDate: dateConverter('', 'today'),
      rating: ratingState,
    };
    http
      .post('/reviews', data)
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
    postNewReview();
  };

  return (
    <section className={classes.headingBar}>
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<Edit />} aria-controls="new-review" id="new-review">
            <Typography className={classes.headingText} variant="h6">
              Book&apos;s reviews
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
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
                <form
                  className={classes.container}
                  autoComplete="off"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Box component="fieldset" mb={1} mt={1} p={1} borderColor="transparent">
                      <Typography component="legend">Rate this book:</Typography>
                      <Rating
                        name="review-rating"
                        value={ratingState}
                        onChange={(event, newValue) => {
                          setRatingState(newValue);
                        }}
                      />
                    </Box>
                  </div>
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
                    label="Review's author"
                    className={classes.textField}
                    placeholder="Your name."
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
                    className={classes.button}
                  >
                    Done
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
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={<span id="message-id">Your review has been added!</span>}
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
        message={<span id="message-id">Something went wrong...</span>}
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
