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
import { Close } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';

import SingleBookRecord from './single-book-record';
import http from '../../http.service';
import { BookApiCollection, BookApiItem } from '../../domainModel';
import { IDataPreparedForTable } from './books-list.model';
import { setEditorOpen } from '../../react-redux/redux';

const useStyles = makeStyles({
  close: {
    background: '#111',
    margin: '0.5rem',
  },
  headerCell: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
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

const BooksList: FunctionComponent = (props: any) => {
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
  const [arrangedData, setArrangedData] = useState<IDataPreparedForTable | any>([]);

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

  const createRow = (id: string, isbn: string, title: string, author: string) => {
    return { author, id, isbn, title };
  };

  useEffect(() => {
    const arrangeDataForRender = (data: BookApiItem[]) => {
      const helperArrangedData: IDataPreparedForTable[] = [];
      data.forEach((val: BookApiCollection) => {
        helperArrangedData.push(
          createRow(val.id, val.attributes.isbn, val.attributes.title, val.attributes.author),
        );
      });
      setArrangedData(helperArrangedData);
    };

    arrangeDataForRender(listOfBooks);
  }, [listOfBooks]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  useEffect(() => {
    props.setEditorOpen(false);
  }, [props]);

  return (
    <section>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.headerCell}>
            <TableCell>ISBN: </TableCell>
            <TableCell>Title: </TableCell>
            <TableCell>Author:</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <SingleBookRecord
            data={arrangedData}
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
        key="SnackbaropenSuccess"
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        message={<span id="message-id">Book deleted!</span>}
        action={[
          <Tooltip key="close1" title="Close">
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </Tooltip>,
        ]}
      />
      <Snackbar
        key="SnackbaropenError"
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
        message={<span id="message-id">OH NO! We could not delete the book.</span>}
        action={[
          <Tooltip key="close2" title="Close">
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </Tooltip>,
        ]}
      />
    </section>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setEditorOpen: (boo: any) => dispatch(setEditorOpen(boo)),
  };
};

const Component = connect(
  undefined,
  mapDispatchToProps,
)(BooksList);

export default Component;
