import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Book, DeleteOutline } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import { IDataPreparedForTable } from './books-list.model';

interface IProps {
  data: IDataPreparedForTable[];
}

const SingleBookRecord = ({ data }: IProps) => {
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
              <IconButton aria-label="Show" color="primary">
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
