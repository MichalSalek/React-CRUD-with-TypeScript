import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { DeleteOutline } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';

import http from '../../../http.service';
import { IDataPreparedForTable } from './reviews.model';
import { initReload } from '../../../react-redux/redux';

interface IProps {
  data: IDataPreparedForTable[];
  openAlert: (arg0: boolean) => void;
  closeAlert: (arg0: boolean) => void;
  initReload: any;
  rowsPerPage: number;
  pageNumber: number;
}

const SingleReviewRecord = (props: IProps) => {
  const { data, openAlert, closeAlert, rowsPerPage, pageNumber } = props;
  const deleteReview = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const IDOfReview = event.currentTarget.id;
    http
      .delete(String(IDOfReview))
      .then(result => {
        if (result.status === 204) openAlert(true);
        props.initReload(Math.random());
      })
      .catch(error => {
        console.error(error);
        closeAlert(true);
      });
  };
  return (
    <React.Fragment>
      {data
        .slice(pageNumber * rowsPerPage, pageNumber * rowsPerPage + rowsPerPage)
        .map((val, index: number) => {
          return (
            <TableRow key={String(val.reviewBody) + String(index)} className="table-row-custom">
              <TableCell component="th" scope="row" style={{ width: '80%' }}>
                {val.reviewBody}
              </TableCell>
              <TableCell component="th" scope="row" style={{ width: 'fit-content' }}>
                <Box component="fieldset" mb={0} p={0} borderColor="transparent">
                  <Rating value={val.rating} readOnly />
                </Box>
              </TableCell>
              <TableCell component="th" scope="row" style={{ width: '20%' }}>
                {val.author}
              </TableCell>
              <TableCell component="th" scope="row" style={{ width: 'fit-content' }}>
                {val.reviewDate}
              </TableCell>
              <TableCell component="th" scope="row" style={{ width: 'fit-content' }}>
                <div style={{ display: 'flex' }}>
                  <span>
                    <Tooltip title="Delete book">
                      <IconButton
                        id={val.id}
                        onClick={deleteReview}
                        aria-label="Delete book"
                        color="primary"
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Tooltip>
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    initReload: (number: number) => dispatch(initReload(number)),
  };
};

const Component = connect(
  undefined,
  mapDispatchToProps,
)(SingleReviewRecord);

export default Component;
