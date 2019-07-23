import React, { FunctionComponent, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/core/SvgIcon/SvgIcon';

import SingleBookRecord from './single-book-record';
import http from '../../http.service';
import { BookApiCollection, BookApiItem } from '../../domainModel';
import { IDataPreparedForTable } from './books-list.model';

const useStyles = makeStyles({
  close: {
    padding: '0.5rem',
  },
  tableHead: {
    background: 'white',
    boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: '60px',
  },
});

const BooksList: FunctionComponent = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };
  const handleOpenError = () => {
    setOpenError(true);
  };
  const classes = useStyles();
  const [listOfBooks, setListOfBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [arrangedData, setArrangedData] = useState<IDataPreparedForTable | any>(
    [],
  );

  const callForBooks = (path: string, page: number) => {
    http
      .get(path, `page=${page + 1}`)
      .then(result => {
        setListOfBooks(result.data.data);
        setTotalItems(result.data.meta.totalItems);
      })
      .catch(error => console.error(error));
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

  const createRow = (
    id: string,
    isbn: string,
    title: string,
    author: string,
  ) => {
    return { author, id, isbn, title };
  };

  useEffect(() => {
    arrangeData(listOfBooks);
  }, [listOfBooks]);

  const arrangeData = (data: BookApiItem[]) => {
    const helperArrangedData: IDataPreparedForTable[] = [];
    data.forEach((val: BookApiCollection) => {
      helperArrangedData.push(
        createRow(
          val.id,
          val.attributes.isbn,
          val.attributes.title,
          val.attributes.author,
        ),
      );
    });
    setArrangedData(helperArrangedData);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <section>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>ISBN: </TableCell>
            <TableCell>Title: </TableCell>
            <TableCell>Author:</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <SingleBookRecord
            data={arrangedData}
            actionProps={useState()[1]}
            openAlert={handleOpenSuccess}
            closeAlert={handleOpenError}
          />
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
      <Snackbar
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        message={<span id="message-id">Book deleted!</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
      <Snackbar
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          <span id="message-id">OH NO! We could not delete the book.</span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </section>
  );
};

export default BooksList;
