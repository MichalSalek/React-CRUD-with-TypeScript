import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/common/header-bar/header-bar';
import AppBodyHeadingBar from './components/app-body-heading-bar/app-body-heading-bar';
import BooksList from './components/books-list/books-list';
import BookEditor from './components/book-editor/book-editor';

const useStyles = makeStyles({
  appBodyHeadingBar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  appPaper: {
    color: '#444',
    margin: '84px',
    minWidth: 'fit-content',
    padding: '1rem',
  },
});

const idksiazkizreduxa = '1';

function App() {
  const classes = useStyles();

  return (
    <main>
      <CssBaseline />
      <Header />
      <Paper className={classes.appPaper}>
        <AppBodyHeadingBar styles={classes.appBodyHeadingBar} />
        <Router>
          <Route exact path="/" component={BooksList} />
          <Route path={`/book${idksiazkizreduxa}`} component={BookEditor} />
        </Router>
      </Paper>
    </main>
  );
}

export default App;
