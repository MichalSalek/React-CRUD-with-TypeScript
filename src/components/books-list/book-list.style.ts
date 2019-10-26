import {  makeStyles } from '@material-ui/core';

export const bookListStyle = makeStyles({
  headerCell: {
    fontSize: '0.8rem',
    letterSpacing: '0.07rem',
  },
  tableHead: {
    background: '#fafafa',
    borderTop: '1px solid #ddd',
    boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: '60px',
    zIndex: 10,
  },
});
