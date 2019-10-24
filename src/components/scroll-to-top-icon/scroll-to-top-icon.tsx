// node_modules
import React from 'react';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      bottom: '4vh',
      margin: theme.spacing(1),
      position: 'fixed',
      right: '10px',
    },
  }),
);

const ScrollToTopIcon = () => {
  const classes = useStyles();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Fab variant="extended" aria-label="Scroll to top" className={classes.fab}>
      <NavigationIcon color="primary" onClick={scrollToTop} />
    </Fab>
  );
};

export default ScrollToTopIcon;
