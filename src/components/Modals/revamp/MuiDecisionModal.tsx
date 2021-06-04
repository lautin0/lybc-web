import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { useIntl } from 'react-intl';
import { RootStore } from 'store';

function MuiDecisionModal() {

  const intl = useIntl()

  const state = RootStore.useDecisionStore()

  const onConfirm = () => {
    state.positiveFn && state.positiveFn()
    onHide()
  }

  const onCancel = () => {
    state.negativeFn && state.negativeFn()
    onHide()
  }

  const onHide = () => {
    state.setPositiveFn(null)
    state.setNegativeFn(null)
    state.setMessage(null)
    state.setTitle(null)
  }

  useEffect(() => {
    let thisRef = React.createRef();
    ReactDOM.createPortal(thisRef, document.body)
  })

  return (
    <Dialog
      open={state.message != null}
      onClose={onHide}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}>
      <DialogTitle>

      </DialogTitle>
      <DialogContent>
        <Typography variant="h5">
          {state.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
        >
          {intl.formatMessage({ id: "app.buttons.confirm" })}
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          color="secondary"
        >
          {intl.formatMessage({ id: "app.buttons.cancel" })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MuiDecisionModal;