// node_modules
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { appLoading, IStore, setCurrentTitle, setEditorOpen } from '../../common/redux';
import dateConverter from '../../common/plugins/date-converter';
import http from '../../http.service';
import compareChecksum from '../../common/plugins/checksum-comparision';
import ReviewsComponent from '../reviews-table/reviews-table';
import HeadingBarNewReview from '../new-review/new-review-bar';
import { SnackBarInfo } from '../snack-bar-info';

// Form
import { CustomizableForm } from '../customizable-form/customizable-form';

interface IProps extends IStore {
  setAppLoading: any;
  setCurrentTitle: any;
  setEditorOpen: any;
  match: { url: string };
}

const BookEditor = (props: IProps) => {
  const { match, setAppLoading } = props;
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
        setAppLoading(false);
        return null;
      })
      .catch(error => console.error(error));
    return null;
  };

  useEffect(() => {
    callForSingleBook(url);
  }, [url]);

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

  const putNewDataToThisBook = () => {
    const data = {
      author: authorState,
      description: descriptionState,
      isbn: ISBNState,
      publicationDate: dateConverter(publicationDateState, 'add-time'),
      title: titleState,
    };
    setChecksumString(setAllValuesStringToComparision());
    http
      .put(url, data)
      .then(() => {
        setSubmitting(true);
        setOpenSuccessAlert(true);
        setAppLoading(false);
      })
      .catch(error => {
        console.error(error);
        setSubmitting(false);
        setOpenErrorAlert(true);
        setAppLoading(false);
      });
  };

  return (
    <React.Fragment>
      {callResolve ? (
        <CustomizableForm
          titleState={titleState}
          ISBNInvalid={ISBNInvalid}
          ISBNState={ISBNState}
          descriptionState={descriptionState}
          authorState={authorState}
          publicationDateState={publicationDateState}
          submitButtonText="Update"
          appLoading={setAppLoading}
          setTitleState={setTitleState}
          setISBNInvalid={setISBNInvalid}
          setISBNState={setISBNState}
          setDescriptionState={setDescriptionState}
          setAuthorState={setAuthorState}
          setPublicationDateState={setPublicationDateState}
          setSubmitting={setSubmitting}
          submitting={submitting}
          doHTTPOperation={putNewDataToThisBook}
        />
      ) : (
        <>
          <CircularProgress /> <span> Loading your book info... </span>
        </>
      )}
      <SnackBarInfo
        keyItem="SnackbaropenSuccess"
        open={openSuccessAlert}
        displayMessage="Book information has been updated!"
        OpenSuccessAlertSetter={setOpenSuccessAlert}
        OpenErrorAlertSetter={setOpenErrorAlert}
      />
      <SnackBarInfo
        keyItem="SnackbaropenError"
        open={openErrorAlert}
        displayMessage="Something went wrong with the update."
        OpenSuccessAlertSetter={setOpenSuccessAlert}
        OpenErrorAlertSetter={setOpenErrorAlert}
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
    setAppLoading: (boo: boolean) => dispatch(appLoading(boo)),
    setCurrentTitle: (string: string) => dispatch(setCurrentTitle(string)),
    setEditorOpen: (boo: boolean) => dispatch(setEditorOpen(boo)),
  };
};

const Component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookEditor);

export default Component;
