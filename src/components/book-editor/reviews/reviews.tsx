import React, { useEffect, useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';

import http from '../../../http.service';
import SingleReviewRecord from './single-review-record';
import { ReviewApiCollection, ReviewApiItem } from '../../../domainModel';
import { IDataPreparedForTable } from './reviews.model';
import dateConverter from '../../common/date-converter';

const useStyles = makeStyles({
  close: {
    background: '#111',
    margin: '0.5rem',
  },
  headerCell: {
    fontSize: '0.8rem',
  },
  tableHead: {
    background: '#fafafa',
    borderTop: '1px solid #ddd',
    boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: '60px',
    zIndex: 10,
  },
});

const ReviewsComponent = (props: any) => {
  const classes = useStyles();
  const { bookID } = props;

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

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  const callForReviewsBundle = (BookID: string) => {
    http
      .get(`/reviews`, BookID)
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
  }, [bookID]);

  return (
    <React.Fragment>
      {callResolve ? (
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.headerCell}>
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
          message={<span id="message-id">Review removed by anonymous user :-).</span>}
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
          message={<span id="message-id">Something went wrong with removal.</span>}
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
    </React.Fragment>
  );
};

export default ReviewsComponent;
