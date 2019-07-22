import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import SingleBookRecord from './single-book-record';
import http from '../../http.service';
import { BookApiCollection } from '../../domainModel';

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
  const [pageNumber, setPageNumber] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [arrangedData, setArrangedData] = useState([]);

  const callForBooks = (path: string, page: number) => {
    http.get(path, `page=${page + 1}`).then(result => {
      setListOfBooks(result.data.data);
      setTotalItems(result.data.meta.totalItems);
    });
  };

  useEffect(() => {
    callForBooks('/books', pageNumber);
  }, [pageNumber]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPageNumber(newPage);
  };

  const createRow = (isbn: number, title: string, author: string) => {
    return { author, isbn, title };
  };

  useEffect(() => {
    arrangeData(listOfBooks);
  }, [listOfBooks]);

  const arrangeData = (data: BookApiCollection[]) => {
    console.dir(data);
  };

  return (
    <section>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>ISBN:</TableCell>
            <TableCell>Title:</TableCell>
            <TableCell>Author:</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <SingleBookRecord />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[30]}
              colSpan={12}
              count={totalItems}
              rowsPerPage={30}
              page={pageNumber}
              onChangePage={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
};

export default BooksList;
