import React, { Dispatch, SetStateAction } from 'react';
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

const SingleBookRecord = ({
  data,
  actionProps,
  openAlert,
  closeAlert,
}: IProps) => {
  const deleteBook = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
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
            <TableCell component="th" scope="row">
              {val.isbn}
            </TableCell>
            <TableCell> {val.title}</TableCell>
            <TableCell> {val.author}</TableCell>
            <TableCell>
              <IconButton aria-label="Show" color="primary">
                <Book />
              </IconButton>
              <IconButton
                id={val.id}
                onClick={deleteBook}
                aria-label="Show"
                color="primary"
              >
                <DeleteOutline />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </React.Fragment>
  );
};

export default SingleBookRecord;
