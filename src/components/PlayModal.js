import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Pagination from '../vendor/components/Pagination'
import { MyIcon } from "../components/MyIcon";
import ExerciseCard from './ExerciseCard';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
// width is passed when using withmobiledialog and retrieved screen with
class PlayModal extends Component {
  state = {
    playModalOpen: false,
    exerciseIndex:0
  }

  onPlayOpen = () => {
    this.setState({
      playModalOpen: true,
    })
  }

  onPlayClose = () =>{
    this.setState({
      playModalOpen: false
    })
  }

  handleChangeIndex = exerciseIndex => {
    this.setState({
      exerciseIndex,
    });
  };


  _renderExerciseSlides = () => {
    return this.props.exercises.map((exercise)=>{
      return (
      <ExerciseCard 
        name={exercise.name}
        sets={exercise.sets}
        reps={exercise.reps}
      />)
    })
  }

  render(){
    const { width, name, exercises } = this.props
    let fullScreen
    width ==='xs' ? fullScreen = true : fullScreen = false
    return (
      <div>
        <Button onClick={this.onPlayOpen}> <MyIcon icon="play_circle_filled" fontSize="40" /></Button>
        <Dialog   
          open={this.state.playModalOpen}
          fullScreen={fullScreen}
          onClose={this.onPlayClose}
          aria-labelledby="responsive-dialog-title"
        >
          <AppBar style={{position: 'relative'}}>
            <Toolbar>
              <IconButton color="inherit" aria-label="Close" onClick={this.onPlayClose}>
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                {name}
              </Typography>
            </Toolbar>
          </AppBar>
          <BindKeyboardSwipeableViews enableMouseEvents index={this.state.exerciseIndex} onChangeIndex={this.handleChangeIndex}>
            {this._renderExerciseSlides()}
          </BindKeyboardSwipeableViews>
          <Pagination dots={exercises.length} index={this.state.exerciseIndex} onChangeIndex={this.handleChangeIndex}/>
        </Dialog>
      </div>
    )
  }
}

export default withMobileDialog()(PlayModal);