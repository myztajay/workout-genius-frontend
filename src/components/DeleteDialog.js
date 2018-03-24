import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const DeleteDialog = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onClick={props.handleDialogClose}
    />,
    <FlatButton
      label="Delete"
      secondary
      onClick={props.onDelete}
    />,
  ]
  return (
    <Dialog
      title="Are you sure you want to delete this workout?"
      actions={actions}
      modal={false}
      open={props.deleteDialogOpen}
      onRequestClose={this.handleDialogClose}
    >
       This is the point of no return. if you want to delete this workout click "delete"
    </Dialog>
  )
}

export default DeleteDialog
