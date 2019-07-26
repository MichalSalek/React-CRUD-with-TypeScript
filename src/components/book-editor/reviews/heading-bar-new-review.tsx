import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headingBar: {
      alignItems: 'center',
      display: 'flex',
      height: '55px',
      justifyContent: 'space-between',
      margin: theme.spacing(5, 0, 1, 0),
    },
    headingText: {
      color: '#666',
      fontSize: '1rem',
    },
  }),
);

interface IProps {
  BookID: string;
}

const HeadingBarNewReview = (props: IProps) => {
  const classes = useStyles();
  const { BookID } = props;

  const createNewReview = () => {
    console.log('Create new review.');
  };

  return (
    <section className={classes.headingBar}>
      <Typography className={classes.headingText} variant="h6">
        Book&apos;s reviews
      </Typography>

      <Tooltip title="New review">
        <IconButton aria-label="New review" color="primary" onClick={createNewReview}>
          <Edit />
        </IconButton>
      </Tooltip>
    </section>
  );
};

export default HeadingBarNewReview;
