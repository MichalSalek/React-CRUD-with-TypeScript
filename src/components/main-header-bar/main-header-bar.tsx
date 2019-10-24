// node_modules
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { Message } from '@material-ui/icons';

import { IStore } from '../../common/redux';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const NewBookBar = (props: IStore) => {
  const classes = useStyles();
  const { appLoading } = props;

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Books App (Michał Sałek)
          </Typography>{' '}
          <a
            href="https://www.linkedin.com/in/michal-salek/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton key="Linkedin" aria-label="linkedin" color="secondary">
              <Message />
            </IconButton>{' '}
          </a>
        </Toolbar>
        {appLoading && <LinearProgress color="secondary" variant="query" />}
      </AppBar>
    </div>
  );
};

const mapStateToProps = (store: IStore) => ({
  appLoading: store.appLoading,
});

const Component = connect(
  mapStateToProps,
  undefined,
)(NewBookBar);

export default Component;
