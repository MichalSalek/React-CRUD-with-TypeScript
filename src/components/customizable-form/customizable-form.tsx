import React, { Dispatch, SetStateAction } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';

import { CustomizableFormStyle } from './customizable-form.style';
import validateISBN from '../../common/plugins/validate-isbn';

interface IProps {
  titleState: string;
  ISBNInvalid: boolean;
  ISBNState: string;
  descriptionState: string;
  authorState: string;
  publicationDateState?: string;
  submitButtonText: string;
  appLoading: Dispatch<SetStateAction<boolean>>;
  setTitleState: Dispatch<SetStateAction<string>>;
  setISBNInvalid: Dispatch<SetStateAction<boolean>>;
  setISBNState: Dispatch<SetStateAction<string>>;
  setDescriptionState: Dispatch<SetStateAction<string>>;
  setAuthorState: Dispatch<SetStateAction<string>>;
  setPublicationDateState?: Dispatch<SetStateAction<string>>;
  setSubmitting: Dispatch<SetStateAction<boolean>>;
  submitting: boolean;
  doHTTPOperation: any;
}

export const CustomizableForm = (props: IProps) => {
  const {
    titleState,
    ISBNInvalid,
    ISBNState,
    descriptionState,
    authorState,
    publicationDateState,
    submitButtonText,
    appLoading,
    setTitleState,
    setISBNInvalid,
    setISBNState,
    setDescriptionState,
    setAuthorState,
    setPublicationDateState,
    setSubmitting,
    submitting,
    doHTTPOperation,
  } = props;
  const s = CustomizableFormStyle();

  const handleChange = (e: any) => {
    /* eslint-disable no-unused-expressions */
    switch (e.currentTarget.id) {
      case 'title':
        setTitleState(e.currentTarget.value);
        break;
      case 'isbn':
        setISBNInvalid(!validateISBN(e.currentTarget.value));
        setISBNState(e.currentTarget.value);
        break;
      case 'description':
        setDescriptionState(e.currentTarget.value);
        break;
      case 'author':
        setAuthorState(e.currentTarget.value);
        break;
      case 'publication-date':
        typeof setPublicationDateState !== 'undefined' &&
          setPublicationDateState(e.currentTarget.value);
        break;
      default:
        break;
    }
    return null;
    /* eslint-enable no-unused-expressions */
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    appLoading(true);
    setSubmitting(true);
    doHTTPOperation();
  };

  return (
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
            id="title"
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
            id="isbn"
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
            id="description"
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
            id="author"
            label="Author"
            className={s.textField}
            placeholder="Author of the book."
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            value={authorState}
          />
          {publicationDateState && (
            <TextField
              id="publication-date"
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
          )}
          <Button
            disabled={submitting}
            type="submit"
            variant="outlined"
            color="primary"
            className={s.button}
          >
            {submitButtonText}
          </Button>
        </form>
      )}
    </Formik>
  );
};
