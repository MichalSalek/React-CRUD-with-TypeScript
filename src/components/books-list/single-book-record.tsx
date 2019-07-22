import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

interface IProps {

}

const SingleBookRecord = (props: IProps) => {

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        komórka 1
      </TableCell>
      <TableCell> komórka 2</TableCell>
      <TableCell> komórka 3</TableCell>
      <TableCell> komórka 4</TableCell>
      <TableCell> komórka 5</TableCell>
    </TableRow>
  );
};

export default SingleBookRecord;
