import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

interface IProps {}

const SingleBookRecord = (props: IProps) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        isbn 1
      </TableCell>
      <TableCell> title 1</TableCell>
      <TableCell> author 1</TableCell>
      <TableCell> ikonki</TableCell>
    </TableRow>
  );
};

export default SingleBookRecord;
