import React, { Dispatch, SetStateAction } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core';

// Style
const SnackBarStyle = makeStyles({
  close: {
    background: '#111',
    margin: '0.5rem',
  },
});

interface IProps {
  keyItem: string;
  open: boolean;
  displayMessage: string;
  OpenSuccessAlertSetter: Dispatch<SetStateAction<boolean>>;
  OpenErrorAlertSetter: Dispatch<SetStateAction<boolean>>;
}

export const SnackBarInfo = (props: IProps) => {
  const { keyItem, open, displayMessage, OpenSuccessAlertSetter, OpenErrorAlertSetter } = props;
  const s = SnackBarStyle();

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    OpenSuccessAlertSetter(false);
    OpenErrorAlertSetter(false);
  };
  return (
    <Snackbar
      key={keyItem}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      open={open}
      autoHideDuration={2200}
      onClose={handleCloseAlert}
      message={<span id="message-id">{displayMessage}</span>}
      action={[
        <Tooltip key="close1" title="Close">
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={s.close}
            onClick={handleCloseAlert}
          >
            <Close />
          </IconButton>
        </Tooltip>,
      ]}
    />
  );
};
