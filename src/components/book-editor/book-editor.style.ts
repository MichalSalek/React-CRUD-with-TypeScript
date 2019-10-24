import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const bookEditorStyle = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    close: {
      background: '#111',
      margin: '0.5rem',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);
