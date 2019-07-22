import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Header from './components/common/header-bar/header-bar';
import AppBodyHeadingBar from './components/app-body-heading-bar/app-body-heading-bar';

const useStyles = makeStyles({
  appBodyHeadingBar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  appPaper: {
    color: '#444',
    margin: '84px',
    padding: '1rem',
  },
});

function App() {
  const classes = useStyles();

  return (
    <main>
      <CssBaseline />
      <Header />
      <Paper className={classes.appPaper}>
        <AppBodyHeadingBar styles={classes.appBodyHeadingBar} />
      </Paper>
    </main>
  );
}

export default App;
