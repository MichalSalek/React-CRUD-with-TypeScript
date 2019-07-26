import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Edit, ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core';

import { IStore } from '../../react-redux/redux';

const useStyles = makeStyles({
  appBodyHeadingBar: {
    alignItems: 'center',
    display: 'flex',
    height: '55px',
    justifyContent: 'space-between',
  },
});

const AppBodyHeadingBarNewBook = (props: IStore) => {
  const classes = useStyles();
  const { editorIsOpen, currentTitle } = props;
  const [editorMode, setEditorMode] = useState(false);
  useEffect(() => {
    // Warning fix:
    // Can't perform a React state update on an unmounted component.
    setTimeout(() => {
      setEditorMode(editorIsOpen);
    }, 300);
  }, [editorIsOpen]);

  const createNewBook = () => {
    console.log('Create new book.');
  };

  return (
    <section className={classes.appBodyHeadingBar}>
      <Typography variant="h5" color="inherit">
        {editorMode ? currentTitle : 'Books'}
      </Typography>
      {editorMode ? (
        <Link to="/">
          <Tooltip title="Back">
            <IconButton aria-label="Back" color="primary">
              <ArrowBack />
            </IconButton>
          </Tooltip>
        </Link>
      ) : (
        <Tooltip title="Create">
          <IconButton aria-label="Create" color="primary" onClick={createNewBook}>
            <Edit />
          </IconButton>
        </Tooltip>
      )}
    </section>
  );
};

const mapStateToProps = (store: IStore) => ({
  currentTitle: store.currentTitle,
  editorIsOpen: store.editorIsOpen,
});

const Component = connect(
  mapStateToProps,
  undefined,
)(AppBodyHeadingBarNewBook);

export default Component;
