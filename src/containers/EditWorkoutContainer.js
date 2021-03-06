import React,  { Component } from 'react'
import { Redirect } from 'react-router'
import {Card} from 'material-ui/Card'
import axios from 'axios'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import IntensitySlider from '../components/IntensitySlider'
import ExerciseTable from '../components/ExerciseTable'
import WorkoutSelectField from '../components/WorkoutSelectField'
import WorkoutSnackbar from '../components/WorkoutSnackbar'
import './newworkoutcontainer.css'


class EditWorkoutContainer extends Component{
  constructor(props){
    super(props)
    this.state ={
      workoutId: props.match.params.workout,
      exercises: [],
      exerciseInput: null,
      repsInput: null,
      setsInput: null,
      exerciseSelected: false,
      name: null,
      description: null,
      intensity: 33,
      workoutType: null,
      user: props.user,
      creator: null,
      snackbarOpen: false,
      snackbarMessage: "bro...",
      submited: false,
      nameError: null,
      descriptionError: null,
      exerciseError: null,
      workoutTypeError: null
    }
  }
  
  async componentDidMount(){
    let res
    try {
      res = await axios.get(`/api/workouts/${this.state.workoutId}`)
    } catch (err) {
      console.log(err) 
    }
    const { name, description, exercises, intensity, workout_type, creator } = res.data
    this.setState({
      name,
      description,
      exercises,
      intensity,
      creator,
      workoutType: workout_type,
    })
  }
  
  addExercise = () => {
    let newExercise = { 
      name: this.state.exerciseInput,
      sets: this.state.setsInput,
      reps: this.state.repsInput
    }
    this.setState({
      exerciseError: '',
      exercises: [...this.state.exercises, newExercise],
      exerciseInput: '',
      setsInput: '',
      repsInput: '',
    })
  }
    
  handleExerciseInputChange = (e) => {
    this.setState({
      exerciseInput: e.target.value
    })
  }
  
  handleSetsInputChange = (e) => {
    this.setState({
      setsInput: e.target.value
    })
  }
  
  handleRepsInputChange = (e) => {
    this.setState({
      repsInput: e.target.value
    })
  }
  
  handleTitleChange = (e) => {
    this.setState({
      nameError: '',
      name: e.target.value
    })
  }
  
  handleDescriptionChange = (e) => {
    this.setState({
      descriptionError: '',
      description: e.target.value
    })
  }
  
  handleSliderChange = (e,n) => {
    this.setState({
      intensity: n*100
    })
  }
  
  handleSelectChange = (event, index, workoutType) => {
    this.setState({
      workoutTypeError: '',
      workoutType
    });
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
  
  handleDialogClose(){
   this.setState({
      deleteDialogOpen: false,
    })
  }

  handleSubmit = () => {
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
          // Assign all validation errors to variable and if they exist place them in state to display to user.
          let validationErrors = {...res.data.errors}
          if(validationErrors.hasOwnProperty('name')){
            this.setState({nameError: validationErrors.name.message})
          }
          if(validationErrors.hasOwnProperty('description')){
            this.setState({descriptionError: validationErrors.description.message})
          }
          if(validationErrors.hasOwnProperty('workout_type')){
            this.setState({workoutTypeError: validationErrors.workout_type.message})
          }
          if(validationErrors.hasOwnProperty('exercises')){
            this.setState({exerciseError: validationErrors.exercises.message})
          }
          this.setState({
            snackbarOpen: true,
            snackbarMessage: "Something went wrong, double check required fields" 
          })
        } else {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: "Workout was Edited. " ,
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
        handleSnackbarClick={this.handleSnackbarClick}
        handleSnackbarRequestClose={this.handleSnackbarRequestClose}
        snackbarMessage={this.state.snackbarMessage}
        />
        <div className="form-container">
        <Card className="card">
        <form className="workout-form">
          <TextField
            hintText="Spartan Abs"
            floatingLabelText="Workout Name"
            value={this.state.name}
            errorText={this.state.nameError}
            fullWidth={true}
            onChange={this.handleTitleChange}
          />
          <br />
          <TextField
            hintText="Make it short and sweet"
            floatingLabelText="Subtitle"
            value={this.state.description}
            errorText={this.state.descriptionError}
            fullWidth={true}
            onChange={this.handleDescriptionChange}
          />
          <br />
          <TextField
            hintText="Crunches"
            floatingLabelText="Exercises"
            errorText={this.state.exerciseError}
            style={{width:350, margin:5}}
            value={this.state.exerciseInput}
            onChange={this.handleExerciseInputChange}
          />
          <TextField
            floatingLabelText="Sets"
            style={{width:60, margin:5}}
            value={this.state.setsInput}
            onChange={this.handleSetsInputChange}
          />
          <TextField            
            floatingLabelText="Reps"
            style={{width:60, margin:5}}
            value={this.state.repsInput}
            onChange={this.handleRepsInputChange}
          />
        
          <FloatingActionButton>
          <ContentAdd onClick={this.addExercise}/>
          </FloatingActionButton>
          <h4>Intensity</h4>      
          <IntensitySlider intensity={this.state.intensity} handleSliderChange={this.handleSliderChange}  />
          <WorkoutSelectField value={this.state.workoutType} errorText={this.state.workoutTypeError} handleSelectChange={this.handleSelectChange} />
        </form> 
        </Card>
        </div>
        <div className="workout-container">
          <ExerciseTable exercises={this.state.exercises}/>
        </div>
        <div className="btn-container">
          <RaisedButton label="Edit Workout" primary={true} onClick={this.handleSubmit} />
        </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default EditWorkoutContainer