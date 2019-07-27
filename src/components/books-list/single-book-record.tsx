import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Book, DeleteOutline } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import { withStyles, Theme } from '@material-ui/core/styles';

import http from '../../http.service';
import { IDataPreparedForTable } from './books-list.model';
import { appLoading, initReload } from '../../react-redux/redux';

const StyledBadge = withStyles((theme: Theme) => ({
  badge: {
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
    right: -5,
    top: '50%',
  },
}))(Badge);

interface IProps {
  data: IDataPreparedForTable[];
  openAlert: (arg0: boolean) => void;
  closeAlert: (arg0: boolean) => void;
  appLoading: (arg0: boolean) => void;
  initReload: (arg0: number) => void;
}

const SingleBookRecord = (props: IProps) => {
  const { data, openAlert, closeAlert } = props;
  const deleteBook = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const IDOfBook = event.currentTarget.id;

    http
      .delete(String(IDOfBook))
      .then(result => {
        if (result.status === 204) {
          openAlert(true);
          props.initReload(Math.random());
        }
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
          <TableRow key={String(val.isbn) + String(index)} className="table-row-custom">
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
                  <Link onClick={() => props.appLoading(true)} to={val.id}>
                    <Tooltip title="Show details">
                      <IconButton aria-label="Show" color="primary">
                        <StyledBadge badgeContent={val.reviewsAmount} color="default">
                          <Book />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  </Link>
                </span>
                <span>
                  <Tooltip title="Delete book">
                    <IconButton
                      id={val.id}
                      onClick={deleteBook}
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
    appLoading: (boo: boolean) => dispatch(appLoading(boo)),
    initReload: (number: number) => dispatch(initReload(number)),
  };
};

const Component = connect(
  undefined,
  mapDispatchToProps,
)(SingleBookRecord);

export default Component;
