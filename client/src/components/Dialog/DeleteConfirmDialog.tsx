import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export interface ConfirmationDialogRawProps {
  id: string
  keepMounted: boolean
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

function ConfirmDiaolog(props: ConfirmationDialogRawProps) {
  const { onClose, onConfirm, open, ...other } = props

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDiaolog
