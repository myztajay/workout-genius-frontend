import React from 'react'
import Snackbar from 'material-ui/Snackbar'

const WorkoutSnackbar = ({ snackbarOpen, snackbarMessage, handleSnackbarRequestClose}) => (
  <div>
    <Snackbar
      open={snackbarOpen}
      message={snackbarMessage}
      autoHideDuration={4000}
      onRequestClose={handleSnackbarRequestClose}
    />
  </div>
)

export default WorkoutSnackbar
