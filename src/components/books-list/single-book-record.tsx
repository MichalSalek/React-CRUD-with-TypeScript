import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
            <TableCell> ikonki</TableCell>
          </TableRow>
        );
      })}
    </React.Fragment>
  );
};

export default SingleBookRecord;
