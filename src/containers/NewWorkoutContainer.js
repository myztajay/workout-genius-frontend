import React,  { Component } from 'react';
import TextField from 'material-ui/TextField';
import './newworkoutcontainer.css';
import { ExerciseTable } from '../components/ExerciseTable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card} from 'material-ui/Card';
import { IntensitySlider } from '../components/IntensitySlider'
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { WorkoutSelectField } from '../components/WorkoutSelectField';
import { WorkoutSnackbar } from '../components/WorkoutSnackbar';
import { Redirect } from 'react-router';
import axios from 'axios';


class NewWorkoutContainer extends Component{
  constructor(props){
    super(props)
    this.state ={
      exercises: [],
      exerciseInput: '',
      repsInput: '',
      setsInput: '',
      exerciseSelected: false,
      name: '',
      description: '',
      intensity: 33,
      workoutType: 0,
      creator: props.user,
      snackbarOpen: false,
      snackbarMessage: "bro..."
    }
  }
  
  addExercise(){
    let newExercise = { 
      name: this.state.exerciseInput,
      sets: this.state.setsInput,
      reps: this.state.repsInput
    }
    this.setState({
      exercises: [...this.state.exercises, newExercise],
      exerciseInput: '',
      setsInput: '',
      repsInput: '',
    })
  }
    
  handleExerciseInputChange(e){
    this.setState({
      exerciseInput: e.target.value
    })
  }
  
  handleSetsInputChange(e){
    this.setState({
      setsInput: e.target.value
    })
  }
  
  handleRepsInputChange(e){
    this.setState({
      repsInput: e.target.value
    })
  }
  
  handleTitleChange(e){
    this.setState({
      name: e.target.value
    })
  }
  
  handleDescriptionChange(e){
    this.setState({
      description: e.target.value
    })
  }
  
  handleSliderChange(e,n){
    this.setState({
      intensity: n*100
    })
  }
  
  handleSelectChange(event, index, workoutType){
    this.setState({workoutType});
  }
  
  handleSnackbarClick = () => {
    this.setState({
      snackbarOpen: true,
    });
  };

  handleSnackbarRequestClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };
  
  handleSubmit(){
    axios.post('/api/workouts', {
      name: this.state.name,
      exercises: this.state.exercises,
      description: this.state.description,
      intensity: this.state.intensity,
      workout_type: this.state.workoutType,
      creator: this.state.creator,
    })
    .then((res)=>{
      // check res for error, future fix server will respond with 400 so catch can work
      if(res.data.hasOwnProperty('errors')){
        this.setState({
          snackbarOpen: true,
          snackbarMessage: "Something went wrong, double check required fields" 
        })
      } else {
        this.setState({
          snackbarOpen: true,
          snackbarMessage: "Workout was created. " ,
        })
        setTimeout(()=>{this.setState({ redirect: true})} , 1500);    
      }    
    })
  }
      
  render(){
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/workouts'/>;
    }
    return(    
      <MuiThemeProvider>
        <div className="main-container">
        <WorkoutSnackbar 
        snackbarOpen={this.state.snackbarOpen} 
        handleSnackbarClick={this.handleSnackbarClick.bind(this)}
        handleSnackbarRequestClose={this.handleSnackbarRequestClose.bind(this)}
        snackbarMessage={this.state.snackbarMessage}
        />
        <div className="form-container">
        <Card className="card">
        <form className="workout-form">
          <TextField
            hintText="Spartan Abs"
            floatingLabelText="Workout Name"
            fullWidth={true}
            onChange={this.handleTitleChange.bind(this)}
          />
          <br />
          <TextField
            hintText="Make it short and sweat"
            floatingLabelText="Subtitle"
            fullWidth={true}
            onChange={this.handleDescriptionChange.bind(this)}
          />
          <br />
          <TextField
            hintText="Crunches"
            floatingLabelText="Exercises"
            style={{width:350, margin:5}}
            value={this.state.exerciseInput}
            onChange={this.handleExerciseInputChange.bind(this)}
          />
          <TextField
            floatingLabelText="Sets"
            style={{width:60, margin:5}}
            value={this.state.setsInput}
            onChange={this.handleSetsInputChange.bind(this)}
          />
          <TextField            
            floatingLabelText="Reps"
            style={{width:60, margin:5}}
            value={this.state.repsInput}
            onChange={this.handleRepsInputChange.bind(this)}
          />
        
          <FloatingActionButton>
          <ContentAdd onClick={this.addExercise.bind(this)}/>
          </FloatingActionButton>
          <h4>Intensity</h4>      
          <IntensitySlider intensity={this.state.intensity} handleSliderChange={this.handleSliderChange.bind(this)}  />
          <WorkoutSelectField value={this.state.workoutType} handleSelectChange={this.handleSelectChange.bind(this)} />
        </form> 
        </Card>
        </div>
        <div className="workout-container">
          <ExerciseTable exercises={this.state.exercises}/>
        </div>
        <div className="btn-container">
          <RaisedButton label="Create Workout" primary={true} onClick={this.handleSubmit.bind(this)} />
        </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default NewWorkoutContainer