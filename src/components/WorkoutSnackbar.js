import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export const WorkoutSnackbar = (props) =>{
    return (
      <div>
        <Snackbar
          open={props.snackbarOpen}
          message={props.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={props.handleSnackbarRequestClose}
        />
      </div>
    );
}