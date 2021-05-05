import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { useIntl } from 'react-intl';
import { useModalStore } from 'store';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

function MuiCommonModal() {

  const intl = useIntl()

  const message = useModalStore(state => state.message)
  const setMessage = useModalStore(state => state.setMessage)

  const error = useModalStore(state => state.error)
  const setError = useModalStore(state => state.setError)

  const callback = useModalStore(state => state.callback)

  const onHide = () => {
    error && setError(null)
    message && setMessage(null)
    callback && callback.call(null);
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <Dialog
      open={error != null || message != null}
      onClose={onHide}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}>
      {error && <DialogTitle id="form-dialog-title">
        {intl.formatMessage({ id: "app.modal.header.error" })}
      </DialogTitle>}
      {
        message && <DialogTitle>
          {intl.formatMessage({ id: "app.modal.header.info" })}
        </DialogTitle>
      }
      <DialogContent>
        <Typography variant="h5">
          {error && error.toString()}
          {message && intl.formatMessage({ id: message })}
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