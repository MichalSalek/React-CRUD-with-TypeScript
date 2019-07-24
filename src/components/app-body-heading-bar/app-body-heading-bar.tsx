import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Edit, ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { IStore } from '../../react-redux/redux';

interface IProps {
  styles: string;
}

const AppBodyHeadingBar = (props: IProps & IStore) => {
  const { styles, editorIsOpen } = props;
  const [editorMode, setEditorMode] = useState(false);
  useEffect(() => {
    setEditorMode(editorIsOpen);
  }, [editorIsOpen]);
  return (
    <section className={styles}>
      <Typography variant="h5" color="inherit">
        Books
      </Typography>
      <IconButton aria-label="Create" color="primary">
        {' '}
        {editorMode ? (
          <Link to="/">
            {' '}
            <ArrowBack />{' '}
          </Link>
        ) : (
          <Edit />
        )}
      </IconButton>
    </section>
  );
};

const mapStateToProps = (store: IStore) => ({
  editorIsOpen: store.editorIsOpen,
});

const Component = connect(
  mapStateToProps,
  undefined,
)(AppBodyHeadingBar);

export default Component;
