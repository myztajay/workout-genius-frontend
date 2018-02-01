import React, { Component } from 'react';
import { Redirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardTitle } from 'material-ui/Card';
import './workoutcontainer.css'
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { DeleteDialog } from '../components/DeleteDialog'

class WorkoutContainer extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      id: props.match.params.workout,
      name: '',
      description: '',
      intensity: '', 
      exercises: [],
      creator: [],
      user: props.user,
      deleteDialogOpen: false,
      redirect: false,
    }
  }
  
  componentWillMount(){
    axios.get(`/api/workouts/${this.state.id}`)
      .then((res)=>{
        const { name, description, exercises, intensity, creator} = res.data
        this.setState({
          name,
          description,
          exercises,
          intensity,
          creator,
        })
    });
  }
  
  onDelete(){
    this.setState({ deleteDialogOpen: false})
    if(this.state.user._id === this.state.creator[0]){
      axios.delete(`/api/workouts/${this.state.id}`)
      .then(()=>{this.setState({redirect: true})})
    }
  }
  
  handleDialogClose(){
    this.setState({ deleteDialogOpen: false})
  }
  renderExercisesInWorkout(){
    return this.state.exercises.map((exercise)=>{
      // THE JSX return should be refactored into own component when finalized
      return(
        <Card className="card-margin exercise-card" >          
            <div className="column-container flex-flexible">
              <CardTitle title={exercise.name}/>
              <CardTitle subtitle="subtitle"/>
            </div>
            <div className='flex-row flex-flexible flex-end'>
              <div className="circle flex-center text-white text-center">reps<br />{exercise.reps}</div>
              <div className="circle flex-center text-white text-center">sets<br />{exercise.sets}</div>
            </div>
        </Card>
      )
    })
  }
  
  renderAdminButtons(){
    if(this.state.user._id === this.state.creator[0]){
      return( 
        <p> 
          <Link to={`edit/${this.state.id}`}>
            <RaisedButton
            label="Edit"
            primary={true}
            />
          </ Link>  
            <RaisedButton
            label="Delete"
            secondary={true}
            labelColor='white'
            onClick={()=>this.setState({ deleteDialogOpen: true })}
            />
            <DeleteDialog 
              deleteDialogOpen={this.state.deleteDialogOpen} 
              onDelete={this.onDelete.bind(this)} 
              handleDialogClose={this.handleDialogClose.bind(this)}
            />
        </p>
      )
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
            <Card className="column-container main-width">
              <div className="flex-row flex-center">
                <div className="column-container title-desc">
                  <CardTitle  title={this.state.name} subtitle={`${this.state.description}`} />
                  <p>Likes - comments</p>
                  {this.renderAdminButtons()}
                  </div>      
                </div>
              {this.renderExercisesInWorkout()}        
            </Card>
        </div>
      </MuiThemeProvider> 
    )
  }
}
export default WorkoutContainer;