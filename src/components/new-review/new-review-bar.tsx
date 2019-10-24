// node_modules
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Close, Edit } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';

import dateConverter from '../../common/plugins/date-converter';
import http from '../../http.service';
import { appLoading, initReload } from '../../common/redux';

// Style
import { newReviewStyle } from './new-review.style';

interface IProps {
  url: string;
  initReload: (arg0: number) => void;
  appLoading: any;
}

const NewReviewBar = (props: IProps) => {
  const s = newReviewStyle();
  const { url } = props;

  const [reviewBodyState, setReviewBodyState] = useState('');
  const [authorState, setAuthorState] = useState('');
  const [ratingState, setRatingState] = useState(0);

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
      default:
        break;
    }
    return null;
  };

  useEffect(() => {
    const formValidation = () => {
      switch (true) {
        case reviewBodyState === '':
          return true;
        case authorState === '':
          return true;
        case ratingState <= 0 || ratingState >= 6:
          return true;
        default:
          return false;
      }
    };

    setSubmitting(formValidation());
  }, [reviewBodyState, authorState, ratingState]);

  const postNewReview = () => {
    const data = {
      author: authorState,
      body: reviewBodyState,
      book: url,
      publicationDate: dateConverter('', 'today'),
      rating: ratingState,
    };
    http
      .post('/reviews-table', data)
      .then(() => {
        setSubmitting(true);
        handleOpenSuccessAlert();
        // Trick to init rerender list of reviews-table:
        props.initReload(Math.random());
        setReviewBodyState('');
        setAuthorState('');
        setRatingState(0);
        props.appLoading(false);
      })
      .catch(error => {
        console.error(error);
        setSubmitting(false);
        handleOpenErrorAlert();
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.appLoading(true);
    setSubmitting(true);
    postNewReview();
  };

  return (
    <section className={s.headingBar}>
      <div className={s.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={
              <Tooltip title="Add a review">
                <Edit />
              </Tooltip>
            }
            aria-controls="new-review"
            id="new-review"
          >
            <Typography className={s.headingText} variant="h6">
              Book&apos;s reviews
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Formik initialValues={{ title: '' }} onSubmit={e => handleSubmit(e)}>
              {() => (
                <form
                  className={s.container}
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
                    multiline
                    className={s.textField}
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
                    className={s.textField}
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
                    className={s.button}
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
        autoHideDuration={2200}
        onClose={handleCloseAlert}
        message={<span id="message-id">Your review has been added!</span>}
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
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    appLoading: (boo: boolean) => dispatch(appLoading(boo)),
    initReload: (number: number) => dispatch(initReload(number)),
  };
};

const Component = connect(
  undefined,
  mapDispatchToProps,
)(NewReviewBar);

export default Component;
