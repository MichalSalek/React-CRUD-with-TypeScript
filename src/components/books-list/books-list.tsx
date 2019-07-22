import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import SingleBookRecord from './single-book-record';
import http from '../../http.service';

const useStyles = makeStyles({
  tableHead: {
    background: 'white',
    boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: '60px',
  },
});

const BooksList = () => {
  const classes = useStyles();
  const [listOfBooks, setListOfBooks] = useState([]);

  http.get('/books', 'page=2').then(result => {
    console.warn('working! development process...');
    console.dir(result.data);
  });

  return (
    <section>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat&nbsp;(g)</TableCell>
            <TableCell>Carbs&nbsp;(g)</TableCell>
            <TableCell>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <SingleBookRecord />
        </TableBody>
      </Table>

    </section>
  );
};

export default BooksList;
