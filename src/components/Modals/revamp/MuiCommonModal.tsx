import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { useIntl } from 'react-intl';
import { useModalStore } from 'store';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

function MuiCommonModal() {

  const intl = useIntl()

  const state = useModalStore()

  const onHide = () => {
    state.error && state.setError(null)
    state.message && state.setMessage(null)
    state.callback && state.callback.call(null);
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <Dialog
      open={state.error != null || state.message != null}
      onClose={onHide}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}>
      {state.error && <DialogTitle id="form-dialog-title">
        {intl.formatMessage({ id: "app.modal.header.error" })}
      </DialogTitle>}
      {
        state.message && <DialogTitle>
          {intl.formatMessage({ id: "app.modal.header.info" })}
        </DialogTitle>
      }
      <DialogContent>
        <Typography variant="h5">
          {state.error && state.error.toString()}
          {state.message && intl.formatMessage({ id: state.message })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onHide}
          variant="contained"
          color="primary"
        >
          {intl.formatMessage({ id: "app.buttons.ok" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MuiCommonModal;