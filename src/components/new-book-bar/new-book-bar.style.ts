import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const newBookBarStyle = makeStyles((theme: Theme) =>
  createStyles({
    appBodyHeadingBar: {
      alignItems: 'center',
      display: 'flex',
      height: '55px',
      justifyContent: 'space-between',
    },
    button: {
      margin: theme.spacing(1),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    headingBar: {
      margin: theme.spacing(0, 0, 2, 0),
    },
    headingText: {
      color: '#666',
      fontSize: '1rem',
    },
    root: {
      width: '100%',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
);
