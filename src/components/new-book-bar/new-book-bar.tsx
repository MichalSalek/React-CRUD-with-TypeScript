// node_modules
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Edit, ArrowBack } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { appLoading, initReload, IStore } from '../../common/redux';
import dateConverter from '../../common/plugins/date-converter';

// Services
import http from '../../http.service';

// Style
import { newBookBarStyle } from './new-book-bar.style';
import { SnackBarInfo } from '../snack-bar-info';
import { CustomizableForm } from '../customizable-form/customizable-form';

// Props interface
interface IProps extends IStore {
  initReload: any;
  setAppLoading: any;
}

const NewBookBar = (props: IProps) => {
  const s = newBookBarStyle();
  const { editorIsOpen, currentTitle, setAppLoading } = props;

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

  // Validation are fields empty or not
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
        setAppLoading(false);
      })
      .catch(() => {
        setSubmitting(false);
        setOpenErrorAlert(true);
        setAppLoading(false);
      });
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
                <CustomizableForm
                  titleState={titleState}
                  ISBNInvalid={ISBNInvalid}
                  ISBNState={ISBNState}
                  descriptionState={descriptionState}
                  authorState={authorState}
                  submitButtonText="Update"
                  appLoading={setAppLoading}
                  setTitleState={setTitleState}
                  setISBNInvalid={setISBNInvalid}
                  setISBNState={setISBNState}
                  setDescriptionState={setDescriptionState}
                  setAuthorState={setAuthorState}
                  setSubmitting={setSubmitting}
                  submitting={submitting}
                  doHTTPOperation={sendNewBook}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
          <SnackBarInfo
            keyItem="SnackbaropenSuccess"
            open={openSuccessAlert}
            displayMessage="Book has been added!"
            OpenSuccessAlertSetter={setOpenSuccessAlert}
            OpenErrorAlertSetter={setOpenErrorAlert}
          />
          <SnackBarInfo
            keyItem="SnackbaropenError"
            open={openErrorAlert}
            displayMessage="Something went wrong..."
            OpenSuccessAlertSetter={setOpenSuccessAlert}
            OpenErrorAlertSetter={setOpenErrorAlert}
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
    initReload: (number: number) => dispatch(initReload(number)),
    setAppLoading: (boo: boolean) => dispatch(appLoading(boo)),
  };
};

const Component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewBookBar);

export default Component;
