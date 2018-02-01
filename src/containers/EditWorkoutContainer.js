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


class EditWorkoutContainer extends Component{
  constructor(props){
    super(props)
    this.state ={
      workoutId: props.match.params.workout,
      exercises: [],
      exerciseInput: '',
      repsInput: '',
      setsInput: '',
      exerciseSelected: false,
      name: '',
      description: '',
      intensity: 33,
      workoutType: 0,
      user: props.user,
      creator: '',
      snackbarOpen: false,
      snackbarMessage: "bro...",
    }
  }
  
  componentWillMount(){
    axios.get(`/api/workouts/${this.state.workoutId}`)
      .then((res)=>{
        console.log(res);
        const { name, description, exercises, intensity, workout_type, creator } = res.data
        this.setState({
          name,
          description,
          exercises,
          intensity,
          creator,
          workoutType: workout_type,
        })
    });
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
  
  handleDialogClose(){
    this.setState({
      deleteDialogOpen: false,
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
    if(this.state.user._id === this.state.creator[0]){
      axios.put(`/api/workouts/${this.state.workoutId}`, {
        name: this.state.name,
        exercises: this.state.exercises,
        description: this.state.description,
        intensity: this.state.intensity,
        workout_type: this.state.workoutType,
        creator: this.state.creator,
      })
      .then((res)=>{
        console.log(res);
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
    }else{
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "You are not the owner of this workout." ,
      })
      setTimeout(()=>{this.setState({ redirect: true})} , 3000);    
      }    
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
            value={this.state.name}
          />
          <br />
          <TextField
            hintText="Make it short and sweat"
            floatingLabelText="Subtitle"
            fullWidth={true}
            onChange={this.handleDescriptionChange.bind(this)}
            value={this.state.description}
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
          <IntensitySlider intensity={this.state.intensity}  handleSliderChange={this.handleSliderChange.bind(this)}  />
          <WorkoutSelectField workoutType={this.state.workoutType} handleSelectChange={this.handleSelectChange.bind(this)} />
        </form> 
        </Card>
        </div>
        <div className="workout-container">
          <ExerciseTable exercises={this.state.exercises}/>
        </div>
        <div className="btn-container">
          <RaisedButton label="Edit Workout" primary={true} onClick={this.handleSubmit.bind(this)} />
        </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default EditWorkoutContainer