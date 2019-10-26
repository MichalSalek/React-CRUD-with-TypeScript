// node_modules
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import SingleBookRecord from '../single-book-record/single-book-record';
import http from '../../http.service';
import { BookApiCollection, BookApiItem } from '../../domainModel';
import { IDataPreparedForTable } from './books-list.model';
import { IStore, setEditorOpen, appLoading } from '../../common/redux';

// Style
import { bookListStyle } from './book-list.style';
import { SnackBarInfo } from '../snack-bar-info';

interface IProps {
  initReload: any;
  setEditorOpen: any;
  appLoading: any;
}

const BooksList = (props: IProps & IStore) => {
  const { initReload } = props;
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };
  const handleOpenError = () => {
    setOpenError(true);
  };
  const s = bookListStyle();
  const [callResolve, setCallResolve] = useState(false);
  const [listOfBooks, setListOfBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [arrangedData, setArrangedData] = useState<IDataPreparedForTable | any>([]);

  const callForBooks = (path: string, page: number) => {
    props.appLoading(true);
    http
      .get(path, `page=${page + 1}`)
      .then(result => {
        setListOfBooks(result.data.data);
        setTotalItems(result.data.meta.totalItems);
        setCallResolve(true);
        props.appLoading(false);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    callForBooks('/books', pageNumber);
  }, [pageNumber, initReload, props]);

  useEffect(() => {
    const interval = setInterval(() => {
      callForBooks('/books', pageNumber);
    }, 30000);
    return () => clearInterval(interval);
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
    reviewsAmount?: number,
  ) => {
    return { author, id, isbn, reviewsAmount, title };
  };

  useEffect(() => {
    const arrangeDataForRender = (data: BookApiItem[]) => {
      const helperArrangedData: IDataPreparedForTable[] = [];
      data.forEach((val: BookApiCollection) => {
        let forBadgesLength = 0;
        if (val.relationships) {
          const forBadges = val.relationships.reviews.data;
          forBadgesLength = forBadges.length;
        }
        helperArrangedData.push(
          createRow(
            val.id,
            val.attributes.isbn,
            val.attributes.title,
            val.attributes.author,
            forBadgesLength,
          ),
        );
        return null;
      });
      setArrangedData(helperArrangedData.reverse());
    };

    arrangeDataForRender(listOfBooks);
  }, [listOfBooks]);

  useEffect(() => {
    props.setEditorOpen(false);
  }, [props]);

  return (
    <section>
      {callResolve ? (
        <Table>
          <TableHead className={s.tableHead}>
            <TableRow className={s.headerCell}>
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
      ) : (
        <>
          <CircularProgress /> <span> Loading the books... </span>
        </>
      )}
      <SnackBarInfo
        keyItem="SnackbaropenSuccess"
        open={openSuccess}
        displayMessage="Book deleted!"
        OpenSuccessAlertSetter={setOpenSuccess}
        OpenErrorAlertSetter={setOpenError}
      />
      <SnackBarInfo
        keyItem="SnackbaropenError"
        open={openError}
        displayMessage="OH NO! We could not delete the book."
        OpenSuccessAlertSetter={setOpenSuccess}
        OpenErrorAlertSetter={setOpenError}
      />
    </section>
  );
};

const mapStateToProps = (store: IStore) => ({
  initReload: store.initReload,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    appLoading: (boo: boolean) => dispatch(appLoading(boo)),
    setEditorOpen: (boo: boolean) => dispatch(setEditorOpen(boo)),
  };
};

const Component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksList);

export default Component;
