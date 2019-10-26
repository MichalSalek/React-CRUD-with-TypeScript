// node_modules
import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import { connect } from 'react-redux';

import http from '../../http.service';
import SingleReviewRecord from '../single-review-record/single-review-record';
import { ReviewApiCollection, ReviewApiItem } from '../../domainModel';
import { IDataPreparedForTable } from './reviews-table.model';
import dateConverter from '../../common/plugins/date-converter';
import { IStore } from '../../common/redux';

// Style
import { reviewsStyle } from './reviews.style';
import { SnackBarInfo } from '../snack-bar-info';

interface IProps {
  bookID: string;
  initReload: number;
}

const ReviewsComponent = (props: IProps) => {
  const s = reviewsStyle();
  const { bookID, initReload } = props;

  const [callResolve, setCallResolve] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [listOfReviews, setListOfReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [arrangedData, setArrangedData] = useState<IDataPreparedForTable | any>([]);

  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };
  const handleOpenError = () => {
    setOpenError(true);
  };

  const callForReviewsBundle = (BookID: string) => {
    const cleanBookID = BookID.replace(/^\D+/g, '');
    const query = `book=${cleanBookID}`;
    http
      .get(`/reviews`, query)
      .then(result => {
        const statusOfResponse = result.status;
        if (statusOfResponse !== 200) {
          console.error('We have a problem, check network tab.');
          return null;
        }
        setListOfReviews(result.data.data);
        setTotalItems(result.data.meta.totalItems);
        setCallResolve(true);
        return null;
      })
      .catch(error => console.error(error));
    return null;
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPageNumber(newPage);
  };

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  }

  const createRow = (
    reviewBody: string,
    rating: number,
    author: string,
    reviewDate: string,
    id: string,
  ) => {
    return { author, id, rating, reviewBody, reviewDate };
  };

  useEffect(() => {
    const arrangeDataForRender = (data: ReviewApiItem[]) => {
      const helperArrangedData: IDataPreparedForTable[] = [];
      data.forEach((val: ReviewApiCollection) => {
        helperArrangedData.push(
          createRow(
            val.attributes.body,
            val.attributes.rating,
            val.attributes.author,
            dateConverter(val.attributes.publicationDate, 'cut-time'),
            val.id,
          ),
        );
      });
      setArrangedData(helperArrangedData.reverse());
    };

    arrangeDataForRender(listOfReviews);
  }, [listOfReviews]);

  useEffect(() => {
    callForReviewsBundle(bookID);
  }, [bookID, initReload]);

  return (
    <React.Fragment>
      {callResolve ? (
        <Table>
          <TableHead className={s.tableHead}>
            <TableRow className={s.headerCell}>
              <TableCell>Review: </TableCell>
              <TableCell>Rating: </TableCell>
              <TableCell>Author: </TableCell>
              <TableCell>Date:</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <SingleReviewRecord
              data={arrangedData}
              openAlert={handleOpenSuccess}
              closeAlert={handleOpenError}
              rowsPerPage={rowsPerPage}
              pageNumber={pageNumber}
            />
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                colSpan={12}
                count={totalItems}
                rowsPerPage={rowsPerPage}
                page={pageNumber}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                SelectProps={{
                  inputProps: { 'aria-label': 'Rows per page' },
                  native: true,
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <>
          <CircularProgress /> <span> Loading reviews... </span>
        </>
      )}
      <section>
        <SnackBarInfo
          keyItem="SnackbaropenSuccess"
          open={openSuccess}
          displayMessage="Review removed by anonymous user :-)."
          OpenSuccessAlertSetter={setOpenSuccess}
          OpenErrorAlertSetter={setOpenError}
        />
        <SnackBarInfo
          keyItem="SnackbaropenError"
          open={openError}
          displayMessage="Something went wrong with removal."
          OpenSuccessAlertSetter={setOpenSuccess}
          OpenErrorAlertSetter={setOpenError}
        />
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = (store: IStore) => ({
  initReload: store.initReload,
});

const Component = connect(
  mapStateToProps,
  undefined,
)(ReviewsComponent);

export default Component;
