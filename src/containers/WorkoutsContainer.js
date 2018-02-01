import React, { Component } from 'react';
import {Card, CardTitle, CardMedia } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import { WorkoutFilter } from '../components/WorkoutFilter';
import axios from 'axios'
import './workoutscontainer.css';

class WorkoutsContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      workouts: [],
      filterArr: []
    }
  }

  componentDidMount(){
    axios.get('/api/workouts')
    .then((res)=>{
      this.setState({
        workouts: res.data
      })
    })
  }

  onFilterToggle(type){
    if(this.state.filterArr.length === 0){
      this.setState({
          filterArr: [type]
      })
    }
    let checkArr = this.state.filterArr.some((workoutType)=>{
      return workoutType === type
    })
    if(checkArr){
      let newArr = this.state.filterArr.filter((workoutType)=>{
        return workoutType !== type
      })
      this.setState({
        filterArr: [ ...newArr]
      })
    }else{
      this.setState({
        filterArr: [ type]
      })
    }
  }

  renderWorkouts(){
    let filter
    let workoutsArr
    this.state.filterArr.length < 1? filter=false : filter=true;
    if(filter){
      workoutsArr = this.state.workouts.filter((workout)=>{
        return workout.workout_type === this.state.filterArr[0]
      })
    } else {
      workoutsArr = this.state.workouts
    }
    
    return workoutsArr.map((workout)=>{
      return(
        <Link key={workout._id} to={'/workout/' + workout._id} >
          <Card className='card-workout'>
            <CardTitle titleColor="#2979FF"  />
            <CardMedia
              overlay={<CardTitle title={workout.name} subtitle="" />}
            >
            <img className="workout-img" src="workout.jpeg" alt="" />
            </CardMedia>
            <div className="card-info">
              <div className="info"><h4>Exercise</h4><br /><p className="card-text">{workout.exercises.length}</p></div>
              <div className="info"><h4>Intensity</h4><br /><p className="card-text">{workout.intensity}</p></div>
              <div className="info"><h4>likes</h4><br /><p className="card-text">20</p></div>
            </div>
            <Divider />
            <div className='user-info'><img className='profile-img' alt="A workout" src={`${workout.creator[0].facebook_photo}`} /><p>{workout.creator[0].display_name}</p></div>
          </Card>
        </Link>
      )
    })
  }

  render(){
    return(
      <MuiThemeProvider>
      <div className="filter-div">
        <WorkoutFilter name="Crossfit" abrev="CF" type={1} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle.bind(this)} />
        <WorkoutFilter name="Hybrid" abrev="H" type={2} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle.bind(this)}  />
        <WorkoutFilter name="BodyBuilding" abrev="BB" type={3} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle.bind(this)} />
        <WorkoutFilter name="Calisthetics" abrev="CS" type={4} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle.bind(this)} />
        <WorkoutFilter name="Cardio" abrev="CO" type={5} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle.bind(this)} />
      </div>
        <div className="main-container">
          {this.renderWorkouts()}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default WorkoutsContainer
