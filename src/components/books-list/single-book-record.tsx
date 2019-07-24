import React, { Dispatch, SetStateAction } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Book, DeleteOutline } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import http from '../../http.service';
import { IDataPreparedForTable } from './books-list.model';

interface IProps {
  data: IDataPreparedForTable[];
  actionProps: Dispatch<SetStateAction<undefined>>;
  openAlert: (arg0: boolean) => void;
  closeAlert: (arg0: boolean) => void;
}

const SingleBookRecord = ({ data, actionProps, openAlert, closeAlert }: IProps) => {
  const deleteBook = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const IDOfBook = event.currentTarget.id;

    http
      .delete(String(IDOfBook))
      .then(result => {
        actionProps(undefined);
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
          <TableRow key={String(val) + String(index)}>
            <TableCell component="th" scope="row" style={{ width: 'fit-content' }}>
              {val.isbn}
            </TableCell>
            <TableCell component="th" scope="row" style={{ width: '60%' }}>
              {val.title}
            </TableCell>
            <TableCell component="th" scope="row" style={{ width: '40%' }}>
              {val.author}
            </TableCell>
            <TableCell component="th" scope="row" style={{ width: 'fit-content' }}>
              <div style={{ display: 'flex' }}>
                <span>
                  <Link to={val.id}>
                    <IconButton aria-label="Show" color="primary">
                      <Book />
                    </IconButton>
                  </Link>
                </span>
                <span>
                  <IconButton id={val.id} onClick={deleteBook} aria-label="Show" color="primary">
                    <DeleteOutline />
                  </IconButton>
                </span>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </React.Fragment>
  );
};

export default SingleBookRecord;
