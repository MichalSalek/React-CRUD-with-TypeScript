import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Edit, ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import { IStore } from '../../react-redux/redux';

interface IProps {
  styles: string;
}

const AppBodyHeadingBar = (props: IProps & IStore) => {
  const { styles, editorIsOpen, currentTitle } = props;
  const [editorMode, setEditorMode] = useState(false);
  useEffect(() => {
    setEditorMode(editorIsOpen);
  }, [editorIsOpen]);

  return (
    <section className={styles}>
      <Typography variant="h5" color="inherit">
        {editorMode ? currentTitle : 'Books'}
      </Typography>
      {editorMode ? (
        <Tooltip title="Back">
          <IconButton aria-label="Back" color="primary">
            <Link to="/">
              <ArrowBack />
            </Link>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Create">
          <IconButton aria-label="Create" color="primary">
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
)(AppBodyHeadingBar);

export default Component;
