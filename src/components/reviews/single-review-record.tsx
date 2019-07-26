import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Book, DeleteOutline } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import http from '../../http.service';
import { IDataPreparedForTable } from './reviews.model';

interface IProps {
  data: IDataPreparedForTable[];
  openAlert: (arg0: boolean) => void;
  closeAlert: (arg0: boolean) => void;
}
//
const SingleReviewRecord = ({ data, openAlert, closeAlert }: IProps) => {
  const deleteReview = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const IDOfReview = event.currentTarget.id;

    http
      .delete(String(IDOfReview))
      .then(result => {
        if (result.status === 204) openAlert(true);
      })
      .catch(error => {
        console.error(error);
        closeAlert(true);
      });
  };
  return (
    <React.Fragment>
      {data.map((val, index: number) => {
        return (
          <TableRow key={String(val.reviewBody) + String(index)}>
            <TableCell component="th" scope="row" style={{ width: 'fit-content' }}>
              {val.reviewBody}
            </TableCell>
            <TableCell component="th" scope="row" style={{ width: 'fit-content' }}>
              {val.rating}
            </TableCell>
            <TableCell component="th" scope="row" style={{ width: '20%' }}>
              {val.author}
            </TableCell>
            <TableCell component="th" scope="row" style={{ width: '10%' }}>
              {val.reviewDate}
            </TableCell>
            <TableCell component="th" scope="row" style={{ width: 'fit-content' }}>
              <div style={{ display: 'flex' }}>
                <span>
                  <Link to={val.id}>
                    <Tooltip title="Show details">
                      <IconButton aria-label="Show" color="primary">
                        <Book />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </span>
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

export default SingleReviewRecord;