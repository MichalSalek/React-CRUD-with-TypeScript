import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';

interface IProps {
  styles: string;
}

const AppBodyHeadingBar = (props: IProps) => {
  const { styles } = props;
  return (
    <section className={styles}>
      <Typography variant="h5" color="inherit">
        Books
      </Typography>
      <IconButton aria-label="Create" color="primary">
        {' '}
        <Edit />{' '}
      </IconButton>
    </section>
  );
};

export default AppBodyHeadingBar;
