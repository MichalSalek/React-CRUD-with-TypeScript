import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { IStore } from '../../../react-redux/redux';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Header = (props: IStore) => {
  const classes = useStyles();
  const { appLoading } = props;

  return (
    <div className={classes.root}>
      <AppBar>
        {appLoading && <LinearProgress color="secondary" variant="query" />}
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Books App (Michał Sałek)
          </Typography>
        </Toolbar>
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
)(Header);

export default Component;
